import { Component, Inject, OnInit } from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { finalize } from 'rxjs';
import { groupBy } from 'lodash-es';
//
import {
  PostFieldEnum,
  PostFieldNameEnum,
  PropertyEnum
} from '../../enums/property.enum';
import { FieldType, PostGroupName } from '../../enums/post.enum';
import { InputType } from '@app/shared/app.enum';
import { PostRequestModel } from '../../models/post.model';
import { ItemModel } from './../../../../shared/models/base.model';
import { FormControlBaseModel } from '@app/shared/models/form.model';
import { PostService } from '@app/modules/post/services/post.service';
import { CommonService } from '@app/core/services/common.service';
import { NotifyService } from '@app/shared/services/notify.service';

@Component({
  selector: 'app-post-detail-form',
  templateUrl: './post-detail-form.component.html',
  styleUrls: ['./post-detail-form.component.scss']
})
export class PostDetailFormComponent implements OnInit {
  post: PostRequestModel = new PostRequestModel();
  postDetail: PostRequestModel = new PostRequestModel();
  previews: string[] = [];
  selectedFiles?: FileList;
  PropertyEnum = PropertyEnum;
  FieldType = FieldType;

  // properties
  tenantTypes: ItemModel[] = [];
  nearbyPlaces: ItemModel[] = [];
  roomTypes: ItemModel[] = [];
  properties: any[] = [];

  provinces: ItemModel[] = [];
  districts: ItemModel[] = [];
  wards: ItemModel[] = [];
  streets: ItemModel[] = [];

  formControl: FormControlBaseModel[] = [
    {
      groupName: PostGroupName.GeneralInfo,
      items: [
        {
          name: PostFieldNameEnum.Title,
          label: 'Tiên đề bài đăng',
          placeholder: 'Tiên đề bài đăng',
          require: true,
          value: new FormControl('', Validators.required),
          inputType: InputType.Text,
          fieldType: FieldType.Input,
          width: 'full'
        },
        {
          name: PostFieldNameEnum.Description,
          label: 'Mô tả chung',
          placeholder: 'Nhập mô tả về trọ',
          require: true,
          value: new FormControl('', Validators.required),
          inputType: InputType.Text,
          fieldType: FieldType.Textarea,
          width: 'full'
        }
      ]
    },
    {
      groupName: PostGroupName.Address,
      items: [
        {
          id: PostFieldEnum.Province,
          name: PostFieldNameEnum.Province,
          label: 'Tỉnh/Thành phố',
          placeholder: 'Chọn thành phố',
          require: true,
          value: new FormControl({ value: 32, disabled: true }, Validators.required),
          inputType: InputType.Text,
          fieldType: FieldType.Select,
          width: '1/3',
          properties: this.provinces,
          disabled: true,
        },
        {
          id: PostFieldEnum.District,
          name: PostFieldNameEnum.District,
          label: 'Quận/Huyện',
          placeholder: 'Chọn quận/huyện',
          require: true,
          value: new FormControl(32, Validators.required),
          inputType: InputType.Text,
          fieldType: FieldType.Select,
          width: '1/3',
          properties: this.districts,
        },
        {
          id: PostFieldEnum.AddressWardId,
          name: PostFieldNameEnum.AddressWardId,
          label: 'Phường/Xã',
          placeholder: 'Chọn phường/xã',
          require: true,
          value: new FormControl('', Validators.required),
          inputType: InputType.Text,
          fieldType: FieldType.Select,
          width: '1/3',
          properties: this.wards
        },
        {
          name: PostFieldNameEnum.Address,
          label: 'Đường',
          placeholder: 'Nhập địa chỉ số nhà, đường',
          require: true,
          value: new FormControl('', Validators.required),
          inputType: InputType.Text,
          fieldType: FieldType.Input,
          width: 'full'
        }
      ]
    },
    {
      groupName: PostGroupName.DetailInfo,
      items: [
        {
          id: PostFieldEnum.RoomTypes,
          name: PostFieldNameEnum.CategoryId,
          label: 'Loại phòng',
          placeholder: 'Chọn loại phòng',
          require: true,
          value: new FormControl(1, Validators.required),
          inputType: InputType.Text,
          fieldType: FieldType.Select,
          width: '1/3',
          properties: this.roomTypes
        },
        {
          name: PostFieldNameEnum.Price,
          label: 'Giá',
          placeholder: 'Nhập giá',
          require: true,
          value: new FormControl('', Validators.required),
          inputType: InputType.Number,
          fieldType: FieldType.Input,
          width: '1/3'
        },
        {
          name: PostFieldNameEnum.Area,
          label: 'Diện tích',
          placeholder: 'Nhập diện tích',
          require: true,
          value: new FormControl('', Validators.required),
          inputType: InputType.Number,
          fieldType: FieldType.Input,
          width: '1/3'
        }
      ]
    },
    {
      groupName: PostGroupName.AdditionalInfo,
      items: [
        {
          name: PostFieldNameEnum.LimitTenant,
          label: 'Số người tối đa',
          placeholder: 'Nhập số người tối đa',
          require: true,
          value: new FormControl(''),
          inputType: InputType.Number,
          fieldType: FieldType.Input,
          width: '1/3'
        },
        {
          name: PostFieldNameEnum.PrePaidPrice,
          label: 'Tiền cọc',
          placeholder: 'Nhập tiền cọc',
          require: true,
          value: new FormControl(''),
          inputType: InputType.Number,
          fieldType: FieldType.Input,
          width: '1/3'
        },
        {
          id: PropertyEnum.OtherProperties,
          name: PostFieldNameEnum.OtherProperties,
          label: 'Tiện ích khác',
          placeholder: 'Chọn tiện ích khác',
          require: true,
          value: new FormControl([]),
          inputType: InputType.Text,
          fieldType: FieldType.Property,
          width: 'full',
          properties: this.properties
        },
        {
          id: PropertyEnum.TenantTypes,
          name: PostFieldNameEnum.TenantType,
          label: 'Đối tượng cho thuê',
          placeholder: 'Chọn đối tượng cho thuê',
          require: true,
          value: new FormControl([]),
          inputType: InputType.Text,
          fieldType: FieldType.Property,
          width: 'full',
          properties: this.tenantTypes
        },
        {
          id: PropertyEnum.NearbyPlaces,
          name: PostFieldNameEnum.NearbyPlaces,
          label: 'Địa điểm gần đó',
          placeholder: 'Chọn địa điểm gần đó',
          require: true,
          value: new FormControl([]),
          inputType: InputType.Text,
          fieldType: FieldType.Property,
          width: 'full',
          properties: this.nearbyPlaces
        }
      ]
    }
  ];

