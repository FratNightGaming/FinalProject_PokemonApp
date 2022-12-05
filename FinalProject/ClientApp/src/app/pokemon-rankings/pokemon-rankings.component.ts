import { Component, OnInit } from '@angular/core';
import { PokemonRanking } from '../Models/PokemonRanking';
import { User } from '../Models/user';
import { PokemonRankingsService } from '../Services/pokemon-rankings.service';

@Component({
  selector: 'app-pokemon-rankings',
  templateUrl: './pokemon-rankings.component.html',
  styleUrls: ['./pokemon-rankings.component.css']
})
export class PokemonRankingsComponent implements OnInit {

  pokemonRankings: PokemonRanking[] =[];
  currentUser : User = {} as User;

  constructor(private pokemonRankingsService:PokemonRankingsService) { }

  ngOnInit(): void 
  {
    this.GetPokemonRankings();
  }

  GetPokemonRankings():void
  {
    this.pokemonRankingsService.GetPokemonRankings().subscribe((results: PokemonRanking[]) =>
    {
      console.log(results);
      this.pokemonRankings = results;
    });
  }

  
  GetUserForEachRanking(rankings: PokemonRanking[]):void
  {
    for (let i = 0; i < rankings.length; i++)
    {

    }
  }
}
