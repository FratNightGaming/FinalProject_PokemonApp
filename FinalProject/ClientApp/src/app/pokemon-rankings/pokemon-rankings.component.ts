import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
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
  pokemonRankingsByGeneration: PokemonRanking[] =[];
  pokemonRankingsByBoth: PokemonRanking[] = [];

  user: SocialUser = {} as SocialUser;
  loggedIn: boolean = false;

  typeFilter: string = "";
  generationFilter: number = 0;

  pokemonName:string ="";


  userID : number = 0;

  currentUser : User = {} as User;

  constructor(private pokemonRankingsService:PokemonRankingsService, private pokemonService:PokemonDetailsService, private authService: SocialAuthService) { }

  ngOnInit(): void 
  {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
    });
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
        this.pokemonService.GetPokemonDetails(this.pokemonRankings[i].pokemonApiid).subscribe((result:PokemonDetails) =>
        {
          this.pokemonRankings[i].name = result.name;
        });
      }
    });
  }
  
  GetPokemonRankingsByUser():void
  {
    if (this.loggedIn)
    {
      this.pokemonRankingsService.GetPokemonRankingsByUser(this.user.id).subscribe((results : PokemonRanking[]) =>
      {
        console.log(results);
        this.pokemonRankingsByCurrentUser = results;
  
        for (let i = 0; i < this.pokemonRankingsByCurrentUser.length; i++)
        {
          this.pokemonService.GetPokemonDetails(this.pokemonRankingsByCurrentUser[i].pokemonApiid).subscribe((result:PokemonDetails) =>
          {
            this.pokemonRankingsByCurrentUser[i].name = result.name;
          });
        }
      })
    }
  }

  GetPokemonRankingsByType(type:string):void
  {
    if (this.loggedIn)
    {
      this.pokemonRankingsService.GetPokemonRankingsByType(this.user.id, type).subscribe((results : PokemonRanking[]) =>
      {
        console.log(results);
        this.pokemonRankingsByType = results;
  
        for (let i = 0; i < this.pokemonRankingsByType.length; i++)
        {
          this.pokemonService.GetPokemonDetails(this.pokemonRankingsByType[i].pokemonApiid).subscribe((result:PokemonDetails) =>
          {
            this.pokemonRankingsByType[i].name = result.name;
          });
        }
      })
    }
  }

  GetPokemonRankingsByGeneration(generationID: number):void
  {
    this.pokemonRankingsService.GetPokemonRankingsByGeneration(this.user.id, generationID).subscribe((results : PokemonRanking[]) =>
    {
      console.log(results);
      this.pokemonRankingsByGeneration = results;
      
      for (let i = 0; i < this.pokemonRankingsByGeneration.length; i++)
      {
        this.pokemonService.GetPokemonDetails(this.pokemonRankingsByGeneration[i].pokemonApiid).subscribe((result:PokemonDetails) =>
        {
          this.pokemonRankingsByGeneration[i].name = result.name;
        });
      }
    }
    )
  }

  GetPokemonRankingsByBoth(typeFilter:string, genFilter:number):void
  {
    this.pokemonRankingsService.GetPokemonRankingsByBoth(this.user.id, typeFilter, genFilter).subscribe((results: PokemonRanking[])=>
    {
      console.log(results);
      this.pokemonRankingsByBoth = results;

      for(let i = 0; i < results.length; i++)
      {
        this.pokemonService.GetPokemonDetails(this.pokemonRankingsByBoth[i].pokemonApiid).subscribe((result:PokemonDetails)=>
        {
          this.pokemonRankingsByBoth[i].name = result.name;
          console.log(result.name);
        })
      }
    })
  }
}
