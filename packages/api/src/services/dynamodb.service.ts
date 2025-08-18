import { Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { DynamoDBClient, CreateTableCommand, ListTablesCommand } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  PutCommand,
  QueryCommand as DocQueryCommand,
} from "@aws-sdk/lib-dynamodb";

import { sanitizeDataForDynamoDB } from "../helpers/dynamodbHelpers";

type IDynamoDBClientConfig = {
  region: string;
  credentials: {
    accessKeyId: string;
    secretAccessKey: string;
  };
  endpoint?: string;
};

@Injectable()
export class DynamoDBService implements OnModuleInit {
  private readonly logger = new Logger(DynamoDBService.name);
  private readonly client: DynamoDBClient;
  private readonly docClient: DynamoDBDocumentClient;

  constructor(private readonly configService: ConfigService) {
    const config: IDynamoDBClientConfig = {
      region: this.configService.get<string>("dynamodb.region"),
      credentials: {
        accessKeyId: this.configService.get<string>("dynamodb.accessKeyId"),
        secretAccessKey: this.configService.get<string>("dynamodb.secretAccessKey"),
      },
    };

    // Only add endpoint for local development
    const endpoint = this.configService.get<string>("dynamodb.endpoint");
    if (endpoint) {
      config.endpoint = endpoint;
    }

    this.client = new DynamoDBClient(config);
    this.docClient = DynamoDBDocumentClient.from(this.client);
  }

  async onModuleInit() {
    try {
      // Only create table in local development
      const endpoint = this.configService.get<string>("dynamodb.endpoint");
      if (endpoint) {
        await this.createItunesSearchResultsTable();
      }
      this.logger.log("DynamoDB service initialized successfully");
    } catch (error) {
      this.logger.error("Failed to initialize DynamoDB service", error);
    }
  }

  /**
   * Create a table for iTunes search results
   */
  async createItunesSearchResultsTable(): Promise<void> {
    const tableName = "itunes-search-results";

    try {
      // Check if table already exists
      const existingTables = await this.listTables();
      if (existingTables.includes(tableName)) {
        this.logger.log(`Table ${tableName} already exists`);
        return;
      }

      const createTableCommand = new CreateTableCommand({
        TableName: tableName,
        KeySchema: [
          { AttributeName: "searchId", KeyType: "HASH" }, // Partition key
          { AttributeName: "timestamp", KeyType: "RANGE" }, // Sort key
        ],
        AttributeDefinitions: [
          { AttributeName: "searchId", AttributeType: "S" },
          { AttributeName: "timestamp", AttributeType: "S" },
        ],
        ProvisionedThroughput: {
          ReadCapacityUnits: 5,
          WriteCapacityUnits: 5,
        },
      });

      await this.client.send(createTableCommand);
      this.logger.log(`Table ${tableName} created successfully`);
    } catch (error) {
      this.logger.error(`Failed to create table ${tableName}`, error);
      // Don't throw here to allow the application to continue
    }
  }

  /**
   * Store iTunes search results in DynamoDB
   */
  async storeItunesSearchResults(
    searchType: string,
    searchTerm: string,
    searchParams: any,
    results: any
  ): Promise<string> {
    const tableName = "itunes-search-results";
    const searchId = `${searchType}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const timestamp = new Date().toISOString();

    // Sanitize the data before storing
    const sanitizedResults = sanitizeDataForDynamoDB(results);
    const sanitizedSearchParams = sanitizeDataForDynamoDB(searchParams);

    const item = {
      searchId,
      timestamp,
      searchType,
      searchTerm: searchTerm.substring(0, 1000), // Limit search term length
      searchParams: sanitizedSearchParams,
      results: sanitizedResults,
      resultCount: sanitizedResults?.resultCount || 0,
      createdAt: timestamp,
    };

    const putCommand = new PutCommand({
      TableName: tableName,
      Item: item,
    });

    try {
      await this.docClient.send(putCommand);
      this.logger.log(`iTunes search results stored with ID: ${searchId}`);
      return searchId;
    } catch (error) {
      this.logger.error(`Failed to store iTunes search results`, error);

      // If it's an InternalFailure, it might be due to table not existing
      if (error.name === "InternalFailure" || error.$metadata?.httpStatusCode === 500) {
        this.logger.warn("InternalFailure detected, attempting to create table and retry");
        try {
          await this.createItunesSearchResultsTable();
          // Wait a moment for table to be ready
          await new Promise(resolve => setTimeout(resolve, 2000));

          // Retry the operation
          await this.docClient.send(putCommand);
          this.logger.log(`iTunes search results stored with ID: ${searchId} (retry successful)`);
          return searchId;
        } catch (retryError) {
          this.logger.error(`Retry failed for storing iTunes search results`, retryError);
          throw retryError;
        }
      }

      throw error;
    }
  }

  /**
   * Query iTunes search results by search type
   */
  async queryItunesSearchResultsByType(searchType: string, limit = 10): Promise<any[]> {
    const tableName = "itunes-search-results";

    try {
      const command = new DocQueryCommand({
        TableName: tableName,
        IndexName: "searchType-index", // Note: This would require a GSI
        KeyConditionExpression: "searchType = :searchType",
        ExpressionAttributeValues: {
          ":searchType": searchType,
        },
        Limit: limit,
      });
      const response = await this.docClient.send(command);
      return response.Items || [];
    } catch (error) {
      this.logger.error(`Failed to query iTunes search results by type ${searchType}`, error);
    }
  }

  /**
   * Get iTunes search results by search ID
   */
  async getItunesSearchResults(searchId: string): Promise<any> {
    const tableName = "itunes-search-results";

    try {
      // Use Query to get items by searchId (partition key)
      const command = new DocQueryCommand({
        TableName: tableName,
        KeyConditionExpression: "searchId = :searchId",
        ExpressionAttributeValues: {
          ":searchId": searchId,
        },
        Limit: 1, // We only need one result
      });
      const response = await this.docClient.send(command);

      return response.Items?.[0] || {};
    } catch (error) {
      this.logger.error(`Failed to get iTunes search results for ${searchId}`, error);
      throw error;
    }
  }

  /**
   * List all tables
   */
  async listTables(): Promise<string[]> {
    try {
      const command = new ListTablesCommand({});
      const response = await this.client.send(command);
      return response.TableNames || [];
    } catch (error) {
      this.logger.error("Failed to list tables", error);
      throw error;
    }
  }
}
