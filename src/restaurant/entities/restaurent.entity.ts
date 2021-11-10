import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { IsString, Length } from "class-validator";
import { Column, Entity, ManyToOne, RelationId } from "typeorm";
import { CoreEntity } from "../../common/entities/core.entity";
import { Category } from "./category.entity";
import { User } from "../../users/entities/user.entity";

@InputType("RestaurantInputType", { isAbstract: true })
@ObjectType()
@Entity()
export class Restaurant extends CoreEntity {
  @Field((_type) => String)
  @IsString()
  @Column()
  name: string;

  @Field((_type) => String, { nullable: true })
  @IsString()
  @Column()
  description?: string;

  @Field((_type) => String)
  @IsString()
  @Column()
  address: string;

  @Field((_type) => String)
  @IsString()
  @Column()
  coverImage: string;

  @Field((_type) => Category, { nullable: true })
  @IsString()
  @ManyToOne((_type) => Category, (category) => category.restaurants, {
    onDelete: "SET NULL",
    nullable: true,
  })
  category: Category;

  @Field((_type) => User)
  @IsString()
  @ManyToOne((_type) => User, (user) => user.restaurants, {
    nullable: false,
    onDelete: "CASCADE",
  })
  owner: User;

  @RelationId((restaurent: Restaurant) => restaurent.owner)
  ownerId: String;
}
