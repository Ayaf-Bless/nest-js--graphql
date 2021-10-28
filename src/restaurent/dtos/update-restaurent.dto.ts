import { ArgsType, Field, InputType, PartialType } from "@nestjs/graphql";
import { CreateRestaurantDto } from "./create-restaurant.dto";
import { Allow, IsString } from "class-validator";

@InputType()
class UpdateRestaurentInput extends PartialType(CreateRestaurantDto) {}

@ArgsType()
export class UpdateRestaurantDto {
  @Field((_type) => String)
  @IsString()
  id: string;

  @Field((_type) => UpdateRestaurentInput)
  @Allow()
  data: UpdateRestaurentInput;
}
