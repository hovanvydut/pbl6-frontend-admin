export class SettingBaseModel {
  key: string;
  description: string;
  value: number;


  public constructor(init?: Partial<SettingBaseModel>) {
    Object.assign(this, init);
  }
}

export class SettingRequestModel {
  description: string;
  value: number;

  public constructor(init?: Partial<SettingRequestModel>) {
    Object.assign(this, init);
  }
}