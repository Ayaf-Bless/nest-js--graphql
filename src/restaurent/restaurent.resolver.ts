import { Resolver, Query, Args, Mutation } from "@nestjs/graphql";
import { Restaurent } from "./entities/restaurent.entity";
import { RestaurantInputDto } from "./dtos/restaurant.dto";

@Resolver((_of) => Restaurent)
export class RestaurentResolver {
  @Query((_returns) => [Restaurent])
  restaurent(@Args("veganOnly") veganOnly: boolean): Restaurent[] {
    return [];
  }

  @Mutation((_returns) => Boolean)
  createRestaurent(@Args("input") restaurantDto: RestaurantInputDto): boolean {
    return false;
  }
}
