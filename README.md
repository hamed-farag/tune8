# Tune8 Monorepo

A modern monorepo built with Lerna and pnpm, containing a NestJS API backend and a Next.js frontend.

## 🏗️ Project Structure

```
tune8/
├── packages/
│   ├── api/          # NestJS API backend
│   └── frontend/     # Next.js frontend
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

### Development

Start both projects in development mode:

```bash
pnpm dev
```

This will start:

- **API**: http://localhost:4009
- **Frontend**: http://localhost:4010

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

- **Framework**: NestJS
- **Language**: TypeScript
- **Documentation**: Swagger/OpenAPI
- **Port**: 4009
- **Configuration**: @nestjs/config with dotenv

### Frontend

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Port**: 4010
- **Configuration**: dotenv for environment variables

### Monorepo Tools

- **Package Manager**: pnpm
- **Monorepo Tool**: Lerna
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

The project uses a single root `.env` file for all environment variables across both API and Frontend packages. This simplifies configuration management and ensures consistency.

#### Manual Setup

1. Copy the example environment file:

```bash
cp .env.example .env
```

2. Or create a single `.env` file in the root directory manually:

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
FRONTEND_URL=http://localhost:4009

# =============================================================================
# FRONTEND CONFIGURATION
# =============================================================================

# Frontend Server
FRONTEND_PORT=4010

# App Metadata (public)
NEXT_PUBLIC_APP_NAME=Tune8
NEXT_PUBLIC_APP_VERSION=1.0.0
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

## 🚀 Deployment

### Build for Production

```bash
pnpm build
```

## 📄 License

This project is licensed under the ISC License.
