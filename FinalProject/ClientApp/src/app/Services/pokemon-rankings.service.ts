import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { PokemonRanking } from '../Models/PokemonRanking';

@Injectable({
  providedIn: 'root'
})
export class PokemonRankingsService 
{

  constructor(private http: HttpClient, @Inject ("BASE_URL") private baseURL:string) 
  { 

  }

  GetPokemonRankings(): Observable<PokemonRanking[]>
  {
    console.log(`The base url is: ${this.baseURL}`)
    return this.http.get<PokemonRanking[]>(this.baseURL + `api/PokemonRankings`);
  }

  GetPokemonRankingsByUser(googleID : string): Observable<PokemonRanking[]>
  {
    return this.http.get<PokemonRanking[]>(this.baseURL + `api/PokemonRankings/User/${googleID}`);
  }

  GetPokemonRankingsByType(googleID : string, type: string): Observable<PokemonRanking[]>
  {
    return this.http.get<PokemonRanking[]>(this.baseURL + `api/PokemonRankings/User/${googleID}/Type/${type}`);
  }


  GetPokemonRankingsByGeneration(googleID : string, generationID: number): Observable<PokemonRanking[]>
  {
    return this.http.get<PokemonRanking[]>(this.baseURL + `api/PokemonRankings/User/${googleID}/Generation/${generationID}`);
  }

  GetPokemonRankingsByBoth(googleID:string, typeFilter: string, genFilter: number): Observable<PokemonRanking[]>
  {
    return this.http.get<PokemonRanking[]>(this.baseURL + `api/PokemonRankings/User/${googleID}/Generation/${genFilter}/Type/${typeFilter}`);
  }
  
  AddRanking(userID:number, userRank:number, pokemonApiid:number, name:string, googleID:string):Observable<PokemonRanking[]>
  {
    console.log(googleID);
    let newPokemonRanking:PokemonRanking = {userId:userID, userRank:userRank, pokemonApiid:pokemonApiid, name:name};
    return this.http.post<PokemonRanking[]>(this.baseURL + `api/PokemonRankings/${googleID}`, newPokemonRanking);
  }

}