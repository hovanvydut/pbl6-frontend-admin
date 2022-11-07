import { Injectable } from '@angular/core';
import { DatasourceBaseModel } from '@app/shared/models/base.model';
import { Observable } from 'rxjs';
//
import { BaseService } from 'src/app/core/services/base.service';
import {
  UserBaseModel,
  QueryParams,
  UserRequestModel,
  UserAccountModel,
} from '../models';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private baseService: BaseService) { }

  getUsers(params: QueryParams): Observable<DatasourceBaseModel<UserBaseModel>> {
    const queryString =
      '?' +
      Object.keys(params)
        .map(key => {
          return `${key.charAt(0).toUpperCase() + key.slice(1)}=${encodeURIComponent(params[key])}`;
        })
        .join('&');
    return this.baseService.get(`user${queryString}`);
  }

  getUserById(userId: string): Observable<UserAccountModel> {
    return this.baseService.get(`user/account/${userId}`);
  }

  updateUser(user: UserRequestModel): Observable<void> {
    return this.baseService.put(`user/account/${user.id}`, user);
  }
}