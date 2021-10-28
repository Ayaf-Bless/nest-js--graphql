import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { IsDate, IsString } from "class-validator";
import { Field } from "@nestjs/graphql";

@Entity()
export class CoreEntity {
  @PrimaryGeneratedColumn("uuid")
  @Field((_type) => String)
  @IsString()
  id: string;

  @CreateDateColumn()
  @Field((_type) => Date)
  @IsDate()
  createdAt: Date;

  @UpdateDateColumn()
  @Field((_type) => Date)
  @IsDate()
  updatedAt: Date;
}
