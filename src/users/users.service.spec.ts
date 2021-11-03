import { Test } from "@nestjs/testing";
import { UsersService } from "./users.service";
import { getRegistrationToken } from "@nestjs/config/dist/utils/get-registration-token.util";
import { User } from "./entities/user.entity";
import { Verification } from "./entities/verification.entity";
import { JwtService } from "../jwt/jwt.service";
import { MailService } from "../mail/mail.service";

const mockRepository = {
  findOne: jest.fn(),
  save: jest.fn(),
  create: jest.fn(),
};
const mockJwtService = {
  verify: jest.fn(),
  sign: jest.fn(),
};
let service: UsersService;
describe("user-service", function () {
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRegistrationToken(User),
          useValue: mockRepository,
        },
        {
          provide: getRegistrationToken(Verification),
          useValue: mockRepository,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
        {
          provide: MailService,
          useValue: mockJwtService,
        },
      ],
    }).compile();
    service = await module.resolve(UsersService);
  });
  it("should be defined", async () => {
    expect(service).toBeFalsy();
  });

  it.todo("findById");
  it.todo("createAccount");
  it.todo("login");
  it.todo("updateUser");
  it.todo("verifyEmail");
});
