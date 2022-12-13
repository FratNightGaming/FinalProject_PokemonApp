import { Component, OnInit } from '@angular/core';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {
  isExpanded = false;

  user: SocialUser = {} as SocialUser;
  loggedIn: boolean = false;


  constructor(private authService: SocialAuthService, private routerService: Router) { }

  ngOnInit(): void {

    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
    });
  }
  
  signOut(): void {
    this.authService.signOut();
    this.routerService.navigate(['']);
    }    
  

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  NavigateToPokemonRankings()
  {
    this.routerService.navigate(['/PokemonRankings']);
  }
}
