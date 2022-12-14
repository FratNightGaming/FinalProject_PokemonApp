import { HttpClient } from '@angular/common/http';
import { Inject, inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pokemon } from '../Models/pokemon';
import { PokemonDetails } from '../Models/PokemonDetails';

@Injectable({
  providedIn: 'root'
})
export class PokemonDetailsService {

  baseURL: string = "";

  constructor(private http:HttpClient, @Inject ("BASE_URL") private url:string) 
  {
    this.baseURL = url;
    console.log(`The base URL is: ${this.baseURL}`);
  }

  GetAllPokemon():Observable<Pokemon[]>
  {
    return this.http.get<Pokemon[]>(`${this.baseURL}api/Pokemon`);
  }

  GetPokemonDetailsByID(index: number):Observable<PokemonDetails>
  {
    return this.http.get<PokemonDetails>(`${this.baseURL}api/Pokemon/${index}`);
  }

  GetPokemonDetailsByName(name: string):Observable<PokemonDetails>
  {
    console.log(name);
    return this.http.get<PokemonDetails>(`${this.baseURL}api/Pokemon/Name/${name}`);
  }
}
