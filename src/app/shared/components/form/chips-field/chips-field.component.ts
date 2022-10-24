import {
  Component,
  ElementRef,
  Input,
  Output,
  ViewChild,
  EventEmitter
} from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';

import { Observable, startWith, map } from 'rxjs';
import { isEqual } from 'date-fns';

@Component({
  selector: 'app-chips-field',
  templateUrl: './chips-field.component.html',
  styleUrls: ['./chips-field.component.scss']
})
export class ChipsFieldComponent {
  @ViewChild('itemInput') itemInput: ElementRef<HTMLInputElement>;
  @Input() label: string;
  @Input() type: string;
  @Input() appearance: 'outline' | 'fill' = 'fill';

  private _allItems: any[] = [];
  @Input() get allItems() {
    return this._allItems;
  }
  set allItems(value: any[]) {
    this._allItems = value;
    this.filteredItems = this.itemCtrl.valueChanges.pipe(
      startWith(null),
      map((item: string | null) =>
        item ? this._filter(item) : this.allItems.slice()
      )
    );
  }

  private _selectedItems: string[] = [];
  @Input() get selectedItems() {
    return this._selectedItems;
  }
  set selectedItems(value: string[]) {
    this._selectedItems = value;
    this.onSelectedItemsChanged.emit({
      type: this.type,
      value: this._selectedItems
    });
  }

  @Output() onSelectedItemsChanged = new EventEmitter<{
    type: string;
    value: string[];
  }>();

  separatorKeysCodes: number[] = [ENTER, COMMA];
  itemCtrl = new FormControl('');
  filteredItems: Observable<any[]>;

  constructor() {}

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.selectedItems.push(value);
    }
    event.chipInput!.clear();
    this.itemCtrl.setValue(null);
  }

  remove(item: string): void {
    const index = this.selectedItems.indexOf(item);
    if (index >= 0) {
      this.selectedItems.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    if( !this.selectedItems ) this.selectedItems = [];
    this.selectedItems.push(event.option.value);
    this.itemInput.nativeElement.value = '';
    this.itemCtrl.setValue(null);
  }

  private _filter(value: any): any[] {
    const filterValue = value;
    return this.allItems.filter(item => isEqual(filterValue, item));
  }
}
