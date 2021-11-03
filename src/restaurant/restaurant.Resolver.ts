import { Resolver, Args, Mutation } from "@nestjs/graphql";
import { Restaurant } from "./entities/restaurent.entity";
import {
  CreateRestaurantInput,
  CreateRestaurantOutput,
} from "./dtos/create-restaurant.dto";
import { RestaurantService } from "./restaurant.service";
import { AuthUser } from "../auth/auth-user.decorator";
import { User, UserRole } from "../users/entities/user.entity";
import { SetMetadata, UseGuards } from "@nestjs/common";
import { AuthGuard } from "../auth/auth.guard";
import { Role } from "../auth/role.decorator";

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
}
