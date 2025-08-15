# Tune8 Monorepo

A modern monorepo built with Lerna and pnpm, containing a NestJS API backend with iTunes integration and a Next.js frontend.

## 🏗️ Project Structure

```
tune8/
├── packages/
│   ├── api/          # NestJS API backend with iTunes integration
│   └── frontend/     # Next.js frontend
├── docker/
│   └── dynamodb/     # DynamoDB local data storage
├── docker-compose.yml # Docker services configuration
├── lerna.json        # Lerna configuration
├── pnpm-workspace.yaml # pnpm workspace configuration
├── .prettierrc       # Prettier configuration
├── .vscode/          # VS Code workspace settings
└── package.json      # Root package.json
```

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- pnpm (v8 or higher)
- Docker (for DynamoDB local)

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd tune8
```

2. Install dependencies:

```bash
pnpm install
```

3. Start DynamoDB local (optional):

```bash
docker-compose up -d
```

### Development

Start both projects in development mode:

```bash
pnpm dev
```

This will start:

- **API**: http://localhost:4009
- **Frontend**: http://localhost:4010
- **DynamoDB Local**: http://localhost:8000 (if using Docker)

### Individual Commands

#### API (NestJS)

```bash
# Development
pnpm dev:api

# Build
pnpm build:api

# Start production
pnpm --filter @tune8/api start:prod
```

#### Frontend (Next.js)

```bash
# Development
pnpm dev:frontend

# Build
pnpm build:frontend

# Start production
pnpm --filter @tune8/frontend start
```

#### DynamoDB Local

```bash
# Start DynamoDB local
docker-compose up -d

# Stop DynamoDB local
docker-compose down
```

## 📦 Available Scripts

- `pnpm dev` - Start both projects in development mode
- `pnpm dev:api` - Start API in development mode
- `pnpm dev:frontend` - Start frontend in development mode
- `pnpm build` - Build all projects
- `pnpm build:api` - Build API only
- `pnpm build:frontend` - Build frontend only
- `pnpm lint` - Lint all projects
- `pnpm lint:fix` - Lint and fix all projects
- `pnpm format` - Format all projects
- `pnpm format:check` - Check formatting without making changes

## 🛠️ Technology Stack

### Backend (API)

- **Framework**: NestJS 10
- **Language**: TypeScript 5
- **Documentation**: Swagger/OpenAPI 7
- **Port**: 4009
- **Configuration**: @nestjs/config with dotenv
- **External APIs**: iTunes Search API integration via @nestjs/axios
- **Database**: DynamoDB Local (Docker) with AWS SDK v3
- **Validation**: class-validator and class-transformer

### Frontend

- **Framework**: Next.js 14
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **HTTP Client**: Axios
- **Port**: 4010 (configurable via FRONTEND_PORT)
- **Configuration**: dotenv for environment variables

### Infrastructure

- **Database**: DynamoDB Local (Docker container)
- **Containerization**: Docker Compose
- **Data Persistence**: Local volume mounting

### Monorepo Tools

- **Package Manager**: pnpm
- **Monorepo Tool**: Lerna 8
- **Workspace Management**: pnpm workspaces
- **Code Quality**: ESLint + Prettier

## 🔧 Configuration

### Code Quality

This project uses ESLint and Prettier for consistent code formatting and linting:

#### ESLint Configuration

- **API Package**: TypeScript-focused rules for NestJS development
- **Frontend Package**: Next.js + TypeScript rules with React support

#### Prettier Configuration

- **Consistent formatting** across all packages
- **Double quotes** for strings
- **100 character line width**
- **2 spaces** for indentation
- **Trailing commas** for cleaner diffs
- **Semicolons** enabled

#### VS Code Integration

The workspace includes VS Code settings for:

- **Automatic formatting** on save
- **ESLint auto-fix** on save
- **Recommended extensions** for the best development experience:
  - Prettier - Code formatter
  - ESLint
  - TypeScript and JavaScript Language Features
  - Tailwind CSS IntelliSense
  - JSON Language Features

### Environment Variables

The project uses environment variables for configuration. Create a `.env` file in the root directory with the following variables:

**Root Level** (`.env`):

```env
# Tune8 Monorepo Environment Variables
# This file contains all environment variables for both API and Frontend packages

# =============================================================================
# SHARED CONFIGURATION
# =============================================================================

# Environment
NODE_ENV=development

