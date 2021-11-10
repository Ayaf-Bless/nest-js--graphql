import { Module } from "@nestjs/common";
import { CategoryResolver, RestaurantResolver } from "./restaurant.Resolver";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Restaurant } from "./entities/restaurent.entity";
import { RestaurantService } from "./restaurant.service";
import { CategoryRepository } from "./repository/category.repository";

@Module({
  providers: [RestaurantResolver, RestaurantService, CategoryResolver],
  imports: [TypeOrmModule.forFeature([Restaurant, CategoryRepository])],
})
export class RestaurantModule {}
