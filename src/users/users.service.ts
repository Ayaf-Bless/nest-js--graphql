import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserInput, CreateUserOutput } from "./dtos/create-user.dto";
import { LoginInput, LoginOutput } from "./dtos/login.dto";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "../jwt/jwt.service";
import { UserProfileInput } from "./dtos/user-profile.dto";
import { UserUpdateInput, UserUpdateOutput } from "./dtos/user-update.dto";
import { Verification } from "./entities/verification.entity";
import { VerifyEmailOut } from "./dtos/verify-email.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    @InjectRepository(Verification)
    private readonly verificationRepo: Repository<Verification>,
    private readonly config: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async findById(id: string): Promise<User> {
    return this.userRepo.findOne(id);
  }

  async createAccount({
    email,
    password,
    role,
  }: CreateUserInput): Promise<CreateUserOutput> {
    try {
      const exists = await this.userRepo.findOne({
        email,
      });
      if (exists) {
        return {
          ok: false,
          error: "User already exist",
        };
      }
      const user = await this.userRepo.save(
        this.userRepo.create({ password, role, email }),
      );
      await this.verificationRepo.save(
        this.verificationRepo.create({
          user,
        }),
      );
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

  async updateUser(
    id: string,
    { email, password }: UserUpdateInput,
  ): Promise<UserUpdateOutput> {
    const user = await this.findById(id);
    if (email) {
      user.email = email;
      user.Verified = false;
      await this.verificationRepo.save(this.verificationRepo.create({ user }));
    }
    if (password) {
      user.password = password;
    }
    await this.userRepo.save(user);
    return {
      ok: true,
    };
  }

  async verifyEmail(code: string): Promise<VerifyEmailOut> {
    try {
      const verification = await this.verificationRepo.findOne(
        { code },
        { relations: ["user"] },
      );
      if (!verification) {
        throw new Error();
      }
      verification.user.Verified = true;
      await this.userRepo.save(verification.user);
      await this.verificationRepo.delete(verification.id);
      return {
        ok: true,
      };
    } catch {
      return {
        ok: false,
        error: "failed to verified your email, please try again later",
      };
    }
  }
}
