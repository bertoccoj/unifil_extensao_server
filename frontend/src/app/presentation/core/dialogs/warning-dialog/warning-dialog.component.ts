import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'ngx-warning-dialog',
  templateUrl: './warning-dialog.component.html',
  styleUrls: ['./warning-dialog.component.scss']
})
export class WarningDialogComponent {

  @Input() title: string = '';
  @Input() message: string = '';

  constructor(protected ref: NbDialogRef<WarningDialogComponent>) { }

  submit() {
    this.ref.close();
  }
}
