import { StatisticKey } from "../enums";

export class StatisticParamsModel  {
  key: StatisticKey;
  userIds?: string[];
  fromDate?: string;
  toDate?: string;

  public constructor(init?: Partial<StatisticParamsModel>) {
    Object.assign(this, init);
  }
}

export class StatisticDetailParamsModel {
  key: StatisticKey;
  date: string;
  top?: number;

  pageNumber: number;
  pageSize: number;
  searchValue: string;


  public constructor(init?: Partial<StatisticDetailParamsModel>) {
    Object.assign(this, init);
  }
}
