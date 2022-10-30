import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
//
import { BaseService } from 'src/app/core/services/base.service';
import { SettingBaseModel, SettingRequestModel } from '../models';

@Injectable({
  providedIn: 'root'
})
export class SettingService {
  constructor(private baseService: BaseService) { }

  getSettings(): Observable<SettingBaseModel[]> {
    return this.baseService.get(`config-setting`);
  }

  getSettingByKey(key: string): Observable<SettingBaseModel> {
    return this.baseService.get(`config-setting/${key}`);
  }

  updateSettings(key: string, setting: SettingRequestModel): Observable<void> {
    return this.baseService.put(`config-setting/${key}`, setting);
  }
}