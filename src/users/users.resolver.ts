import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Inject, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { User } from "./entities/user.entity";
import { CreateUserInput, CreateUserOutput } from "./dtos/create-user.dto";
import { LoginInput, LoginOutput } from "./dtos/login.dto";
import { AuthGuard } from "../auth/auth.guard";
import { AuthUser } from "../auth/auth-user.decorator";
import { UserProfileInput, UserProfileOutput } from "./dtos/user-profile.dto";
import { UserUpdateInput, UserUpdateOutput } from "./dtos/user-update.dto";
import { VerifyEmailInput, VerifyEmailOut } from "./dtos/verify-email.dto";

@Resolver((_of) => User)
export class UsersResolver {
  constructor(
    @Inject(UsersService) private readonly usersService: UsersService,
  ) {}
  @Query((_returns) => User)
  @UseGuards(AuthGuard)
  me(@AuthUser() authUser: User) {
    return authUser;
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

  @UseGuards(AuthGuard)
  @Query((_returns) => UserProfileOutput)
  async getUser(
    @Args() userProfileInput: UserProfileInput,
  ): Promise<UserProfileOutput> {
    try {
      const user = await this.usersService.findById(userProfileInput.UserId);
      if (!user) throw Error("User not found");
      return {
        user,
        ok: Boolean(user),
      };
    } catch (error) {
      return {
        ok: false,
        error: error.message,
      };
    }
  }

  @UseGuards(AuthGuard)
  @Mutation((_returns) => UserUpdateOutput)
  updateUser(
    @AuthUser() authUser: User,
    @Args("input") userUpdateInput: UserUpdateInput,
  ) {
    return this.usersService.updateUser(authUser.id, userUpdateInput);
  }
  @Mutation((_returns) => VerifyEmailOut)
  verifyEmail(@Args("input") { code }: VerifyEmailInput) {
    return this.usersService.verifyEmail(code);
  }
}
