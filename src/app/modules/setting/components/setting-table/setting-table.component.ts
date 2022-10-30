import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { SettingService } from '../../services';
import { SettingBaseModel } from '../../models';
import { SettingDetailFormComponent } from '@app/modules/setting/components';

@Component({
  selector: 'app-setting-table',
  templateUrl: './setting-table.component.html',
  styleUrls: ['./setting-table.component.scss']
})
export class SettingTableComponent implements OnInit, AfterViewInit {
  private _forceUpdate: boolean = false;
  @Input() set forceUpdate(value: boolean) {
    if (value) {
      this.getSettings();
    }
    this._forceUpdate = false;
  }
  settingDetailFormComponent = SettingDetailFormComponent;

  tableName: string = 'Các giá trị thiết lập trong hệ thống';
  displayedColumns: string[] = [
    'key',
    'description',
    'value',
    'action'
  ];

  dataSource: MatTableDataSource<SettingBaseModel> = new MatTableDataSource();

  constructor(
    private dialog: MatDialog,
    private settingService: SettingService,
  ) { }

  ngOnInit(): void {
    this.getSettings();
  }

  ngAfterViewInit() {
  }

  getSettings() {
    this.settingService.getSettings().subscribe(data => {
      this.dataSource = new MatTableDataSource<SettingBaseModel>(data);
    });
  }

  onEditSettingButtonClicked(settingKey: string) {
    if (settingKey) {
      let dialogRef = this.dialog.open(this.settingDetailFormComponent, {
        width: '35vw',
        maxHeight: '90vh',
        data: { settingKey: settingKey }
      });
      dialogRef.afterClosed().subscribe(result => {
        this.getSettings();
      });
    }
  }
}
