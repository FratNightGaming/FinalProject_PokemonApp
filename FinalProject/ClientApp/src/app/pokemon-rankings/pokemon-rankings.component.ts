import { Component, OnInit } from '@angular/core';
import { PokemonDetails } from '../Models/PokemonDetails';
import { PokemonRanking } from '../Models/PokemonRanking';
import { User } from '../Models/user';
import { PokemonDetailsService } from '../Services/pokemon-details.service';
import { PokemonRankingsService } from '../Services/pokemon-rankings.service';

@Component({
  selector: 'app-pokemon-rankings',
  templateUrl: './pokemon-rankings.component.html',
  styleUrls: ['./pokemon-rankings.component.css']
})
export class PokemonRankingsComponent implements OnInit {

  pokemonRankings: PokemonRanking[] =[];
  pokemonRankingsByCurrentUser: PokemonRanking[] =[];
  pokemonRankingsByType: PokemonRanking[] =[];

  filteredByType: string = "";
  filteredByGeneration: number = 0;
  filteredByCriteria: string = "";

  pokemonName:string ="";


  userID : number = 0;

  currentUser : User = {} as User;

  constructor(private pokemonRankingsService:PokemonRankingsService, private pokemonService:PokemonDetailsService) { }

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

      for (let i = 0; i < this.pokemonRankings.length; i++)
      {
        this.pokemonService.GetPokemonDetails(this.pokemonRankings[i].pokemonApiId).subscribe((result:PokemonDetails) =>
        {
          this.pokemonRankings[i].name = result.name;
        });
      }
    });
  }

  
  GetPokemonRankingsByUser(id : number):void
  {
    this.pokemonRankingsService.GetPokemonRankingsByUser(id).subscribe((results : PokemonRanking[]) =>
    {
      console.log(results);
      this.pokemonRankingsByCurrentUser = results;
    }
    )
  }

  GetPokemonRankingsByType(id: number, type:string):void
  {
    this.pokemonRankingsService.GetPokemonRankingsByType(id, type).subscribe((results : PokemonRanking[]) =>
    {
      console.log(results);
      this.pokemonRankingsByType = results;
    }
    )
  }
}
