import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PokemonRanking } from '../Models/PokemonRanking';

@Injectable({
  providedIn: 'root'
})
export class PokemonRankingsService {

  constructor(private http: HttpClient, @Inject ("BASE_URL") private baseURL:string) 
  { 

  }

  GetPokemonRankings(): Observable<PokemonRanking[]>
  {
    console.log(`The base url is: ${this.baseURL}`)
    return this.http.get<PokemonRanking[]>(this.baseURL + `api/PokemonRankings`);
  }
}
