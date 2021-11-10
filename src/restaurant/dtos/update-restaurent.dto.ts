import { Field, InputType, ObjectType, PartialType } from "@nestjs/graphql";
import { CreateRestaurantInput } from "./create-restaurant.dto";
import { CoreOutput } from "../../common/dtos/output.dto";
import { IsString } from "class-validator";

@InputType()
export class UpdateRestaurantInput extends PartialType(CreateRestaurantInput) {
  @Field((_type) => String)
  @IsString()
  id: string;
}

@ObjectType()
export class UpdateRestaurantOutput extends CoreOutput {}
