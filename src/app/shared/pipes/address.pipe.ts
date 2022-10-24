import { Pipe, PipeTransform } from '@angular/core';
import { AddressModel } from '../models/address.model';

@Pipe({
  name: 'address'
})
export class AddressPipe implements PipeTransform {

  transform(value: AddressModel, ...args: unknown[]): unknown {
    console.log(value)
    return value.ward.name + ', ' + value.district.name + ', ' + value.province.name;
  }

}
