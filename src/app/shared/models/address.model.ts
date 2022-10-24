import { ItemBaseModel, ItemModel } from "./base.model";

export class AddressModel {
  ward: ItemBaseModel;
  district: ItemBaseModel;
  province: ItemBaseModel;

  constructor(init?: Partial<AddressModel>) {
    Object.assign(this, init);
  }
}

export class ProvinceModel extends ItemBaseModel {
  addressProvinces: ItemModel[];

  constructor(init?: Partial<ProvinceModel>) {
    super();
    Object.assign(this, init);
  }
}

export class DistrictModel extends ItemBaseModel {
  addressDistricts: ItemModel[];

  constructor(init?: Partial<DistrictModel>) {
    super();
    Object.assign(this, init);
  }
}

export class WardModel extends ItemBaseModel {
  addressWards: ItemModel[];

  constructor(init?: Partial<WardModel>) {
    super();
    Object.assign(this, init);
  }
}


