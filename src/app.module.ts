import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { join } from "path";
import { RestaurentModule } from "./restaurent/restaurent.module";

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: true,
    }),
    RestaurentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
