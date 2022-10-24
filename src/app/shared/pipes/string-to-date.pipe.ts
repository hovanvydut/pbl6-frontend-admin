import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
	name: 'stringToDate'
})
export class StringToDatePipe implements PipeTransform {
	transform(date): any {
		return new Date(date);
	}
}
