import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChamadosComponent } from './chamados/chamados.component';

const routes: Routes = [
  {path: '', component: DashboardComponent},
  {path: 'chamados', component: ChamadosComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
