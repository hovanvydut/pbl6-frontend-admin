import { Role } from "@app/shared/app.enum";

export class AuthModel {
  email: string;
  password: string;
}

export class RegisterAccountModel extends AuthModel {
  displayName: string;
  phoneNumber: string;
  identityNumber: string;
  address: string;
  addressWardId: string;
  roleId: string;

  public constructor(init?: Partial<RegisterAccountModel>) {
    super();
    Object.assign(this, init);
  }
}

export class LoginModel extends AuthModel {
  public constructor(init?: Partial<LoginModel>) {
    super();
    Object.assign(this, init);
  }
}

export class AccountModel {
  accessToken: string;
  email: string;
  id: string;
  displayName: string;
  roleId: Role;

  public constructor(init?: Partial<AccountModel>) {
    Object.assign(this, init);
  }
}
