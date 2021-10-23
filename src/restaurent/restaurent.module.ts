import { Module } from "@nestjs/common";
import { RestaurentResolver } from "./restaurent.resolver";

@Module({
  providers: [RestaurentResolver],
})
export class RestaurentModule {}
