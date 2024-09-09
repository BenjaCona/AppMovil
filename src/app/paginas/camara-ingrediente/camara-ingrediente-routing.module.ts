import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CamaraIngredientePage } from './camara-ingrediente.page';

const routes: Routes = [
  {
    path: '',
    component: CamaraIngredientePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CamaraIngredientePageRoutingModule {}
