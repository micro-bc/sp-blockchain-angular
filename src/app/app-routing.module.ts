import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './components/main/main.component';
import { LoginGuard } from './guards/login.guard';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { UserRegisterComponent } from './components/user-register/user-register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NodeComponent } from './components/node/node.component';


const routes: Routes = [
  { path: 'login', component: UserLoginComponent },
  { path: 'register', component: UserRegisterComponent },
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  {
    path: '', component: MainComponent, canActivate: [LoginGuard], children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'node', component: NodeComponent },
    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
