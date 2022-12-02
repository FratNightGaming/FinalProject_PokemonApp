import { HttpClient } from '@angular/common/http';
import { Inject, inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseURL:string = "";

  constructor(private http: HttpClient, @Inject ("BASE_URL") private url:string) 
  { 
    this.baseURL = url;
  }

  GetCurrentUser(id:number):Observable <User>
  {
    return this.http.get<User>(`${this.baseURL}api/Users/${id}`);
  }

  GetAllUsers():Observable <User[]>
  {
    return this.http.get<User[]>(`${this.baseURL}api/Users`);
  }
}
