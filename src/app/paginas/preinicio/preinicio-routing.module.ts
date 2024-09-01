import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PreinicioPage } from './preinicio.page';

const routes: Routes = [
  {
    path: '',
    component: PreinicioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PreinicioPageRoutingModule {}
