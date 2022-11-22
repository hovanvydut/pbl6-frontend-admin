import { Injectable } from '@angular/core';
import { BaseService } from '@app/core/services/base.service';
import { QueryParams } from '@app/modules/payment/models';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  constructor(private baseService: BaseService) { }

  getPaymentTransaction(params: QueryParams) {
    const queryString =
      '?' +
      Object.keys(params)
        .map(key => {
          if (params[key] !== null) {
            return `${key.charAt(0).toUpperCase() +
              key.slice(1)}=${encodeURIComponent(params[key])}`;
          }
          return '';
        })
        .join('&');
    return this.baseService.get<any>(`payment/history${queryString}`);
  }

  getRechargeTransaction(params: QueryParams) {
    const queryString =
      '?' +
      Object.keys(params)
        .map(key => {
          if (params[key] !== null) {
            return `${key.charAt(0).toUpperCase() +
              key.slice(1)}=${encodeURIComponent(params[key])}`;
          }
          return '';
        })
        .join('&');
    return this.baseService.get<any>(`payment-history${queryString}`);
  }
}
