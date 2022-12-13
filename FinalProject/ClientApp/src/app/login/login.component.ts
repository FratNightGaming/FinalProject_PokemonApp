import { Component, OnInit } from '@angular/core';
import { User } from '../Models/user';
import { UserService } from '../Services/user.service';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit 
{
  //user : User = {} as User;
  username: string = "";
  registerUsername: string = "";
  users: User[] = [];

  currentUser: SocialUser = {} as SocialUser;
  loggedIn: boolean = false;

  //For signing in (after being logged into google account)
  isSignedIn: boolean = false;
  failureToSignIn: boolean = false;

  //For registering a new username
  isRegistered: boolean = false;
  usernameTaken: boolean = false;
  invalidUsername:boolean = false;

  constructor(private userService:UserService, private authService: SocialAuthService, private routerService: Router) { }

  ngOnInit(): void 
  {
    this.GetAllUsers();
    //
    this.authService.authState.subscribe((user) => {
      this.currentUser = user;
      this.loggedIn = (user != null);
      //this.userService.GetCurrentUser(this.currentUser.id)
    });
    
  }
  
  GetAllUsers():void
  {
    this.userService.GetAllUsers().subscribe((results:User[])=>
    {
      this.users = results;
      console.log(this.users);
    });
  }
  
  SignIn(username: string):void
  {
    for (let i = 0; i < this.users.length; i++)
    {
      //2 checks: 
      //1 - make sure username matches a username from database
      //2 - make sure username is connected to the user's google id
      if (username === this.users[i].userName)
      {
        if (this.users[i].googleID === this.currentUser.id)
        {
          this.isSignedIn = true;
          this.failureToSignIn = false;
          this.invalidUsername = false;
          console.log(`${this.currentUser} - Successful login broski`);
          return;
        }
        
        // //this code may be unnecessary
        // else
        // {
        //   continue;
        // }
      }

      {
        this.isSignedIn = false;
        this.failureToSignIn = true;
        this.invalidUsername = true;
        console.log(`${this.currentUser} - Failure to login dude`);
      }
    }
  }

  Register():void
  {
    this.userService.AddNewUser(this.username, this.currentUser.id).subscribe((result:User)=>
    {
      for (let i = 0; i < this.users.length; i++)
      
      console.log(result);

    }
    );
  }




  Register2():void
  {
    //username MUST be at least 3 characters long and MUST contain letters only
    if (this.registerUsername.length < 3 || !this.OnlyLetters(this.registerUsername))
    {
      this.invalidUsername = true;
      return;
    }
    
    //if username already exists in database, return false
    for (let i = 0; i < this.users.length; i++)
    {
      if (this.users[i].userName.toUpperCase() === this.registerUsername.toUpperCase())
      {
        this.usernameTaken = true;
        return;
      }
    }
    
    //if username is validated, add to database
    this.userService.AddNewUser(this.registerUsername, this.currentUser.id).subscribe((result:User)=>
    {
      console.log(result);
      this.invalidUsername = false;
      this.usernameTaken = false;
      this.isRegistered = true;

      this.routerService.navigate(['/PokemonRankings']);
    }
    );
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