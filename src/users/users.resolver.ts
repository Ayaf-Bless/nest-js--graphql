import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Inject } from "@nestjs/common";
import { UsersService } from "./users.service";
import { User } from "./entities/user.entity";
import { CreateUserInput, CreateUserOutput } from "./dtos/create-user.dto";

@Resolver((_of) => User)
export class UsersResolver {
  constructor(
    @Inject(UsersService) private readonly usersService: UsersService,
  ) {}
  @Query((_returns) => Boolean)
  getAll() {
    return this.usersService.getI();
  }
  @Mutation((_returns) => CreateUserOutput)
  createAccount(
    @Args("input") createAccount: CreateUserInput,
  ): CreateUserOutput {
    return { ok: false };
  }
}
