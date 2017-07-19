import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {HttpModule, BrowserXhr} from '@angular/http';

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
import { CircleComponent } from './circle/circle.component';
import { RouterModule } from "@angular/router";
import { DisplayDate } from './pipe/displayDate.pipe';
import { HttpService } from "./http.service";
import { SearchComponent } from './search/search.component';
import { CenterComponent } from './center/center.component';
import { MessageComponent } from "./center/message/message.component";
import { FriendComponent } from './center/friend/friend.component';
import { CreateComponent } from './create/create.component';

import { ChatComponent } from './chat/chat.component';
import { ChatWindowComponent } from './chat/chat-window/chat-window.component';
import { ChatListComponent } from './chat/chat-list/chat-list.component';
import { SearchFeedComponent } from './search/search-feed/search-feed.component';
import { SearchUserComponent } from './search/search-user/search-user.component';
import { SearchCircleComponent } from './search/search-circle/search-circle.component';
//import { ShareComponent } from './circle/share/share.component';

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
    MemberComponent,
    CircleComponent,
    DisplayDate,
    SearchComponent,
    MessageComponent,
    CenterComponent,
    FriendComponent,
    CreateComponent,
    ChatComponent,
    ChatWindowComponent,
    ChatListComponent,
    SearchFeedComponent,
    SearchUserComponent,
    SearchCircleComponent,
    //ShareComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'member/:userId', component: MemberComponent },
      { path: 'chat', component: ChatComponent},
      { path: 'circle/:circleId', component: CircleComponent},
      { path: 'search/:searchText', component: SearchComponent },
      { path: 'center/message', component: MessageComponent },
      { path: 'center/friend', component: FriendComponent },
      { path: 'create', component: CreateComponent },
      { path: 'chat', component: ChatComponent }
      // { path: 'home/:search', component: HomeComponent },
      // { path: 'user/:userId/:albumId', component: UserComponent },
      // { path: 'user/:userId', component: UserComponent },
      // { path: 'create', component: CreateComponent }
    ])
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
