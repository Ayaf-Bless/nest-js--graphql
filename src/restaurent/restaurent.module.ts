import { Module } from "@nestjs/common";
import { RestaurentResolver } from "./restaurent.resolver";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Restaurent } from "./entities/restaurent.entity";
import { RestaurentService } from "./restaurent.service";

@Module({
  providers: [RestaurentResolver, RestaurentService],
  imports: [TypeOrmModule.forFeature([Restaurent])],
})
export class RestaurentModule {}
