import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
//
import {
  SettingTableComponent,
  SettingDetailFormComponent,
} from '@app/modules/setting/components';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  @ViewChild('settingTable') settingTableComponent: SettingTableComponent;
  settingDetailFormComponent = SettingDetailFormComponent;
  forceUpdate: boolean = false;

  constructor(
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }

  handleEditSetting(settingKey: string) {
    if (settingKey) {
      let dialogRef = this.dialog.open(this.settingDetailFormComponent, {
        width: '35vw',
        maxHeight: '90vh',
        data: { settingKey: settingKey }
      });
      dialogRef.afterClosed().subscribe(result => {
        this.settingTableComponent.getSettings();
      });
    }
  }
}
