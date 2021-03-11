import { AdvertEditComponent } from './advert/advert-edit.component';
import { AdvertDetailComponent } from './advert/advert-detail.component';
import { AdvertsComponent } from './advert/adverts.component';
import { WelcomeComponent } from './home/welcome/welcome.component';
import { UserRegistrationGuard } from './guards/user-registration.guard';
import { UserProfileComponent } from './users/user-profile/user-profile.component';
import { LoginUserComponent } from './users/login-user.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterUserComponent } from './users/register-user.component';

const routes: Routes = [
  {path: 'adverts', component: AdvertsComponent},
  {path: 'adverts/:id', component: AdvertDetailComponent},
  {path: 'adverts/:id/edit', component: AdvertEditComponent},
  {path: 'profile', component: UserProfileComponent},
  {path: 'register',
  canDeactivate: [UserRegistrationGuard],
  component: RegisterUserComponent},
  {path: 'login', component: LoginUserComponent},
  {path: 'home', component: WelcomeComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: '**', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
