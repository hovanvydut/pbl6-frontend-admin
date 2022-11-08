export class UserBaseModel {
  accountId: number;
  profileId: number;
  email: string;
  displayName: string;
  phoneNumber: string;
  identityNumber: string;
  avatar: string;
  address: string;
  addressWard: string;
  addressDistrict: string;
  addressProvince: string;


  public constructor(init?: Partial<UserRequestModel>) {
    Object.assign(this, init);
  }
}

export class UserAccountModel {
  email: string = '';
  isVerified: boolean = true;
  isActived: boolean = true;
  roleId: number = 0;
  roleName: string = '';

  public constructor(init?: Partial<UserAccountModel>) {
    Object.assign(this, init);
  }
}

export class UserRequestModel {
  id: number = 0;
  roleId: number = 0;
  isActived: boolean = false;

  public constructor(init?: Partial<UserRequestModel>) {
    Object.assign(this, init);
  }
}

export class QueryParams {
  pageNumber: number;
  pageSize: number;
  searchValue?: string;

  public constructor(init?: Partial<QueryParams>) {
    Object.assign(this, init);
  }
}