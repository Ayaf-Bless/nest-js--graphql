import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { IsBoolean, IsOptional, IsString, Length } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@InputType({ isAbstract: true })
@ObjectType()
@Entity()
export class Restaurent {
  @Column()
  @Field((_type) => String)
  @PrimaryGeneratedColumn("uuid")
  @IsString()
  id: string;

  @Field((_type) => String)
  @IsString()
  @Length(5, 8)
  @Column()
  name: string;

  @Field((_type) => String, { nullable: true })
  @IsString()
  @Column()
  description?: string;

  @Field((_type) => Boolean, { defaultValue: false })
  @Column({ default: false })
  @IsBoolean()
  @IsOptional()
  isAdmin: boolean;
}
