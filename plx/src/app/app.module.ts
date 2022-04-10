import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { HeaderComponent } from './core/header/header.component';
// import { FooterComponent } from './footer/footer.component';
import { SearchComponent } from './search/search.component';
import { LessonsComponent } from './lessons/lessons.component';
import { LessonComponent } from './lesson/lesson.component';
import { DetailsComponent } from './details/details.component';
// import { LoginComponent } from './auth/login/login.component';
// import { RegisterComponent } from './auth/register/register.component';
import { CreateComponent } from './create/create.component';
import { CoreModule } from './core/core.module';
import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthModule } from './auth/auth.module';
import { ReactiveFormsModule } from '@angular/forms';
import { UpdateComponent } from './update/update.component';
import { CommentsComponent } from './comments/comments.component';
import { CommentComponent } from './comment/comment.component';

@NgModule({
  declarations: [
    AppComponent,
    // HeaderComponent,
    // FooterComponent,
    SearchComponent,
    LessonsComponent,
    LessonComponent,
    DetailsComponent,
    // LoginComponent,
    // RegisterComponent,
    CreateComponent,
    UpdateComponent,
    CommentsComponent,
    CommentComponent
  ],
  imports: [
    BrowserModule,
    CoreModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    AuthModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [
    AppComponent,
    HeaderComponent,
    FooterComponent
  ]
})
export class AppModule { }
