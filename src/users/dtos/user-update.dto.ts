import { CoreOutput } from "../../common/dtos/output.dto";
import { InputType, ObjectType, PartialType, PickType } from "@nestjs/graphql";
import { User } from "../entities/user.entity";

@InputType()
export class UserUpdateInput extends PartialType(
  PickType(User, ["email", "password"]),
) {}

@ObjectType()
export class UserUpdateOutput extends CoreOutput {}
