import { FormControl } from "@angular/forms";
import { FieldType, PostGroupName } from "@app/modules/post/enums/post.enum";
import { PostFieldEnum, PropertyEnum } from "@app/modules/post/enums/property.enum";
import { InputType } from "../app.enum";
import { ItemModel } from './base.model';

export class FormBaseModel {
  id?: PropertyEnum | PostFieldEnum;
  name: string;
  label: string;
  placeholder: string;
  require: boolean;
  value: FormControl;
  inputType: InputType;
  fieldType: FieldType;
  width: string;
  properties?: ItemModel[];
  disabled?: boolean = false;

  constructor(init?: Partial<FormBaseModel>) {
    Object.assign(this, init);
  }
}

export class FormControlBaseModel {
  groupName: PostGroupName;
  items: FormBaseModel[];
}
