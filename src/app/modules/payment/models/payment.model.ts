export class PaymentHistory {
  orderInfo: string;
  amount: number;
  bankCode: string;
  transactionStatus: string;
  userAccountId: number;
  userEmail: string;
  createdAt: Date;

  public constructor(init?: Partial<PaymentHistory>) {
    Object.assign(this, init);
  }
}

export class QueryParams {
  pageNumber: number;
  pageSize: number;
  searchValue?: string;
  fromDate?: string;
  toDate?: string;

  public constructor(init?: Partial<QueryParams>) {
    Object.assign(this, init);
  }
}