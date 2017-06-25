import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import 'rxjs/add/operator/map';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { SwiperComponent } from './home/swiper/swiper.component';
import { CardComponent } from './home/card/card.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { SigninComponent } from './nav/signin/signin.component';
import { SignupComponent } from './nav/signup/signup.component';
import { MemberComponent } from './member/member.component';
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    SwiperComponent,
    CardComponent,
    FooterComponent,
    HomeComponent,
    SigninComponent,
    SignupComponent,
    MemberComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'member/:userId', component: MemberComponent }
      // { path: 'home/:search', component: HomeComponent },
      // { path: 'user/:userId/:albumId', component: UserComponent },
      // { path: 'user/:userId', component: UserComponent },
      // { path: 'create', component: CreateComponent }
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
