import { BeforeInsert, BeforeUpdate, Column, Entity } from "typeorm";
import {
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from "@nestjs/graphql";
import { IsEmail, IsEnum, IsString, Length } from "class-validator";
import { CoreEntity } from "../../common/entities/core.entity";
import * as bcrypt from "bcrypt";
import { InternalServerErrorException } from "@nestjs/common";

enum UserRole {
  Client = "Client",
  Owner = "Owner",
  Delivery = "Delivery",
}

registerEnumType(UserRole, { name: "UserRole" });

@InputType({ isAbstract: true })
@Entity()
@ObjectType()
export class User extends CoreEntity {
  @Column({ unique: true })
  @Field((_type) => String)
  @IsEmail()
  email: string;

  @Column({ select: false })
  @Field((_type) => String)
  @IsString()
  @Length(5, 20)
  password: string;

  @Column({ type: "enum", enum: UserRole })
  @Field((_type) => UserRole)
  @IsEnum(UserRole)
  role: UserRole;

  @BeforeUpdate()
  @BeforeInsert()
  async hashPassWord() {
    try {
      this.password = await bcrypt.hash(this.password, 10);
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException();
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
