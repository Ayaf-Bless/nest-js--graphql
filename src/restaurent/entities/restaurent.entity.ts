import { Field, ObjectType } from "@nestjs/graphql";
import { IsString, Min } from "class-validator";

@ObjectType()
export class Restaurent {
  @Field((_type) => String)
  @IsString()
  @Min(5)
  name: string;

  @Field((_type) => String, { nullable: true })
  @IsString()
  description?: string;
}
