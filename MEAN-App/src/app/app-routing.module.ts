import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { AuthGuard } from './_guards';
import { ActivateComponent } from './activate/activate.component';
import { MyProductsComponent } from './my-products/my-products.component';
import { AllProductsComponent } from './all-products/all-products.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'activate/:token', component: ActivateComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'myProducts', component: MyProductsComponent, canActivate: [AuthGuard] },
  { path: 'allProducts', component: AllProductsComponent },
  { path: 'dash', component: UserDashboardComponent },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
