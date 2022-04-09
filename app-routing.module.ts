import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdduserComponent } from './adduser/adduser.component';
import { AuthGuard } from './auth.guard';
import { BookedComponent } from './booked/booked.component';
import { CourtComponent } from './court/court.component';
import { EdituserComponent } from './edituser/edituser.component';
import { LoginComponent } from './login/login.component';
import { MembershipComponent } from './membership/membership.component';
import { RegisterComponent } from './register/register.component';
import { TermsComponent } from './terms/terms.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {path: "register", component: RegisterComponent},
  {path: "", component: LoginComponent},
  {path: "court", component: CourtComponent, canActivate: [AuthGuard] },
  {path: "booked", component: BookedComponent, canActivate: [AuthGuard]},
  {path: "member", component: MembershipComponent, canActivate: [AuthGuard]},
  {path: "terms", component: TermsComponent, canActivate: [AuthGuard]},
  {path: "users", component: UsersComponent, canActivate: [AuthGuard]},
  {path: "adduser", component: AdduserComponent, canActivate: [AuthGuard]},
  {path: "edituser/:userid", component: EdituserComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
