import { Module } from "@nestjs/common";
import { RestaurantResolver } from "./restaurant.Resolver";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Restaurant } from "./entities/restaurent.entity";
import { RestaurantService } from "./restaurant.service";
import { Category } from "./entities/category.entity";

@Module({
  providers: [RestaurantResolver, RestaurantService],
  imports: [TypeOrmModule.forFeature([Restaurant, Category])],
})
export class RestaurantModule {}
