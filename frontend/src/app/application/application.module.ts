import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { appEffects } from '.';
import { InfrastructureModule } from '../infrastructure/infrastructure.module';

@NgModule({
  imports: [
    EffectsModule.forFeature(appEffects),
    InfrastructureModule,
  ]
})
export class ApplicationModule { }
