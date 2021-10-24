import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { join } from "path";
import { RestaurentModule } from "./restaurent/restaurent.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
    }),
    TypeOrmModule.forRoot({
      type: "postgres",
      port: 5432,
      host: "localhost",
      username: "bless_ayaf",
      database: "nuber-eats",
      password: "1122",
      synchronize: true,
      logging: true,
    }),
    RestaurentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
