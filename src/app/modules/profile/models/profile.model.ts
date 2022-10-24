export class ProfileBaseModel {
  id: string;
  avatar: string;
  displayName: string;
  address: string;
  addressWardId: string;
  addressWard: string;
  addressDistrict: string;
  addressProvince: string;
  userAccountEmail: string;

  constructor(init?: Partial<ProfileBaseModel>) {
    Object.assign(this, init);
  }
}

export class ProfileGeneralInfoModel extends ProfileBaseModel {
  totalPosts: number = 0;
  reputation: number = 0;
  totalReviews: number = 0;

  constructor(init?: Partial<ProfileGeneralInfoModel>) {
    super();
    Object.assign(this, init);
  }
}

export class ProfileModel extends ProfileBaseModel {
  phoneNumber: string;
  identityNumber: string;
  currentCredit: string;
  userAccountId: string;

  constructor(init?: Partial<ProfileModel>) {
    super();
    Object.assign(this, init);
  }
}

export class ProfileUpdateModel {
  avatar: string;
  phoneNumber: string;
  displayName: string;
  address: string;
  addressWardId: string;

  constructor(init?: Partial<ProfileUpdateModel>) {
    Object.assign(this, init);
  }
}
