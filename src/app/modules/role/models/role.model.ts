export class RoleBaseModel {
  id: number;
  name: string;
  description: string;
  permisison: any;


  public constructor(init?: Partial<RoleRequestModel>) {
    Object.assign(this, init);
  }
}

export class RoleRequestModel extends RoleBaseModel {

  public constructor(init?: Partial<RoleRequestModel>) {
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