interface Config {
  app: {
    name: string;
    version: string;
  };
}

const config: Config = {
  app: {
    name: process.env.NEXT_PUBLIC_APP_NAME || "Tune8",
    version: process.env.NEXT_PUBLIC_APP_VERSION || "1.0.0",
  },
};

export default config;
