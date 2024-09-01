import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PreinicioPageRoutingModule } from './preinicio-routing.module';

import { PreinicioPage } from './preinicio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PreinicioPageRoutingModule
  ],
  declarations: [PreinicioPage]
})
export class PreinicioPageModule {}
