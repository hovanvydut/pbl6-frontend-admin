import { Component, OnInit } from '@angular/core';
import { BaseService } from '@app/core/services/base.service';
import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';
import { ENDPOINTS } from '@app/shared/utilities';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.authService.logout();
    this.router.navigateByUrl(ENDPOINTS.HOME);
  }
}
