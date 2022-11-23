import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
//
import { BaseService } from 'src/app/core/services/base.service';
import { StatisticDetailParamsModel, StatisticParamsModel } from '../models';

@Injectable({
  providedIn: 'root'
})
export class StatisticService {
  constructor(private baseService: BaseService) {}

  getStatistic(params: StatisticParamsModel): Observable<any> {
    const queryString =
    '?' +
    Object.keys(params)
      .map(key => {
        if (params[key] !== null) {
          return `${key.charAt(0).toUpperCase() + key.slice(1)}=${encodeURIComponent(params[key])}`;
        }
        return '';
      })
      .join('&');
    return this.baseService.get(`user-statistic${queryString}`);
  }

  getStatisticDetail(params: StatisticDetailParamsModel): Observable<any> {
    const queryString =
    '?' +
    Object.keys(params)
      .map(key => {
        if (params[key] !== null) {
          return `${key.charAt(0).toUpperCase() + key.slice(1)}=${encodeURIComponent(params[key])}`;
        }
        return '';
      })
      .join('&');
    return this.baseService.get(`user-statistic/detail${queryString}`);
  }

  getStatisticTop(params: StatisticDetailParamsModel): Observable<any> {
    const queryString =
    '?' +
    Object.keys(params)
      .map(key => {
        if (params[key] !== null) {
          return `${key.charAt(0).toUpperCase() + key.slice(1)}=${encodeURIComponent(params[key])}`;
        }
        return '';
      })
      .join('&');
    return this.baseService.get(`user-statistic/top${queryString}`);
  }
}
