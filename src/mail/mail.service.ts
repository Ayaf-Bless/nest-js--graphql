import { Inject, Injectable } from "@nestjs/common";
import { CONFIG_OPTION } from "../common/common.constants";
import { ConfigService } from "@nestjs/config";
import { MailIModuleOptions } from "./mailInterface";
import got from "got";
import * as FormData from "form-data";

@Injectable()
export class MailService {
  constructor(
    @Inject(CONFIG_OPTION) private readonly options: MailIModuleOptions,
    private readonly config: ConfigService,
  ) {}
  async sendMail(subject: string, content: string) {
    const form = new FormData();

    form.append("from", `Excited User <AYAF@${this.options.domain}>`);
    form.append("to", `blessambel1@gmail.com`);
    form.append("subject", subject);
    form.append("template", "innit");
    form.append("v:code", "xbfkjgjdgzb");
    form.append("v:username", "bless");
    const res = await got.post(
      `https://api.mailgun.net/v3/${this.options.domain}/messages`,
      {
        headers: {
          Authorization: `Basic ${Buffer.from(
            `api:${this.options.apiKet}`,
          ).toString("base64")}`,
        },
        body: form,
        method: "POST",
      },
    );
  }
}
