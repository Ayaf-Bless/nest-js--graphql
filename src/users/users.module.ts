import { Module } from "@nestjs/common";
import { UsersResolver } from "./users.resolver";
import { UsersService } from "./users.service";
import { User } from "./entities/user.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Verification } from "./entities/verification.entity";

@Module({
  providers: [UsersResolver, UsersService],
  imports: [TypeOrmModule.forFeature([User, Verification])],
  exports: [UsersService],
})
export class UsersModule {}
