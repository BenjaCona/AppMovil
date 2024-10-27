import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReconocimientoDeIngredientesPage } from './reconocimiento-de-ingredientes.page';

const routes: Routes = [
  {
    path: '',
    component: ReconocimientoDeIngredientesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReconocimientoDeIngredientesPageRoutingModule {}
