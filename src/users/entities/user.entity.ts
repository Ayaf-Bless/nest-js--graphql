import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  OneToOne,
} from "typeorm";
import {
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from "@nestjs/graphql";
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsLowercase,
  IsString,
  Length,
} from "class-validator";
import { CoreEntity } from "../../common/entities/core.entity";
import * as bcrypt from "bcrypt";
import { InternalServerErrorException } from "@nestjs/common";
import { Verification } from "./verification.entity";
import { JoinColumn } from "typeorm/browser";
import { Restaurant } from "../../restaurant/entities/restaurent.entity";

export enum UserRole {
  Client = "Client",
  Owner = "Owner",
  Delivery = "Delivery",
}

registerEnumType(UserRole, { name: "UserRole" });

@InputType("UserInputType", { isAbstract: true })
@Entity()
@ObjectType()
export class User extends CoreEntity {
  @Column({ unique: true })
  @Field((_type) => String)
  @IsEmail()
  @IsLowercase()
  email: string;

  @Column({ default: false })
  @Field((_type) => Boolean)
  @IsBoolean()
  Verified: boolean;

  @Column({ select: false })
  @Field((_type) => String)
  @IsString()
  @Length(5, 20)
  password: string;

  @Column({ type: "enum", enum: UserRole })
  @Field((_type) => UserRole)
  @IsEnum(UserRole)
  role: UserRole;

  @Field((_type) => [Restaurant])
  @OneToMany((_type) => Restaurant, (restaurent) => restaurent.owner)
  restaurants: Restaurant;

  @BeforeUpdate()
  @BeforeInsert()
  async hashPassWord() {
    if (this.password) {
      try {
        this.password = await bcrypt.hash(this.password, 10);
      } catch (e) {
        console.log(e);
        throw new InternalServerErrorException();
      }
    }
  }

  async checkPassword(password: string): Promise<boolean> {
    try {
      return await bcrypt.compare(password, this.password);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }
}
