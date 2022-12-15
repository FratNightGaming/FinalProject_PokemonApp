import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommunityRanking } from '../Models/CommunityRanking';
import { PokemonDetails } from '../Models/PokemonDetails';

import { PokemonRanking } from '../Models/PokemonRanking';

@Injectable({
  providedIn: 'root'
})
export class PokemonRankingsService 
{
  static allPokemonDetailsList : PokemonDetails [] = [];

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
  
  AddRanking(newPokemonRanking:PokemonRanking, googleID:string):Observable<PokemonRanking[]>
  { 
    return this.http.post<PokemonRanking[]>(this.baseURL + `api/PokemonRankings/${googleID}`, newPokemonRanking);
  }

  RemovePokemonRanking(name:string, googleID:string):void
  {
    console.log(name);
    this.http.delete<PokemonRanking>(this.baseURL + `api/PokemonRankings/${name}/${googleID}`).subscribe(data => {});
  }

  GetCommunityRankings():Observable<CommunityRanking[]>
  {
    return this.http.get<CommunityRanking[]>(this.baseURL + `api/PokemonRankings/CommunityRankings`);
  }
}