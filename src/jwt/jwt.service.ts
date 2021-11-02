import { Inject, Injectable } from "@nestjs/common";
import { JwtModuleOptions } from "./jwt.interfaces";
import { CONFIG_OPTION } from "../common/common.constants";
import * as jwt from "jsonwebtoken";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class JwtService {
  constructor(
    @Inject(CONFIG_OPTION) private readonly options: JwtModuleOptions,
    private readonly config: ConfigService,
  ) {}
  sign(payload: object): string {
    return jwt.sign(payload, this.options.privateKey, {
      expiresIn: this.config.get("TOKEN_EXPIRING_DATE"),
    });
  }
  verify(token: string) {
    return jwt.verify(token, this.options.privateKey);
  }
}
