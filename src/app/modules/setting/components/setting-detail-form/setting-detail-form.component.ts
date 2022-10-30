import { Component, Inject, OnInit } from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
//
import { InputType, FieldType } from '@app/shared/app.enum';
import { SettingRequestModel } from '../../models';
import { FormControlBaseModel } from '@app/shared/models/form.model';
import { SettingService } from '@app/modules/setting/services';
import { NotifyService } from '@app/shared/services/notify.service';

@Component({
  selector: 'app-setting-detail-form',
  templateUrl: './setting-detail-form.component.html',
  styleUrls: ['./setting-detail-form.component.scss']
})
export class SettingDetailFormComponent implements OnInit {
  setting: SettingRequestModel = new SettingRequestModel();
  settingDetail: SettingRequestModel = new SettingRequestModel();
  FieldType = FieldType;

  formControl: FormControlBaseModel[] = [
    {
      groupName: "Thông tin thiết lập",
      items: [
        {
          name: "value",
          label: 'Giá trị thiết lập',
          placeholder: 'Nhập giá trị mới',
          require: true,
          value: new FormControl('', Validators.required),
          inputType: InputType.Number,
          fieldType: FieldType.Input,
          width: 'full'
        },
        {
          name: "description",
          label: 'Mô tả thiết lập',
          placeholder: 'Nhập mô tả về thiết lập',
          require: true,
          value: new FormControl('', Validators.required),
          inputType: InputType.Text,
          fieldType: FieldType.Textarea,
          width: 'full'
        }
      ]
    },
  ];
  generalInfoGroupIndex: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { settingKey: string },
    private dialog: Dialog,
    private notifyService: NotifyService,
    private settingService: SettingService,
  ) {
    this.handleFormFieldIndex();
  }

  ngOnInit() {
    if (this.data?.settingKey) {
      this.getEditSettingInfo(this.data.settingKey);
    }
  }

  getEditSettingInfo(settingKey: string) {
    this.settingService.getSettingByKey(settingKey).subscribe(res => {
      this.settingDetail = res;
      this.convertPostToFormControl();
    });
  }

  convertPostToFormControl() {
    this.formControl.forEach(group => {
      group.items.forEach(item => {
        item.value.setValue(this.settingDetail[item.name]);
      });
    });
  }

  handleFormFieldIndex() {
    this.formControl.forEach((group, idx) => {
      switch (group.groupName) {
        case "Thông tin thiết lập":
          this.generalInfoGroupIndex = idx;
          break;
      }
    });
  }

  onSaveButtonClicked() {
    let data: SettingRequestModel = new SettingRequestModel();
    this.formControl.forEach(group => {
      group.items.forEach(item => {
        data[item.name] = item.value.value;
      });
    });
    if (this.data?.settingKey) {
      this.updateSetting(this.data.settingKey, data);
    }
  }

  updateSetting(settingKey: string, data: SettingRequestModel) {
    this.settingService
      .updateSettings(
        settingKey,
        new SettingRequestModel({
          ...data
        })
      )
      .subscribe(
        () => {
          this.dialog.closeAll();
          this.notifyService.notify('Cập nhật thiết lập thành công');
        },
        (err) => {
          this.notifyService.notify(err);
        }
      );
  }
}
