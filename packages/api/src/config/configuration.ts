export default () => ({
  port: parseInt(process.env.PORT, 10) || 4009,

  cors: {
    frontendUrl: process.env.FRONTEND_URL || "http://localhost:4010",
  },

  api: {
    prefix: process.env.API_PREFIX || "api",
  },

  dynamodb: {
    endpoint: process.env.DYNAMODB_ENDPOINT || "http://localhost:8000",
    region: process.env.DYNAMODB_REGION || "fakeRegion",
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "fakeMyKeyId",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "fakeSecretAccessKey",
  },
});
