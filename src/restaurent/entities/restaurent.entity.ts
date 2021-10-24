import { Field, ObjectType } from "@nestjs/graphql";
import { IsString, Min } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class Restaurent {
  @Column()
  @Field((_type) => String)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field((_type) => String)
  @IsString()
  @Min(5)
  @Column()
  name: string;

  @Field((_type) => String, { nullable: true })
  @IsString()
  @Column()
  description?: string;
}
