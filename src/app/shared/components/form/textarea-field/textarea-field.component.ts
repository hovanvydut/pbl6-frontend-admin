import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-textarea-field',
  templateUrl: './textarea-field.component.html',
  styleUrls: ['./textarea-field.component.scss']
})
export class TextareaFieldComponent implements OnInit {
  private _value: any;
  @Input()
  get value() {
    return this._value;
  }
  set value(val) {
    this._value = val;
  }

  @Input() icon: string;
  @Input() label: string;
  @Input() placeholder: string;
  @Input() required: boolean;
  @Input() customClass: string;
  @Input() appearance: 'legacy' | 'standard' | 'fill' | 'outline' = 'fill';

  constructor() {}

  ngOnInit(): void {}
}
