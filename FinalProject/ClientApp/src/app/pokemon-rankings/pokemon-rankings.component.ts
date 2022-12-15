import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { match } from 'assert';
import { filter } from 'rxjs';
import { Pokemon } from '../Models/pokemon';
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

  // allPokemonRankings: PokemonRanking[] = [];


  currentPokemonRankingsList: PokemonRanking[] = [];//this list will be displayed on html; it changes with each filter
  pokemonRankingsByCurrentUser: PokemonRanking[] = [];
  pokemonRankingsByType: PokemonRanking[] = [];
  pokemonRankingsByGeneration: PokemonRanking[] = [];
  pokemonRankingsByBoth: PokemonRanking[] = [];//this will be used when we call more than gen 1 pkmon


  //list of 151 pokemon details
  totalPokemonDetailsList: PokemonDetails [] = [];
  unrankedPokemonDetailsList: PokemonDetails [] = [];
  currentPokeDetails: PokemonDetails = {} as PokemonDetails;

  //list of 151 pokemon names (and urls)
  //allPokemonNames: Pokemon[] = [];

  //current rankings represents the current un/filtered list
  currentPokemonRankings: PokemonRanking[] = [];
  
  //filteredPokemonDetails changes after each filter
  filteredPokemonDetails: PokemonDetails[] = [];
  //unrankedPokemonDetails: PokemonDetails[] = [];
  
  currentUser: SocialUser = {} as SocialUser;
  loggedIn: boolean = false;
  
  typeFilter: string = "";
  generationFilter: number = 0;
  
  // pokemonName:string ="";
  // pokeSprite:string = "";
  currentPokemonDetails: PokemonDetails = {} as PokemonDetails;

  userId:number = 0;
  userRank:number = 0;
  pokemonApiid:number = 0;
  name:string="";
  sprite:string="";
  types:string ="";
  originalGame:string="";

  displayDetails: boolean = false;

  constructor(
    private authService: SocialAuthService,
    private pokemonRankingsService:PokemonRankingsService, 
    private pokemonDetailsService:PokemonDetailsService, 
    private _Activatedroute:ActivatedRoute) 
    { 
      
    }

  ngOnInit(): void 
  {
    this.authService.authState.subscribe((user) => {
      this.currentUser = user;
      this.loggedIn = (user != null);
      this.GetPokemonRankingsByUser();
      //we need to have an array that contains ALL pokemon upon initialization
      //getAllPokemon calls getAllPokemonDetails, which will then get all details and put it in a list
      //getAllPokemonDetails calls GetRankingsByCurrentUser, which gets the rankings by user and sets 
      //currentuserRankings to rankingsbyUser
      //this.GetUnrankedPokemon();
    });
  }
  
  GetPokemonRankingsByUser():void
  {
    this.pokemonRankingsService.GetPokemonRankingsByUser(this.currentUser.id).subscribe((results:PokemonRanking[])=>
    {
      this.pokemonRankingsByCurrentUser = results;
      this.currentPokemonRankings = this.pokemonRankingsByCurrentUser;

      console.log("Pokemon Rankings By User: ");
      console.log(results);
      console.log(this.pokemonRankingsByCurrentUser);
      console.log(this.currentPokemonRankings);


      this.GetUnrankedPokemonDetails();
    }
    ); 
  }

  GetUnrankedPokemonDetails(): void
  {
    if (PokemonRankingsService.allPokemonDetailsList.length === 0)
    {
      for (let i = 1; i <= 151; i++)
      {
        this.pokemonDetailsService.GetPokemonDetailsByID(i).subscribe((result : PokemonDetails) => 
          {
            this.totalPokemonDetailsList.push(result);
            this.unrankedPokemonDetailsList.push(result);
            if (i === 151)
            {
              setTimeout(()=>{this.CalculateUnrankedPokemon()}, 3000);
            }
          }
          );
      }
    }

    else
    {
      this.totalPokemonDetailsList = PokemonRankingsService.allPokemonDetailsList;
      this.unrankedPokemonDetailsList = PokemonRankingsService.allPokemonDetailsList;

      for (let i = 0; i <= this.pokemonRankingsByCurrentUser.length; i++)
        {
          this.unrankedPokemonDetailsList.splice(this.pokemonRankingsByCurrentUser[i].pokemonApiid - 1, 1);
        }
    }
  }

  CalculateUnrankedPokemon():void
  {
    PokemonRankingsService.allPokemonDetailsList = this.totalPokemonDetailsList;

    this.unrankedPokemonDetailsList.sort((a, b) => (a.id > b.id) ? 1 : -1);
    
    let matchingPokemon:PokemonDetails[] = [];


    for (let j = 0; j < this.pokemonRankingsByCurrentUser.length; j++)
    {
      matchingPokemon.push(this.unrankedPokemonDetailsList[this.pokemonRankingsByCurrentUser[j].pokemonApiid - 1]);
      // this.unrankedPokemonDetailsList.splice(this.pokemonRankingsByCurrentUser[j].pokemonApiid - 1, 1);
    }
    
    for (let j = 0; j < matchingPokemon.length; j++)
    {
      let index: number = this.unrankedPokemonDetailsList.indexOf(matchingPokemon[j]);
      this.unrankedPokemonDetailsList.splice(index, 1);
    }
    
    this.filteredPokemonDetails = this.unrankedPokemonDetailsList;
  }


  GetPokemonRankingsByType(type:string):void
  {
    if (this.loggedIn && type !== null)
    {
      this.pokemonRankingsService.GetPokemonRankingsByType(this.currentUser.id, type).subscribe((results : PokemonRanking[]) =>
      {
        this.pokemonRankingsByType = results;
        this.currentPokemonRankings = this.pokemonRankingsByType;
        console.log("Pokemon Rankings by Type:");
        console.log(this.currentPokemonRankings);
      })
    }
  }

  GetPokemonRankingsByGeneration(generationID: number):void
  {
    if (this.loggedIn && generationID !== null)
    {
      this.pokemonRankingsService.GetPokemonRankingsByGeneration(this.currentUser.id, generationID).subscribe((results : PokemonRanking[]) =>
      {
        this.pokemonRankingsByGeneration = results;
        this.currentPokemonRankings = this.pokemonRankingsByGeneration;
        console.log("Pokemon Rankings by Generation: ");
        console.log(this.currentPokemonRankings);
      }
      )
    }
  }

  GetPokemonRankingsByBoth(typeFilter:string, genFilter:number):void
  {
    this.pokemonRankingsService.GetPokemonRankingsByBoth(this.currentUser.id, typeFilter, genFilter).subscribe((results: PokemonRanking[])=>
    {
      this.pokemonRankingsByBoth = results;
      this.currentPokemonRankings = this.pokemonRankingsByBoth;
      console.log("Pokemon Rankings by Type and Generation: ");
      console.log(results);
    })
  }

  

  AddPokemonRanking(userRank:number, name:string):void
  {
    this.pokemonDetailsService.GetPokemonDetailsByName(name).subscribe((result) =>

    {
      this.currentPokeDetails = result;

      let types:string = this.currentPokeDetails.types.length > 1?  `${this.currentPokeDetails.types[0].type.name}, ${this.currentPokeDetails.types[1].type.name}`:this.currentPokeDetails.types[0].type.name;
      
      let newPokeRank : PokemonRanking = 
      {
        id: 0, userId: 0, userRank:userRank, sprite:this.currentPokeDetails.sprites.front_default, 
        name: this.currentPokeDetails.name, types: types, 
        originalGame:this.currentPokeDetails.game_indices[0].version.name,pokemonApiid:this.currentPokeDetails.id
      }

      this.pokemonRankingsService.AddRanking(newPokeRank, this.currentUser.id).subscribe((results:PokemonRanking[])=>
      {
        console.log("New Rankings with Added Pokemon: ");
        console.log(results);
      });
    })
  }

  DeletePokemonRanking(name:string): void
  {
    // let deletedPoke:PokemonRanking = 
    // {
    //   id: 0, userId: 0, userRank: userRank, name: name, pokemonApiid: pokemonApiid, types: types, originalGame: originalGame, sprite: sprite
    // };
    
    // this.pokemonDetailsService.GetPokemonDetailsByName(deletedPoke.name).subscribe((result : PokemonDetails) =>
    // {
    //   this.unrankedPokemonDetailsList.push(result);
    //   console.log("DELETED Pokemon: ");
    //   console.log(result);
    //   console.log("Updated Pokemon Details List: ");
    //   console.log(this.unrankedPokemonDetailsList);
    // }
    // );
    
    this.pokemonRankingsService.RemovePokemonRanking(name, this.currentUser.id);
  }

  ToggleFullDetails():void
  {
    this.displayDetails = !this.displayDetails;
  }

  GetPokemonGenerationID(id: number): number
  {
    if (id > 0 && id <= 151)
    {
      return 1;
    }

    else if (id > 151 && id <= 251)
    {
      return 2;
    }

    else if (id > 251 && id <= 386)
    {
      return 3;
    }

    else if (id > 386 && id <= 493)
    {
      return 4;
    }

    else if (id > 493 && id <= 649)
    {
      return 5;
    }

    else if (id > 649 && id <= 721)
    {
      return 6;
    }

    else if (id > 721 && id <= 809)
    {
      return 7;
    }

    else if (id > 809 && id <= 905)
    {
      return 8;
    }

    else
    {
      return 9;
    }
    
    return -1;
  }
}
