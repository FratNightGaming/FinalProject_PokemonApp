import { HttpClient } from '@angular/common/http';
import { Inject, inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PokemonDetails } from '../Models/PokemonDetails';

@Injectable({
  providedIn: 'root'
})
export class PokemonDetailsService {

  baseURL: string = "";

  constructor(private http:HttpClient, @Inject ("BASE_URL") private url:string) 
  {
    this.baseURL = url;
  }

  GetPokemonDetails(index: number):Observable<PokemonDetails>
  {
    console.log(`The base URL is: ${this.baseURL}`);
    return this.http.get<PokemonDetails>(`${this.baseURL}api/Pokemon/${index}`);
  }

  GetPokemonDetailsByName(name: string):Observable<PokemonDetails>
  {
    console.log(name);
    return this.http.get<PokemonDetails>(`${this.baseURL}api/Pokemon/Name/${name}`);
  }
}
