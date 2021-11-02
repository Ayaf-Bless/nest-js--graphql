import { v4 as uuidv4 } from "uuid";
import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { CoreEntity } from "src/common/entities/core.entity";
import {
  BeforeInsert,
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToOne,
} from "typeorm";
import { User } from "./user.entity";
import { IsString } from "class-validator";

@InputType({ isAbstract: true })
@ObjectType()
@Entity()
export class Verification extends CoreEntity {
  @Column()
  @Index()
  @Field((type) => String)
  @IsString()
  code: string;

  @OneToOne((type) => User, { onDelete: "CASCADE" })
  @JoinColumn()
  user: User;

  @BeforeInsert()
  createCode(): void {
    this.code = uuidv4();
  }
}
