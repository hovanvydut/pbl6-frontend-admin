import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'lookupValue'
})
export class LookupValuePipe implements PipeTransform {
    transform(key: string | number,
              lookup: any[],
              valueExpr: string = 'key',
              displayExpr: string = 'value',
              emptyMessage: string = '-'): string {
        if (!key) {
            return emptyMessage;
        }
        //
        if (!lookup || lookup.length === 0) {
            return `${key}`;
        }
        //
        const selectedItemIndex: number = lookup.findIndex(_ => _[valueExpr] === key);
        return selectedItemIndex > -1 ? lookup[selectedItemIndex][displayExpr] : `${key}`;
    }
}
