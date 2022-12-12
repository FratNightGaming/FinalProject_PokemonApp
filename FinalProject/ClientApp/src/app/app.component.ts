import { Component } from '@angular/core';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent 
{
  title = 'app';

  currentUser: SocialUser = {} as SocialUser;
  loggedIn: boolean = false;
  
  constructor(private authService: SocialAuthService)
  {

  }
  
  ngOnInit(): void 
  {
    this.authService.authState.subscribe((user) => {
      this.currentUser = user;
      this.loggedIn = (user != null);
    });
  }




}