# =============================================================================
# API CONFIGURATION
# =============================================================================

# API Server
PORT=4009
API_PREFIX=api

# CORS Configuration
FRONTEND_URL=http://localhost:4010

# =============================================================================
# FRONTEND CONFIGURATION
# =============================================================================

# Frontend Server
FRONTEND_PORT=4010

# App Metadata (public)
NEXT_PUBLIC_APP_NAME=Tune8
NEXT_PUBLIC_APP_VERSION=1.0.0

# =============================================================================
# DATABASE CONFIGURATION
# =============================================================================

# DynamoDB Local (optional)
DYNAMODB_ENDPOINT=http://localhost:8000
DYNAMODB_REGION=fakeRegion

# =============================================================================
# AWS CONFIGURATION
# =============================================================================

# AWS Credentials (for DynamoDB Local, these are fake credentials)
AWS_ACCESS_KEY_ID=fakeMyKeyId
AWS_SECRET_ACCESS_KEY=fakeSecretAccessKey

# For production AWS DynamoDB, replace with real credentials:
# AWS_ACCESS_KEY_ID=your_real_access_key_id
# AWS_SECRET_ACCESS_KEY=your_real_secret_access_key
# DYNAMODB_REGION=us-east-1
# DYNAMODB_ENDPOINT= (leave empty for production AWS)
```

#### Environment Variable Management

- **Single Source of Truth**: All environment variables are managed in one root `.env` file
- **API Package**: Uses `@nestjs/config` with dotenv to load from root `.env` file
- **Frontend Package**: Uses Next.js with dotenv to load from root `.env` file
- **Configuration Files**: Each package has a configuration utility for type-safe access to environment variables
- **Security**: Never commit `.env` files to version control (they're already in `.gitignore`)

## 📚 API Documentation

Once the API is running, you can access the Swagger documentation at:
http://localhost:4009/api

### iTunes API Integration

The API includes comprehensive iTunes Search API integration with the following endpoints:

- **General Search**: `GET /api/itunes/search` - Search across all media types
- **Music Search**: `GET /api/itunes/search/music` - Search for music tracks
- **Artist Search**: `GET /api/itunes/search/artist` - Search for music artists
- **Album Search**: `GET /api/itunes/search/album` - Search for music albums
- **Podcast Search**: `GET /api/itunes/search/podcast` - Search for podcasts
- **Movie Search**: `GET /api/itunes/search/movie` - Search for movies
- **TV Show Search**: `GET /api/itunes/search/tvShow` - Search for TV shows

For detailed API documentation, see [ITUNES_API.md](packages/api/ITUNES_API.md).

## 🗄️ Database Setup

### DynamoDB Local

The project includes DynamoDB Local for development:

```bash
# Start DynamoDB local
docker-compose up -d

# Access DynamoDB at http://localhost:8000
```

#### Credential Configuration

Before you can access DynamoDB programmatically or through the AWS Command Line Interface (AWS CLI), you must configure your credentials to enable authorization for your applications. Downloadable DynamoDB requires any credentials to work, as shown in the following example.

**Required Credentials:**

The project uses AWS credentials for DynamoDB access. For local development with DynamoDB Local, fake credentials are used and configured via environment variables in the `.env` file:

- **AWS Access Key ID**: `fakeMyKeyId` (set via `AWS_ACCESS_KEY_ID`)
- **AWS Secret Access Key**: `fakeSecretAccessKey` (set via `AWS_SECRET_ACCESS_KEY`)
- **Default Region Name**: `fakeRegion` (set via `DYNAMODB_REGION`)

For AWS CLI access to DynamoDB Local, you can use the `aws configure` command:

```bash
aws configure
```

When prompted, enter the following values:

- AWS Access Key ID: `fakeMyKeyId`
- AWS Secret Access Key: `fakeSecretAccessKey`
- Default region name: `fakeRegion`
- Default output format: `json`

For more information, see [Using the AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html).

**Features:**

- **Local Development**: No AWS account required
- **Data Persistence**: Data stored in `./docker/dynamodb/`
- **Web Interface**: Access via http://localhost:8000
- **Shared Database**: Uses `-sharedDb` flag for single database instance

## 🚀 Deployment

### Build for Production

```bash
pnpm build
```

### Docker Deployment

For production deployment with DynamoDB:

```bash
# Build and start all services
docker-compose up -d
```

## 📄 License

This project is licensed under the ISC License.
