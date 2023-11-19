import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'ngx-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent {

  @Input() param: {
    label: string;
    placeholder?: string;
    options: { label: string; value: any; }[];
  };

  @Input() value!: any;
  @Output() valueChange = new EventEmitter<any>();

  onChange(selected: this['param']['options'][0]) {
    console.log('change')
    this.value = selected;
    this.valueChange.emit(this.value);
  }

}
