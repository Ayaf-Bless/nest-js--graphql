import { Field, InputType, ObjectType, PickType } from "@nestjs/graphql";
import { Restaurant } from "../entities/restaurent.entity";
import { CoreOutput } from "../../common/dtos/output.dto";
import { IsString } from "class-validator";

@InputType()
export class CreateRestaurantInput extends PickType(Restaurant, [
  "name",
  "address",
  "coverImage",
  "description",
]) {
  @Field((_type) => String)
  @IsString()
  categoryName: string;
}

@ObjectType()
export class CreateRestaurantOutput extends CoreOutput {}
