import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { IsString, IsUUID } from "class-validator";
import { CoreOutput } from "../../common/dtos/output.dto";

@InputType()
export class DeleteRestaurantInput {
  @Field((_type) => String)
  @IsString()
  @IsUUID()
  id: string;
}

@ObjectType()
export class DeleteRestaurantOutput extends CoreOutput {}
