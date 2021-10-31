import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserInput, CreateUserOutput } from "./dtos/create-user.dto";
import { LoginInput, LoginOutput } from "./dtos/login.dto";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "../jwt/jwt.service";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private readonly config: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  getI() {
    return true;
  }

  async findById(id: string): Promise<User> {
    return this.userRepo.findOne(id);
  }

  async createAccount({
    email,
    password,
    role,
  }: CreateUserInput): Promise<CreateUserOutput> {
    try {
      const user = await this.userRepo.findOne({
        email,
      });
      if (user) {
        return {
          ok: false,
          error: "User already exist",
        };
      }
      await this.userRepo.save(this.userRepo.create({ password, role, email }));
      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  async login({ email, password }: LoginInput): Promise<LoginOutput> {
    try {
      const user = await this.userRepo.findOne(
        { email },
        { select: ["password", "id"] },
      );
      if (!user) {
        return {
          ok: false,
          error: "User does not exist",
        };
      }
      const passwordCorrect = await user.checkPassword(password);
      if (!passwordCorrect) {
        return {
          ok: false,
          error:
            "please check you email and password, and make sure they match",
        };
      }
      const token = this.jwtService.sign({ id: user.id });
      return {
        ok: true,
        token,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }
}
