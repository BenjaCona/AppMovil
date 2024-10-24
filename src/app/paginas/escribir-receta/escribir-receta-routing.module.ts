import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EscribirRecetaPage } from './escribir-receta.page';

const routes: Routes = [
  {
    path: '',
    component: EscribirRecetaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EscribirRecetaPageRoutingModule {}
