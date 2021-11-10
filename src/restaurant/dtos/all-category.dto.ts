import { CoreOutput } from "../../common/dtos/output.dto";
import { Field, ObjectType } from "@nestjs/graphql";
import { Category } from "../entities/category.entity";

@ObjectType()
export class AllCategoryOutPut extends CoreOutput {
  @Field((_type) => [Category], { nullable: true })
  categories?: Category[];
}
