import { ItemBaseModel } from '@app/shared/models/base.model';
import { AddressModel } from './../../../shared/models/address.model';
export class PostBaseModel {
  id: string;
  title: string;
  description: string;
  address: string;
  fullAddress: AddressModel;
  addressWardId: string;
  categoryId: string;
  area: number;
  price: number;
  limitTenant: number;
  prePaidPrice: number;
  properties: any[] = [];
  medias: any[] = [];
  category: ItemBaseModel;

  public constructor(init?: Partial<PostRequestModel>) {
    Object.assign(this, init);
  }
}

export class PostRequestModel extends PostBaseModel {

  public constructor(init?: Partial<PostRequestModel>) {
    super();
    Object.assign(this, init);
  }
}

export class Category {
  id: number;
  name: string;
  description: string;
  createdDate: Date;
  updatedDate: Date;

  public constructor(init?: Partial<Category>) {
    Object.assign(this, init);
  }
}

export class Review {
  id: number;
  name: string;
  rating: number;
  comment: string;

  public constructor(init?: Partial<Review>) {
    Object.assign(this, init);
  }
}
