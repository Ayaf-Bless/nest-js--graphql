import { Resolver, Query, Args, Mutation } from "@nestjs/graphql";
import { Restaurent } from "./entities/restaurent.entity";
import { CreateRestaurantDto } from "./dtos/create-restaurant.dto";
import { RestaurentService } from "./restaurent.service";
import { UpdateRestaurantDto } from "./dtos/update-restaurent.dto";

@Resolver((_of) => Restaurent)
export class RestaurentResolver {
  constructor(private readonly restaurentService: RestaurentService) {}
  @Query((_returns) => [Restaurent])
  async restaurent(): Promise<Restaurent[]> {
    return this.restaurentService.getAllRestaurent();
  }

  @Mutation((_returns) => Restaurent)
  createRestaurent(
    @Args("input") CreateRestaurantInputDto: CreateRestaurantDto,
  ) {
    return this.restaurentService.createRestaurent(CreateRestaurantInputDto);
  }

  @Mutation((_returns) => Restaurent)
  async updateRestaurent(@Args() updateRestaurentDto: UpdateRestaurantDto) {
    return this.restaurentService.updateRestaurent(updateRestaurentDto);
  }
}
