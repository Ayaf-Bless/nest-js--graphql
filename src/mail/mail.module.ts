import { DynamicModule, Global, Module } from "@nestjs/common";
import { CONFIG_OPTION } from "../common/common.constants";
import { MailIModuleOptions } from "./mailInterface";
import { MailService } from "./mail.service";

@Module({})
@Global()
export class MailModule {
  static forRoot(options: MailIModuleOptions): DynamicModule {
    return {
      module: MailModule,
      providers: [
        {
          provide: CONFIG_OPTION,
          useValue: options,
        },
        MailService,
      ],
      exports: [MailService],
    };
  }
}
