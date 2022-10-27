import { Component, OnInit, ViewChild } from '@angular/core';
import {
  PermissionTableComponent,
} from '@app/modules/role/components';

@Component({
  selector: 'app-manage-permission',
  templateUrl: './manage-permission.component.html',
  styleUrls: ['./manage-permission.component.scss']
})
export class ManagePermissionComponent implements OnInit {
  @ViewChild('permissionTable') permissionTableComponent: PermissionTableComponent;
  forceUpdate: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  onAddNewPermissionButtonClicked() {

  }
}
