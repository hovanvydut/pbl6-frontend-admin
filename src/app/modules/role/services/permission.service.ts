import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
//
import { BaseService } from 'src/app/core/services/base.service';
import {
    PermissionBaseModel,
    PermissionGroupModel,
    PermissionRequestModel,
} from '../models/permission.model';

@Injectable({
    providedIn: 'root'
})
export class PermissionService {
    constructor(private baseService: BaseService) { }

    getPermissions(roleId: number): Observable<PermissionGroupModel[]> {
        return this.baseService.get(`role/${roleId}/permission`);
    }

    addPermission(permission: PermissionRequestModel): Observable<void> {
        return this.baseService.post(`role/permission`, permission);
    }

    removeRole(roleId: number, permissionId: number): Observable<void> {
        return this.baseService.delete(`role/${roleId}/permission/${permissionId}`);
    }
}