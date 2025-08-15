import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { HttpModule } from "@nestjs/axios";

import { AppController } from "./app.controller";
import { ItunesController } from "./controllers/itunes.controller";

import { AppService } from "./app.service";
import { ItunesService } from "./services/itunes.service";

import configuration from "./config/configuration";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      envFilePath: ["../.env", ".env", ".env.local", ".env.development", ".env.production"],
    }),
    HttpModule,
  ],
  controllers: [AppController, ItunesController],
  providers: [AppService, ItunesService],
})
export class AppModule {}
