import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { existsSync } from "fs";
import dotenv from "dotenv";

// Get __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from root .env file if it exists
const envPath = join(__dirname, "../../.env");
if (existsSync(envPath)) {
  dotenv.config({ path: envPath });
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Basic configuration
};

export default nextConfig;
