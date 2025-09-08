interface Config {
  app: {
    name: string;
    version: string;
  };
  api: {
    baseUrl: string;
  };
}

const config: Config = {
  app: {
    name: process.env.NEXT_PUBLIC_APP_NAME || "Tune8",
    version: process.env.NEXT_PUBLIC_APP_VERSION || "1.0.0",
  },
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:4009",
  },
};

export default config;
