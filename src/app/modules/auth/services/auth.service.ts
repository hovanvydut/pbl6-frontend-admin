import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
//
import { BaseService } from '@app/core/services/base.service';
import { AccountModel } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private baseService: BaseService) {}

  login(data: any):  Observable<AccountModel> {
    return this.baseService.postForm<AccountModel>('auth/login', data);
  }

  register(data: any): Observable<any> {
    return this.baseService.post<any>('auth/register', data);
  }

  logout() {
    this.baseService.removeLoggedUser();
  }
}
