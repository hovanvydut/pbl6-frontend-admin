import { PropertyEnum } from '@app/modules/post/enums/property.enum';
import { ItemBaseModel } from '@app/shared/models/base.model';
import { ItemModel } from './base.model';
export class PropertiesModel extends ItemBaseModel {
  properties: ItemModel[];

  constructor(init?: Partial<PropertiesModel>) {
    super();
    Object.assign(this, init);
  }
}
