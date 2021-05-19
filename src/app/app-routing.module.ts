import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BlogsComponent } from './blogs/blogs.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  {path:"", component:HomeComponent},
  {path:"blogs", component:BlogsComponent},
  {path:"sign", component:SignInComponent},
  {path:"signup", component:SignUpComponent},
  {path:"Settings", component:SettingsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponent = [
  HomeComponent,
  BlogsComponent,
  SignInComponent,
  SignUpComponent,
  SettingsComponent
]