import { Field, InputType, ObjectType, PickType } from "@nestjs/graphql";
import { User } from "../entities/user.entity";

@InputType()
export class CreateUserInput extends PickType(User, [
  "password",
  "email",
  "role",
]) {}

@ObjectType()
export class CreateUserOutput {
  @Field((_type) => String, { nullable: true })
  error?: string;

  @Field((_type) => Boolean)
  ok: boolean;
}
