import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@core/guards/auth/auth.guard';
import { LoginGuard } from '@core/guards/login/login.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'login',
    canLoad: [LoginGuard],
    loadChildren: () =>
      import('@pages/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'home',
    canLoad: [AuthGuard],
    loadChildren: () =>
      import('@pages/home/home.module').then(m => m.HomeModule)
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
