import { Injectable } from '@angular/core';
import { DatasourceBaseModel } from '@app/shared/models/base.model';
import { Observable } from 'rxjs';
//
import { BaseService } from 'src/app/core/services/base.service';
import { RoleBaseModel, QueryParams, RoleRequestModel } from '../models/role.model';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  constructor(private baseService: BaseService) {}

  getRoles(params: QueryParams): Observable<DatasourceBaseModel<RoleBaseModel>>{
    const queryString =
      '?' +
      Object.keys(params)
        .map(key => {
          return `${key.charAt(0).toUpperCase() + key.slice(1)}=${encodeURIComponent(params[key])}`;
        })
        .join('&');
    return this.baseService.get(`role${queryString}`);
  }

  getRoleById(id: string): Observable<RoleRequestModel> {
    return this.baseService.get<RoleRequestModel>(`role/${id}`);
  }

  createNewRole(role: RoleRequestModel): Observable<void> {
    return this.baseService.post(`role`, role);
  }

  updateRole(role: RoleRequestModel): Observable<void> {
    return this.baseService.put(`role/${role.id}`, role);
  }
}