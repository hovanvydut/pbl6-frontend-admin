import { Component, OnInit } from '@angular/core';
import { ENDPOINTS } from '@app/shared/utilities';
//
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  ENDPOINTS = ENDPOINTS;
  menuItems = [
    {
      name: 'Dashboard',
      items: [
        {
          icon: 'home',
          name: 'Dashboard',
          link: ENDPOINTS.DASHBOARD
        },
        {
          icon: 'people',
          name: 'Quản lý người dùng',
          link: ENDPOINTS.MANAGE_USER
        },
        {
          icon: 'chart_vertical',
          name: 'Quản lý phân quyền',
          link: ENDPOINTS.MANAGE_ROLE
        },
        {
          icon: 'chart_vertical',
          name: 'Thống kê',
          link: ENDPOINTS.STATISTICS
        },
        {
          icon: 'billing',
          name: 'Quản lý doanh thu',
          link: ENDPOINTS.MANAGE_REVENUS
        },
        {
          icon: 'setting',
          name: 'Cài đặt',
          link: ENDPOINTS.SETTINGS
        },
        {
          icon: 'logout',
          name: 'Đăng xuất',
          link: ENDPOINTS.LOGOUT
        },
      ]
    },
  ];

  constructor() {}

  ngOnInit() {}
}
