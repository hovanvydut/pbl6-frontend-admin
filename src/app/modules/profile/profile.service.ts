import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
//
import { BaseService } from '@app/core/services/base.service';
import { ProfileBaseModel, ProfileModel, ProfileUpdateModel } from './models/profile.model';
import { BaseModel } from './../../shared/models/base.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  constructor(private baseService: BaseService) { }

  getProfileInfo(): Observable<ProfileModel>{
    return this.baseService.get<ProfileModel>('user/personal');
  }

  getProfileGeneralInfo(): Observable<ProfileBaseModel>{
    return this.baseService.get<ProfileBaseModel>('user/personal');
  }

  updateProfileInfo(data: ProfileUpdateModel): Observable<boolean>{
    return this.baseService.put<boolean>('user/personal', data);
  }

  changePassword(data: any): Observable<any>{
    return this.baseService.put<any>('user/profile/change-password', data);
  }
}
