import { Component, OnInit } from '@angular/core';
import { User } from '../Models/user';
import { UserService } from '../Services/user.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';

// import { CommonModule } from '@angular/common'
       
// @NgModule({
//     imports: [
//         CommonModule
//     ]
// })
    
// export class ProductModule { }


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  
  users: User[] = [];
  currentUser: User = {} as User;
  
  user: SocialUser = {} as SocialUser;
  loggedIn: boolean = false;


  constructor(private userService:UserService, private socialService:SocialAuthService) 
  { 

  }

  ngOnInit(): void {
    //this.GetAllUsers();
    this.socialService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
    });
  
  }

  GetAllUsers():void
  {
    this.userService.GetAllUsers().subscribe((results: User[]) => 
    {
      console.log(results);
      this.users = results;
    });
  }

  GetCurrentUser(id:number):void
  {
    this.userService.GetCurrentUser(id).subscribe((result: User) =>
    {
      console.log(result);
      this.currentUser = result;
    }
    );
  }
}
