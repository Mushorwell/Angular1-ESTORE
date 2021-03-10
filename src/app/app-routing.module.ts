import { WelcomeComponent } from './home/welcome/welcome.component';
import { UserRegistrationGuard } from './guards/user-registration.guard';
import { UserProfileComponent } from './users/user-profile/user-profile.component';
import { LoginUserComponent } from './users/login-user.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterUserComponent } from './users/register-user.component';

const routes: Routes = [
  {path: 'register',
  canDeactivate: [UserRegistrationGuard],
  component: RegisterUserComponent},
  {path: 'login', component: LoginUserComponent},
  {path: 'profile', component: UserProfileComponent},
  {path: 'home', component: WelcomeComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
