import { Component, OnInit } from '@angular/core';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Router } from '@angular/router';
import { UserService } from '../Services/user.service';
import { User } from '../Models/user';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  users: User[] = [];
  username: string = "";

  isRegistered: boolean = false;
  invalidUsername: boolean = false;
  usernameTaken: boolean = false;
  accountAlreadyExists: boolean = false;
  
  currentUser: SocialUser = {} as SocialUser;
  loggedIn: boolean = false;

  constructor(private authService: SocialAuthService, private userService:UserService ,private routerService: Router) { }

  ngOnInit(): void 
  {
    this.GetAllUsers();

    this.authService.authState.subscribe((user) => {
      this.currentUser = user;
      this.loggedIn = (user != null);
    });
  }
  
  GetAllUsers():void
  {
    this.userService.GetAllUsers().subscribe((results:User[])=>
    {
      this.users = results;
      console.log("Users List: ");
      console.log(this.users);
    });
  }

  Register():void
  {
//username MUST be at least 3 characters long and MUST contain letters only
    if (this.username.length < 3 || !this.OnlyLetters(this.username))
    {
      this.invalidUsername = true;
      return;
    }

    //if username already exists in database, return false
    for (let i = 0; i < this.users.length; i++)
    {
      if (this.username.toUpperCase() === this.users[i].userName.toUpperCase())
      {
        this.usernameTaken = true;
        return;
      }
    }

    for (let i = 0; i < this.users.length; i++)
    {
      if (this.users[i].googleID === this.currentUser.id)
      {
        this.accountAlreadyExists = true;
        return;
      }
    }

    this.userService.AddNewUser(this.username, this.currentUser.id).subscribe((result:User)=>
    {
      this.invalidUsername = false;
      this.usernameTaken = true;
      this.accountAlreadyExists = false;
      console.log(result);
    });

    // add alert for successful registration
    this.routerService.navigate(['/PokemonRankings']);
  }

  ContainsNumber(word : string) : boolean
  {
    return /[0-9]/.test(word);
    //return /\d/.test(word);
  }

  OnlyLetters(word: string) : boolean 
  {
    return /^[A-Za-z]*$/.test(word);
  }
}
