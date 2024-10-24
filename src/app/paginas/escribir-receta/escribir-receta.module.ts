import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EscribirRecetaPageRoutingModule } from './escribir-receta-routing.module';

import { EscribirRecetaPage } from './escribir-receta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EscribirRecetaPageRoutingModule
  ],
  declarations: [EscribirRecetaPage]
})
export class EscribirRecetaPageModule {}
