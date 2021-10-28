import { Column, Entity } from "typeorm";
import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { IsString } from "class-validator";
import { CoreEntity } from "../../common/entities/core.entity";

type UserRole = "Client" | "Owner" | "Delivery";

@InputType({ isAbstract: true })
@Entity()
@ObjectType()
export class User extends CoreEntity {
  @Column()
  @Field((_type) => String)
  @IsString()
  email: string;

  @Column()
  @Field((_type) => String)
  @IsString()
  password: string;

  @Column()
  @Field((_type) => String)
  @IsString()
  role: UserRole;
}
