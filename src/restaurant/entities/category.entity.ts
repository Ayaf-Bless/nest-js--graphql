import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { IsString, Length } from "class-validator";
import { Column, Entity, OneToMany } from "typeorm";
import { CoreEntity } from "../../common/entities/core.entity";
import { Restaurant } from "./restaurent.entity";

@InputType("CategoryInputType", { isAbstract: true })
@ObjectType()
@Entity()
export class Category extends CoreEntity {
  @Field((_type) => String)
  @IsString()
  @Column({ unique: true })
  name: string;

  @Field((_type) => String, { nullable: true })
  @IsString()
  @Column({ nullable: true })
  coverImage: string;

  @Field((_type) => [Restaurant])
  @OneToMany((_type) => Restaurant, (restaurent) => restaurent.category)
  restaurants: Restaurant;

  @Field((_type) => String)
  @Column({ unique: true })
  @IsString()
  slug: string;
}
