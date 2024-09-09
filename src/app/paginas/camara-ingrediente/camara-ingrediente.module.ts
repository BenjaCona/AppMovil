import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CamaraIngredientePageRoutingModule } from './camara-ingrediente-routing.module';

import { CamaraIngredientePage } from './camara-ingrediente.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CamaraIngredientePageRoutingModule
  ],
  declarations: [CamaraIngredientePage]
})
export class CamaraIngredientePageModule {}
