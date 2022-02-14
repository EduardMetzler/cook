import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/withNavBar/nav-bar.module').then((m) => m.NavBarModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/withoutNavBar/login/login.module').then(
        (m) => m.LoginModule
      ),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./pages/withoutNavBar/register/register.module').then(
        (m) => m.RegisterModule
      ),
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'home',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
