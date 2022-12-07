import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from '@abacritt/angularx-social-login';


import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { UserComponent } from './user/user.component';
import { PokemonDetailsComponent } from './pokemon-details/pokemon-details.component';
import { PokemonRankingsComponent } from './pokemon-rankings/pokemon-rankings.component';
import { LoginComponent } from './login/login.component';
import { Secret } from './Models/Secret';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    UserComponent,
    PokemonDetailsComponent,
    PokemonRankingsComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    SocialLoginModule,
    FormsModule,
    CommonModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'Users', component: UserComponent },
      { path: 'PokemonDetails', component: PokemonDetailsComponent },
      { path: 'PokemonRankings', component: PokemonRankingsComponent },
      { path: 'Login', component: LoginComponent },
      { path: 'fetch-data', component: FetchDataComponent },

    ])
  ],
  providers: [
    {
  	provide: 'SocialAuthServiceConfig',
  	useValue: {
    	autoLogin: false,
    	providers: [
      	{
        	id: GoogleLoginProvider.PROVIDER_ID,
        	provider: new GoogleLoginProvider(Secret.googleKey
        	)
      	}
    	]
  	} as SocialAuthServiceConfig,
	  }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
