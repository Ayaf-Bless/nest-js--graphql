import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { RestaurentModule } from "./restaurent/restaurent.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import * as Joi from "joi";
import { Restaurent } from "./restaurent/entities/restaurent.entity";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
      ignoreEnvFile: process.env.NODE_ENV === "prod",
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid("dev", "test", "prod"),
        DB_PORT: Joi.string().required(),
        DB_HOST: Joi.string().required(),
        DB_USER: Joi.string().required(),
        DB_NAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
      }),
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
    }),
    TypeOrmModule.forRoot({
      type: "postgres",
      port: +process.env.DB_PORT,
      host: process.env.DB_HOST,
      username: process.env.DB_USER,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      synchronize: process.env.NODE_ENV !== "prod",
      logging: process.env.NODE_ENV !== "prod",
      entities: [Restaurent],
    }),
    RestaurentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
