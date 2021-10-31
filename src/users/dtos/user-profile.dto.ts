import { ArgsType, Field, ObjectType } from "@nestjs/graphql";
import { IsString } from "class-validator";
import { CoreOutput } from "../../common/dtos/output.dto";
import { User } from "../entities/user.entity";

@ArgsType()
export class UserProfileInput {
  @Field((_type) => String)
  @IsString()
  UserId: string;
}

@ObjectType()
export class UserProfileOutput extends CoreOutput {
  @Field((_type) => User, { nullable: true })
  user?: User;
}
