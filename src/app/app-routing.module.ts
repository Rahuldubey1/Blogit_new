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



const routes: Routes = [
  {path:"", component:BlogsComponent},
  {path:"login", component:SignInComponent},
  {path:"register", component:SignUpComponent},
  {path:"settings", component:SettingsComponent},
  {path:"complete-article", component:CompleteArticleComponent},
  {path:"profile", component:ProfileComponent},
  {path:"new-article", component:NewArticleComponent}
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
  NewArticleComponent
]