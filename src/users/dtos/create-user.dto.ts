import { Field, InputType, ObjectType, PickType } from "@nestjs/graphql";
import { User } from "../entities/user.entity";
import { MutationOutput } from "../../common/dtos/output.dto";

@InputType()
export class CreateUserInput extends PickType(User, [
  "password",
  "email",
  "role",
]) {}

@ObjectType()
export class CreateUserOutput extends MutationOutput {}
