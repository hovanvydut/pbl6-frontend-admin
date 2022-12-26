import { PropertyEnum } from "@app/modules/post/enums/property.enum";

export class BaseModel<T> {
  data: T;
  message: string;
  statusCode: number;
  success: boolean;

  constructor(init?: Partial<BaseModel<T>>) {
    Object.assign(this, init);
  }
}


export class DatasourceBaseModel<T> {
  records: T[];
  totalRecords: number;

  constructor(init?: Partial<DatasourceBaseModel<T>>) {
    Object.assign(this, init);
  }

}

export class ItemBaseModel {
  id: string | PropertyEnum;
  name: string;

  constructor(init?: Partial<ItemBaseModel>) {
    Object.assign(this, init);
  }
}

export class ItemModel extends ItemBaseModel {
  displayName: string;
  propertyGroupId?: string;

  constructor(init?: Partial<ItemModel>) {
    super();
    super(init);
  }
}

export class TabItemModel extends ItemBaseModel {
  total: number;

  constructor(init?: Partial<TabItemModel>) {
    super()
    Object.assign(this, init);
  }
}