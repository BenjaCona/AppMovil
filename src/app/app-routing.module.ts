import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { Pagina1Page } from './paginas/pagina1/pagina1.page';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'pagina1',
    loadChildren: () => import('./paginas/pagina1/pagina1.module').then( m => m.Pagina1PageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./paginas/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./paginas/registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'preinicio',
    loadChildren: () => import('./paginas/preinicio/preinicio.module').then( m => m.PreinicioPageModule)
  },
  {
    path: 'animaciones',
    loadChildren: () => import('./paginas/animaciones/animaciones.module').then( m => m.AnimacionesPageModule)
  },  {
    path: 'recetas',
    loadChildren: () => import('./paginas/recetas/recetas.module').then( m => m.RecetasPageModule)
  },
  {
    path: 'locales',
    loadChildren: () => import('./paginas/locales/locales.module').then( m => m.LocalesPageModule)
  },
  {
    path: 'configuracion',
    loadChildren: () => import('./paginas/configuracion/configuracion.module').then( m => m.ConfiguracionPageModule)
  },
  {
    path: 'camara-ingrediente',
    loadChildren: () => import('./paginas/camara-ingrediente/camara-ingrediente.module').then( m => m.CamaraIngredientePageModule)
  },
  {
    path: 'escribir-receta',
    loadChildren: () => import('./paginas/escribir-receta/escribir-receta.module').then( m => m.EscribirRecetaPageModule)
  },
  {
    path: 'ubicacion',
    loadChildren: () => import('./paginas/ubicacion/ubicacion.module').then( m => m.UbicacionPageModule)
  },
  {
    path: 'reconocimiento-de-ingredientes',
    loadChildren: () => import('./paginas/reconocimiento-de-ingredientes/reconocimiento-de-ingredientes.module').then( m => m.ReconocimientoDeIngredientesPageModule)
  },




];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
