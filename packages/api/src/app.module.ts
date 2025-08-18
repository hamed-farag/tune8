import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { HttpModule } from "@nestjs/axios";

import { AppController } from "./app.controller";
import { ItunesController } from "./controllers/itunes.controller";

import { AppService } from "./app.service";
import { ItunesService } from "./services/itunes.service";
import { DynamoDBService } from "./services/dynamodb.service";

import configuration from "./config/configuration";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      envFilePath: ["../../../.env"],
    }),
    HttpModule,
  ],
  controllers: [AppController, ItunesController],
  providers: [AppService, ItunesService, DynamoDBService],
})
export class AppModule {}
