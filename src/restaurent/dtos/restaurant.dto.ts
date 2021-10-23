import { Field, InputType } from "@nestjs/graphql";
import { IsString, Length, Max, Min } from "class-validator";

@InputType()
export class RestaurantInputDto {
  @Field((_type) => String)
  @IsString()
  @Length(5, 8)
  name: string;
}
