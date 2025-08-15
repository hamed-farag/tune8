export default () => ({
  port: parseInt(process.env.PORT, 10) || 3001,

  cors: {
    frontendUrl: process.env.FRONTEND_URL || "http://localhost:3000",
  },

  api: {
    prefix: process.env.API_PREFIX || "api",
  },
});
