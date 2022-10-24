import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
//
import { BaseService } from './base.service';
import { DistrictModel, AddressModel } from './../../shared/models/address.model';
import { ItemModel } from '@app/shared/models/base.model';
import { WardModel } from '@app/shared/models/address.model';
import { PropertiesModel } from '@app/shared/models/property.model';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  constructor(private baseService: BaseService) {}

  //#region Address
  getProvinces(): Observable<ItemModel[]> {
    return this.baseService.get<ItemModel[]>('address/province');
  }

  getDistricts(provinceId: string): Observable<DistrictModel> {
    return this.baseService.get<DistrictModel>(
      `address/district?provinceId=${provinceId}`
    );
  }

  getWards(districtId: string): Observable<WardModel> {
    return this.baseService.get<WardModel>(`address/ward?districtId=${districtId}`);
  }

  getAddressString(addressId: string): Observable<AddressModel> {
    return this.baseService.get<AddressModel>(
      `address/full-address?wardId=${addressId}`
    );
  }
  //#endregion

  //#region upload image
  uploadImage(file: File): Observable<string> {
    const formData = new FormData();
    formData.append('file', file);
    return this.baseService.postFile<string>('filecontroler/upload', formData);
  }
  //#endregion

  //#region Property
  getRoomCategory(): Observable<ItemModel[]> {
    return this.baseService.get<ItemModel[]>('category/house-type');
  }

  getProperties(): Observable<PropertiesModel[]> {
    return this.baseService.get<PropertiesModel[]>('property');
  }
  //#endregion
}
