import { Component, OnInit } from '@angular/core';
import { User } from '../Models/user';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit 
{

  currentUser: User = {} as User;
  username: string = "";
  users: User[] = [];

  constructor(private userService:UserService) { }

  ngOnInit(): void 
  {
    this.GetAllUsers();
  }

  Login(username: string):void
  {
    for (let i = 0; i < this.users.length; i++)
    {
      if (username === this.users[i].userName)
      {
        this.currentUser = this.users[i];
        console.log(this.currentUser);
      }
    }
  }

  GetAllUsers():void
  {
    this.userService.GetAllUsers().subscribe((results:User[])=>
    {
      this.users = results;
      console.log(this.users);
    });
  }

  Register():void
  {
    this.userService.AddNewUser(this.username).subscribe((result:User)=>
    {
      for (let i = 0; i < this.users.length; i++)
      
      console.log(result);

    }
    );
  }

}
