import { Injectable } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { WarningDialogComponent } from './warning-dialog/warning-dialog.component';

@Injectable()
export class DialogService {

    constructor(
        private dialogService: NbDialogService,
    ) {
    }

    confirmation(title: string, message: string = '') {
        return this.dialogService.open(
            ConfirmationDialogComponent,
            {
                context: {
                    title,
                    message,
                }
            }
        ).onClose.toPromise() as Promise<boolean>;
    }

    warning(title: string, message: string = '') {
        return this.dialogService.open(
            WarningDialogComponent,
            {
                context: {
                    title,
                    message,
                }
            }
        ).onClose.toPromise();
    }


}
