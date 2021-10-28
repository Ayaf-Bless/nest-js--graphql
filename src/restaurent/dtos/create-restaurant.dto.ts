import { InputType, OmitType } from "@nestjs/graphql";
import { Restaurent } from "../entities/restaurent.entity";

@InputType()
export class CreateRestaurantDto extends OmitType(Restaurent, ["id"]) {}
