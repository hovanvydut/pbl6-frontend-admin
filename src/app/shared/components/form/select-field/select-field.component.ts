import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-select-field',
  templateUrl: './select-field.component.html',
  styleUrls: ['./select-field.component.scss']
})
export class SelectFieldComponent implements OnInit {
  private _selectedValue: string;
  @Input()
  get selectedValue() {
    return this._selectedValue;
  }
  set selectedValue(value: string) {
    this._selectedValue = value;
    this.onValueChanged.emit({
      type: this.type,
      value: value
    });
  }
  private _items: { id: string, name: string}[];
  @Input() get items() {
    return this._items;
  };
  set items( data:  { id: string, name: string}[] ) {
    this._items = data;
    if(data.length > 0) {
      let index = data.findIndex( item => item.id === this.selectedValue)
      if( index > -1 ){
        this.selectedValue = this._items[index].id;
      }
    }
  }
  @Input() type: string;
  @Input() label: string;
  @Input() disabled: boolean = false;
  @Input() customClass: string;
  @Input() appearance: 'legacy' | 'standard' | 'fill' | 'outline' = 'fill';
  @Output() onValueChanged = new EventEmitter<{ type: string, value: string}>();
  constructor() { }

  ngOnInit(): void {
  }

}
