import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// 1. Aquí importamos tus componentes recién creados
import { Home } from './home/home';
import { About } from './about/about';

// 2. Aquí rellenamos el arreglo vacío con tus rutas
const routes: Routes = [
  { path: 'home', component: Home },
  { path: 'about', component: About },
  { path: '**', redirectTo: 'home', pathMatch: 'full' } // Ruta por defecto
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }