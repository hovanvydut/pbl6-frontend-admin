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

export class UserRequestModel extends UserBaseModel {

  public constructor(init?: Partial<UserRequestModel>) {
    super();
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