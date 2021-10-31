import { Args, Context, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Inject } from "@nestjs/common";
import { UsersService } from "./users.service";
import { User } from "./entities/user.entity";
import { CreateUserInput, CreateUserOutput } from "./dtos/create-user.dto";
import { LoginInput, LoginOutput } from "./dtos/login.dto";

@Resolver((_of) => User)
export class UsersResolver {
  constructor(
    @Inject(UsersService) private readonly usersService: UsersService,
  ) {}
  @Query((_returns) => User)
  me(@Context() context) {

    return this.usersService.getI();
  }

  @Mutation((_returns) => CreateUserOutput)
  async createAccount(
    @Args("input") createAccount: CreateUserInput,
  ): Promise<CreateUserOutput> {
    return this.usersService.createAccount(createAccount);
  }

  @Mutation((_returns) => LoginOutput)
  async login(@Args("input") loginInput: LoginInput): Promise<LoginOutput> {
    return this.usersService.login(loginInput);
  }
}
