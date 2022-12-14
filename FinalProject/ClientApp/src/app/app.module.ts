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
import { UserComponent } from './user/user.component';
import { PokemonDetailsComponent } from './pokemon-details/pokemon-details.component';
import { PokemonRankingsComponent } from './pokemon-rankings/pokemon-rankings.component';
import { LoginComponent } from './login/login.component';
import { Secret } from './Models/Secret';
import { AddRankComponent } from './add-rank/add-rank.component';
import { RegisterComponent } from './register/register.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DeleteRankComponent } from './delete-rank/delete-rank.component';
import { CommunityRankingsComponent } from './communityrankings/communityrankings.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    UserComponent,
    PokemonDetailsComponent,
    PokemonRankingsComponent,
    AddRankComponent,
    LoginComponent, 
    RegisterComponent,
    DeleteRankComponent,
    CommunityRankingsComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    SocialLoginModule,
    FormsModule,
    CommonModule,
    RouterModule.forRoot([
      { path: '', component: PokemonRankingsComponent, pathMatch: 'full' },
      { path: 'Users', component: UserComponent },
      { path: 'PokemonRankings', component: PokemonRankingsComponent },
      { path: 'PokemonDetails', component: PokemonDetailsComponent },
      { path: 'PokemonDetails/:id', component: PokemonDetailsComponent },
      { path: 'AddRank', component: AddRankComponent},
      { path: 'Register', component: RegisterComponent},
      { path: 'Home', component: HomeComponent},
      { path: 'Login', component: LoginComponent },
      { path: '**', component: PageNotFoundComponent },
      { path: 'DeleteRank', component: DeleteRankComponent},
      { path: 'CommunityRankings', component: CommunityRankingsComponent}
    ])
  ],
  providers: 
  [
    {
  	provide: 'SocialAuthServiceConfig',
  	useValue: {
    	autoLogin: false,
    	providers: 
      [
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
