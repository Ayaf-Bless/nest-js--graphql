import { Resolver, Args, Mutation, Query, ResolveField } from "@nestjs/graphql";
import { Restaurant } from "./entities/restaurent.entity";
import {
  CreateRestaurantInput,
  CreateRestaurantOutput,
} from "./dtos/create-restaurant.dto";
import { RestaurantService } from "./restaurant.service";
import { AuthUser } from "../auth/auth-user.decorator";
import { User } from "../users/entities/user.entity";
import { Role } from "../auth/role.decorator";
import {
  UpdateRestaurantInput,
  UpdateRestaurantOutput,
} from "./dtos/update-restaurent.dto";
import {
  DeleteRestaurantInput,
  DeleteRestaurantOutput,
} from "./dtos/delete-restaurant.dto";
import { Category } from "./entities/category.entity";
import { AllCategoryOutPut } from "./dtos/all-category.dto";

@Resolver((_of) => Restaurant)
export class RestaurantResolver {
  constructor(private readonly restaurentService: RestaurantService) {}

  @Role(["Owner"])
  @Mutation((_returns) => CreateRestaurantOutput)
  async createRestaurent(
    @AuthUser() authUser: User,
    @Args("input") createRestaurantInput: CreateRestaurantInput,
  ): Promise<CreateRestaurantOutput> {
    return this.restaurentService.createRestaurent(
      authUser,
      createRestaurantInput,
    );
  }

  @Mutation((_returns) => UpdateRestaurantOutput)
  @Role(["Owner"])
  async updateRestaurant(
    @AuthUser() authUser: User,
    @Args("input") updateRestaurantInput: UpdateRestaurantInput,
  ): Promise<UpdateRestaurantOutput> {
    return this.restaurentService.updateRestaurant(
      authUser,
      updateRestaurantInput,
    );
  }

  @Mutation((_returns) => DeleteRestaurantOutput)
  @Role(["Owner"])
  deleteRestaurant(
    @AuthUser() owner: User,
    @Args("input") deleteRestaurantInput: DeleteRestaurantInput,
  ) {
    return this.restaurentService.deleteRestaurant(
      owner,
      deleteRestaurantInput,
    );
  }
}

@Resolver((_od) => Category)
export class CategoryResolver {
  constructor(private readonly restaurentService: RestaurantService) {}

  @ResolveField((_type) => Number)
  restaurantCount(): number {
    return 8;
  }
  @Query((_returns) => AllCategoryOutPut)
  getCategories() {
    return this.restaurentService.allCategory();
  }
}
