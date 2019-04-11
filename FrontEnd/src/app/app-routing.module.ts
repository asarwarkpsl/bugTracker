import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardGuard } from './guards/auth-guard.guard';

const routes: Routes = [
  { path: '', redirectTo: 'app', pathMatch: 'full' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  {
    path: 'app',
    loadChildren: './pages/app/app.module#AppPageModule',
    canActivate: [AuthGuardGuard]
  },
  { path: 'register', loadChildren: './pages/register/register.module#RegisterPageModule' },
  { path: 'home', loadChildren: './pages/home/home.module#HomePageModule' },
  { path: 'add-project', loadChildren: './pages/add-project/add-project.module#AddProjectPageModule' },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
