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

  GetPokemonRankingsByUser(googleID : string): Observable<PokemonRanking[]>
  {
    return this.http.get<PokemonRanking[]>(this.baseURL + `api/PokemonRankings/User/${googleID}`);
  }

  GetPokemonRankingsByType(userID:number, type: string): Observable<PokemonRanking[]>
  {
    return this.http.get<PokemonRanking[]>(this.baseURL + `api/PokemonRankings/User/${userID}/Type/${type}`);
  }


  GetPokemonRankingsByGeneration(userID:number, generationID: number): Observable<PokemonRanking[]>
  {
    return this.http.get<PokemonRanking[]>(this.baseURL + `api/PokemonRankings/User/${userID}/Generation/${generationID}`);

  AddRanking(userId:number, userRank:number, pokemonApiid:number, name:string):void{
    console.log(name);
    let newPokeRank:PokemonRanking = {userId:userId, userRank:userRank, pokemonApiid:pokemonApiid, name:name};
    this.http.post<PokemonRanking>(this.baseURL + 'api/PokemonRankings', newPokeRank).subscribe(data => {});

  }
}
