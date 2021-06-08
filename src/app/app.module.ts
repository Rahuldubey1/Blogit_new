import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// import { AppRoutingModule } from './app-routing.module';
import { AppRoutingModule, routingComponent } from './app-routing.module';
// import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { ArticleListComponent } from './article-list/article-list.component';
import { ProfileComponent } from './profile/profile.component';
import { UserProflieComponent } from './user-proflie/user-proflie.component';



@NgModule({
  declarations: [
    AppComponent,
    routingComponent,
    ArticleListComponent,
    ProfileComponent,
    UserProflieComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    NgxPaginationModule
    // AngularFontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
