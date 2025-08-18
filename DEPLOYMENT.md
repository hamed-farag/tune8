# DynamoDB AWS Deployment Guide

This guide provides step-by-step instructions for deploying your NestJS application with DynamoDB on AWS, transitioning from local development to production.

## Prerequisites

- AWS Account with billing enabled
- AWS CLI installed and configured (optional but recommended)
- Node.js and npm/pnpm installed
- Basic understanding of AWS services

## Step 1: AWS Account Setup

### 1.1 Create AWS Account

1. Go to [AWS Console](https://aws.amazon.com/)
2. Click "Create an AWS Account"
3. Follow the registration process
4. Complete email and phone verification
5. Add a payment method

### 1.2 Create IAM User for Application

1. Navigate to [IAM Console](https://console.aws.amazon.com/iam/)
2. Click "Users" → "Create user"
3. Enter user details:
   - **User name**: `tune8-dynamodb-user`
   - **Access type**: Select "Programmatic access"
4. Click "Next: Permissions"

### 1.3 Attach DynamoDB Permissions

1. Select "Attach policies directly"
2. Search for `AmazonDynamoDBFullAccess`
3. Check the policy and click "Next: Tags"
4. Add tags (optional) and click "Next: Review"
5. Review and click "Create user"

### 1.4 Get Access Credentials

1. After user creation, you'll see the access credentials
2. **IMPORTANT**: Download the CSV file containing:
   - Access Key ID
   - Secret Access Key
3. Store these securely - you won't be able to see the secret key again

## Step 2: DynamoDB Table Creation

### 2.1 Navigate to DynamoDB Console

1. Go to [DynamoDB Console](https://console.aws.amazon.com/dynamodb/)
2. Select your preferred region (e.g., `us-east-1`, `eu-west-1`)
3. Click "Create table"

### 2.2 Configure Table Settings

1. **Basic settings**:
   - **Table name**: `itunes-search-results`
   - **Partition key**: `searchId` (String)
   - **Sort key**: `timestamp` (String)
2. Click "Customize settings"

### 2.3 Configure Capacity and Performance

1. **Capacity mode**: Select "Provisioned"
2. **Provisioned capacity**:
   - **Read capacity units (RCU)**: 5
   - **Write capacity units (WCU)**: 5
3. **Auto scaling**: Leave disabled for initial setup
4. Click "Next"

### 2.4 Configure Additional Settings

1. **Encryption**: Use AWS owned CMK (default)
2. **Point-in-time recovery**: Disabled (can enable later)
3. **Tags**: Add relevant tags (optional)
4. Click "Create table"

### 2.5 Verify Table Creation

1. Wait for table status to become "Active"
2. Note the table ARN for future reference

## Step 3: Environment Configuration

### 3.1 Create Environment Files

Create the following files in your `packages/api` directory:

#### `.env.development` (for AWS development)

```env
# AWS DynamoDB Configuration
DYNAMODB_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_access_key_id
AWS_SECRET_ACCESS_KEY=your_secret_access_key

# Application Configuration
PORT=4009
FRONTEND_URL=http://localhost:4010
API_PREFIX=api
NODE_ENV=development
```

#### `.env.production` (for AWS production)

```env
# AWS DynamoDB Configuration
DYNAMODB_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_access_key_id
AWS_SECRET_ACCESS_KEY=your_secret_access_key

# Application Configuration
PORT=4009
FRONTEND_URL=https://your-frontend-domain.com
API_PREFIX=api
NODE_ENV=production
```

#### `.env.local` (for local development)

```env
# Local DynamoDB Configuration
DYNAMODB_ENDPOINT=http://localhost:8000
DYNAMODB_REGION=fakeRegion
AWS_ACCESS_KEY_ID=fakeMyKeyId
AWS_SECRET_ACCESS_KEY=fakeSecretAccessKey

# Application Configuration
PORT=4009
FRONTEND_URL=http://localhost:4010
API_PREFIX=api
NODE_ENV=local
```

## Resources

- [AWS DynamoDB Documentation](https://docs.aws.amazon.com/dynamodb/)
- [NestJS AWS SDK Integration](https://docs.nestjs.com/techniques/configuration)
- [DynamoDB Best Practices](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/best-practices.html)
- [AWS IAM Best Practices](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html)
