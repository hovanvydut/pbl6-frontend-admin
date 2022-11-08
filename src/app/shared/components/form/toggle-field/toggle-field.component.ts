import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-toggle-field',
  templateUrl: './toggle-field.component.html',
  styleUrls: ['./toggle-field.component.scss']
})
export class ToggleFieldComponent implements OnInit {
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
