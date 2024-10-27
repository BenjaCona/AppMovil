import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReconocimientoDeIngredientesPageRoutingModule } from './reconocimiento-de-ingredientes-routing.module';

import { ReconocimientoDeIngredientesPage } from './reconocimiento-de-ingredientes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReconocimientoDeIngredientesPageRoutingModule
  ],
  declarations: [ReconocimientoDeIngredientesPage]
})
export class ReconocimientoDeIngredientesPageModule {}