  addressGroupIndex: number;
  generalInfoGroupIndex: number;
  additionalInfoGroupIndex: number;
  detailInfoGroupIndex: number;
  provinceIndex: number;
  districtIndex: number;
  wardIndex: number;
  roomTypeIndex: number;
  otherPropertiesIndex: number;
  tenantTypeIndex: number;
  nearbyPlacesIndex: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { postId: string },
    private dialog: Dialog,
    private notifyService: NotifyService,
    private commonService: CommonService,
    private postService: PostService
  ) {
    this.handleFormFieldIndex();
  }

  ngOnInit() {
    this.getAddress();
    this.getRoomCategory();
    this.getProperties();

    if (this.data?.postId) {
      this.getEditPostInfo(this.data.postId);
    }
  }

  getEditPostInfo(postId: string) {
    this.postService.getPostById(postId).subscribe(res => {
      this.postDetail = res;
      this.convertPostToFormControl();
    });
  }

  handleFormFieldIndex() {
    this.formControl.forEach((group, idx) => {
      switch (group.groupName) {
        case PostGroupName.Address:
          this.addressGroupIndex = idx;
          group.items.forEach((item, idx) => {
            switch (item.id) {
              case PostFieldEnum.Province:
                this.provinceIndex = idx;
                break;
              case PostFieldEnum.District:
                this.districtIndex = idx;
                break;
              case PostFieldEnum.AddressWardId:
                this.wardIndex = idx;
                break;
            }
          });
          break;
        case PostGroupName.GeneralInfo:
          this.generalInfoGroupIndex = idx;
          break;
        case PostGroupName.AdditionalInfo:
          this.additionalInfoGroupIndex = idx;
          group.items.forEach((item, idx) => {
            switch (item.id) {
              case PropertyEnum.OtherProperties:
                this.otherPropertiesIndex = idx;
                break;
              case PropertyEnum.TenantTypes:
                this.tenantTypeIndex = idx;
                break;
              case PropertyEnum.NearbyPlaces:
                this.nearbyPlacesIndex = idx;
                break;
            }
          });
          break;
        case PostGroupName.DetailInfo:
          this.detailInfoGroupIndex = idx;
          group.items.forEach((item, idx) => {
            switch (item.id) {
              case PostFieldEnum.RoomTypes:
                this.roomTypeIndex = idx;
                break;
            }
          });
          break;
      }
    });
  }

  getAddress() {
    this.commonService
      .getProvinces()
      .pipe(finalize(() => {}))
      .subscribe(val => {
        this.provinces = val;
        this.formControl[this.addressGroupIndex].items[
          this.provinceIndex
        ].properties = this.provinces;
      });
  }

  getRoomCategory() {
    this.commonService.getRoomCategory().subscribe(val => {
      this.roomTypes = val;
      this.formControl[this.detailInfoGroupIndex].items[
        this.roomTypeIndex
      ].properties = this.roomTypes;
    });
  }

  getProperties() {
    this.commonService.getProperties().subscribe(res => {
      res.forEach(property => {
        switch (property.id) {
          case PropertyEnum.OtherProperties:
            this.formControl[this.additionalInfoGroupIndex].items[
              this.otherPropertiesIndex
            ].properties = property.properties;
            break;
          case PropertyEnum.TenantTypes:
            this.formControl[this.additionalInfoGroupIndex].items[
              this.tenantTypeIndex
            ].properties = property.properties;
            break;
          case PropertyEnum.NearbyPlaces:
            this.formControl[this.additionalInfoGroupIndex].items[
              this.nearbyPlacesIndex
            ].properties = property.properties;
            break;
        }
      });
    });
  }

  onSaveButtonClicked() {
    let data: PostRequestModel = new PostRequestModel();
    this.formControl.forEach(group => {
      group.items.forEach(item => {
        if (item.fieldType === FieldType.Property) {
          if (item.value.value && item.value.value.length > 0) {
            data.properties = [
              ...data.properties,
              ...item.value.value.map(el => {
                return el.id;
              })
            ];
          }
        } else {
          data[item.name] = item.value.value;
        }
      });
    });
    data.medias = this.previews.map(el => {
      return {
        url: el
      };
    });
    if (this.data?.postId) {
      data.id = this.data.postId;
      this.updatePost(data);
    } else {
      this.createPost(data);
    }
  }

  updatePost(data: PostRequestModel) {
    this.postService
      .updatePost(
        new PostRequestModel({
          ...data
        })
      )
      .subscribe(
        () => {
          this.dialog.closeAll();
          this.notifyService.notify('Cập nhật bài đăng thành công');
        },
        (err) => {
          this.notifyService.notify(err);
        }
      );
  }

  createPost(data: PostRequestModel) {
    this.postService
      .createNewPost(
        new PostRequestModel({
          ...data
        })
      )
      .subscribe(
        () => {
          this.dialog.closeAll();
          this.notifyService.notify('Tạo bài đăng thành công');
        },
        (err) => {
          this.notifyService.notify(err);
        }
      );
  }

  convertPostToFormControl() {
    this.previews = [...this.postDetail.medias.map(el => el.url)];
    const seperatedProperties = groupBy(this.postDetail.properties, function(
      n
    ) {
      return n.propertyGroupId;
    });
    this.formControl.forEach(group => {
      group.items.forEach(item => {
        switch (item.name) {
          case PostFieldNameEnum.AddressWardId:
            item.value.setValue(this.postDetail.fullAddress['ward'].id);
            break;
          case PostFieldNameEnum.Province:
          case PostFieldNameEnum.District:
            item.value.setValue(this.postDetail.fullAddress[item.name].id);
            break;
          case PostFieldNameEnum.CategoryId:
            item.value.setValue(this.postDetail.category.id);
            break;
          case PostFieldNameEnum.OtherProperties:
            item.value.setValue(
              seperatedProperties[PropertyEnum.OtherProperties]
            );
            break;
          case PostFieldNameEnum.TenantType:
            item.value.setValue(seperatedProperties[PropertyEnum.TenantTypes]);
            break;
          case PostFieldNameEnum.NearbyPlaces:
            item.value.setValue(seperatedProperties[PropertyEnum.NearbyPlaces]);
            break;
          default:
            item.value.setValue(this.postDetail[item.name]);
            break;
        }
      });
    });
  }

  onFileSelected(url: string) {
    this.previews.push(url);
  }

  onFileRemoved(url: string) {
    this.previews = this.previews.filter(el => el !== url);
  }

  onSelectedFieldChanged(item: { type: string; value: any }) {
    switch (item.type) {
      case PostFieldNameEnum.Province:
        this.formControl[this.addressGroupIndex].items[
          this.provinceIndex
        ].value.setValue(item.value);
        this.handleCitySelected(item.value);
        break;
      case PostFieldNameEnum.District:
        this.formControl[this.addressGroupIndex].items[
          this.districtIndex
        ].value.setValue(item.value);
        this.handleDistrictSelected(item.value);
        break;
      case PostFieldNameEnum.AddressWardId:
        this.formControl[this.addressGroupIndex].items[
          this.wardIndex
        ].value.setValue(item.value);
        break;
      case PostFieldNameEnum.CategoryId:
        this.formControl[this.detailInfoGroupIndex].items[
          this.roomTypeIndex
        ].value.setValue(item.value);
        break;
      case PostFieldNameEnum.Properties:
        this.formControl[this.additionalInfoGroupIndex].items[
          this.otherPropertiesIndex
        ].value.setValue(item.value);
        break;
      case PostFieldNameEnum.TenantType:
        this.formControl[this.additionalInfoGroupIndex].items[
          this.tenantTypeIndex
        ].value.setValue(item.value);
        break;
      case PostFieldNameEnum.NearbyPlaces:
        this.formControl[this.additionalInfoGroupIndex].items[
          this.nearbyPlacesIndex
        ].value.setValue(item.value);
        break;
      default:
        break;
    }
  }

  handleCitySelected(cityId: string) {
    this.commonService.getDistricts(cityId).subscribe(res => {
      this.districts = res.addressDistricts;
      this.formControl[this.addressGroupIndex].items[
        this.districtIndex
      ].properties = res.addressDistricts;
    });
  }

  handleDistrictSelected(districtId: string) {
    this.commonService.getWards(districtId).subscribe(res => {
      this.wards = res.addressWards;
      this.formControl[this.addressGroupIndex].items[
        this.wardIndex
      ].properties = res.addressWards;
    });
  }
}
