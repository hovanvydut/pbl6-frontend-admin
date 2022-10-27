import { Component, OnInit, ViewChild } from '@angular/core';
import { UserTableComponent } from '@app/modules/user/components/user-table/user-table.component';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.scss']
})
export class ManageUserComponent implements OnInit {
  @ViewChild('userTable') userTableComponent: UserTableComponent;
  forceUpdate: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
