import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
  
  constructor(private userService:UserService) 
  { 

  }

  ngOnInit(): void {
    //this.GetAllUsers();
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
