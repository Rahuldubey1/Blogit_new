import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BlogsComponent } from './blogs/blogs.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SettingsComponent } from './settings/settings.component';
import { CompleteArticleComponent } from './complete-article/complete-article.component';
import { ProfileComponent } from './profile/profile.component';
import { NewArticleComponent } from './new-article/new-article.component';
import { UserProflieComponent } from './user-proflie/user-proflie.component';
import { AuthGuard } from './auth.guard';

// import { AuthGuard } from './helper';


const routes: Routes = [
  {path:"", component:BlogsComponent},
  {path:"login", canActivate:[AuthGuard], component:SignInComponent},
  {path:"register",canActivate:[AuthGuard], component:SignUpComponent},
  {path:"settings", component:SettingsComponent},
  {path:"complete-article", component:CompleteArticleComponent},
  {path:"complete-article/:username", component:CompleteArticleComponent},
  {path:"profile", component:ProfileComponent},
  {path:"profile/:username", component:ProfileComponent},
  {path:"new-article", component:NewArticleComponent},
  {path:"user-profile", component:UserProflieComponent},
  {path:"**", component:BlogsComponent},

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
  SettingsComponent,
  CompleteArticleComponent,
  ProfileComponent,
  NewArticleComponent,
  UserProflieComponent
]