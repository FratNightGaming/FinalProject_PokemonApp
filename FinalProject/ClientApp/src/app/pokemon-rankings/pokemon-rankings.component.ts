import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  pokemonRankings: PokemonRanking[] = [];
  pokemonRankingsByCurrentUser: PokemonRanking[] = [];
  pokemonRankingsByType: PokemonRanking[] = [];
  pokemonRankingsByGeneration: PokemonRanking[] = [];
  pokemonRankingsByBoth: PokemonRanking[] = [];

  //current rankings represents the current un/filtered list
  allPokemonDetailsList: PokemonDetails [] = [];
  currentPokemonRankings: PokemonRanking[] = [];
  unrankedPokemonDetailsList: PokemonDetails[] = [];
  allPokemonList: Pokemon[] = [];


  currentUser: SocialUser = {} as SocialUser;
  loggedIn: boolean = false;

  typeFilter: string = "";
  generationFilter: number = 0;

  pokemonName:string ="";


  userID : number = 0;
  user : User = {} as User;

  //will be used in NGMODULE to get rank from user
  userRank:number = 0;
  currentPokemonDetails: PokemonDetails = {} as PokemonDetails;

  pokemonDetails: PokemonDetails[] = [];
  // pokemonDetailsByGeneration: PokemonDetails[] = [];
  // pokemonDetailsByType: PokemonDetails[] = [];


  constructor(
    private pokemonRankingsService:PokemonRankingsService, 
    private pokemonService:PokemonDetailsService, 
    private authService: SocialAuthService, 
    private _Activatedroute:ActivatedRoute) 
    { 
      
    }

  ngOnInit(): void 
  {
    this.authService.authState.subscribe((user) => {
      this.currentUser = user;
      this.loggedIn = (user != null);
      this.GetPokemonRankingsByUser();//the user MUST be logged in before entering this component...
      this.GetAllPokemon();//we need to have an array that contains ALL pokemon upon initialization
      this.GetAllPokemonDetails();
      this.GetUnrankedPokemon();
    });
    
  }
  
  GetAllPokemon():void
  {
    this.pokemonService.GetAllPokemon().subscribe((results : Pokemon[]) => 
    {
      this.allPokemonList = results;
      console.log(this.allPokemonList);
    });  
  }
  
  
  // GetPokemonRankings():void
  // {
  //   this.pokemonRankingsService.GetPokemonRankings().subscribe((results: PokemonRanking[]) =>
  //   {
  //     console.log(results);
  //     this.pokemonRankings = results;

  //     for (let i = 0; i < this.pokemonRankings.length; i++)
  //     {
  //       this.pokemonService.GetPokemonDetails(this.pokemonRankings[i].pokemonApiid).subscribe((result:PokemonDetails) =>
  //       {
  //         this.pokemonDetails.push(result); 
  //       });
  //     }
  //     //let newid : number = Number(this._Activatedroute.snapshot.paramMap.get("id"));
  //   });
  // }
  
  GetPokemonRankingsByUser():void
  {
    this.pokemonDetails.splice(0, this.pokemonDetails.length);//empty the array before pushing many PokeDetails to it
    
    if (this.loggedIn)
    {
      this.pokemonRankingsService.GetPokemonRankingsByUser(this.currentUser.id).subscribe((results : PokemonRanking[]) =>
      {
        console.log(results);
        this.pokemonRankingsByCurrentUser = results;

        
        console.log("Pokemon Details List BEFORE");
        console.log(this.pokemonDetails);

        for (let i = 0; i < this.pokemonRankingsByCurrentUser.length; i++)
        {
          this.pokemonService.GetPokemonDetailsByID(this.pokemonRankingsByCurrentUser[i].pokemonApiid).subscribe((result:PokemonDetails) =>
          {
            this.pokemonDetails.push(result);
          });
        }
        console.log("Pokemon Details List");
        console.log(this.pokemonDetails);
        //after each filter, set the currentPokemonRankings to result
        this.currentPokemonRankings = this.pokemonRankingsByCurrentUser;  //or should/can it be equal to this.pokemonRankingsByCurrentUser?        
        console.log(`Details - ${this.pokemonDetails}`);
      })
    }
  }

  GetPokemonRankingsByType(type:string):void
  {
    if (this.loggedIn)
    {
      this.pokemonRankingsService.GetPokemonRankingsByType(this.currentUser.id, type).subscribe((results : PokemonRanking[]) =>
      {
        console.log(results);
        this.pokemonRankingsByType = results;
        this.pokemonDetails.length = 0;//empty the array before pushing many PokeDetails to it
  
        for (let i = 0; i < this.pokemonRankingsByType.length; i++)
        {
          this.pokemonService.GetPokemonDetailsByID(this.pokemonRankingsByType[i].pokemonApiid).subscribe((result:PokemonDetails) =>
          {
            this.pokemonDetails.push(result);
          });

          this.currentPokemonRankings = this.pokemonRankingsByType;
          console.log(`Current rankings by Type: ${this.currentPokemonRankings}`);
        }
      })
    }
  }

  GetPokemonRankingsByGeneration(generationID: number):void
  {
    this.pokemonRankingsService.GetPokemonRankingsByGeneration(this.currentUser.id, generationID).subscribe((results : PokemonRanking[]) =>
    {
      console.log(results);
      this.pokemonRankingsByGeneration = results;
      this.pokemonDetails.length = 0;//empty the array before pushing many PokeDetails to it
      
      for (let i = 0; i < this.pokemonRankingsByGeneration.length; i++)
      {
        this.pokemonService.GetPokemonDetailsByID(this.pokemonRankingsByGeneration[i].pokemonApiid).subscribe((result:PokemonDetails) =>
        {
          this.pokemonDetails.push(result);
        });

        this.currentPokemonRankings = this.pokemonRankingsByGeneration;
        console.log(`Current rankings by Generation: ${this.currentPokemonRankings}`);
      }
    }
    )
  }

  GetPokemonRankingsByBoth(typeFilter:string, genFilter:number):void
  {
    this.pokemonRankingsService.GetPokemonRankingsByBoth(this.currentUser.id, typeFilter, genFilter).subscribe((results: PokemonRanking[])=>
    {
      console.log(results);
      this.pokemonRankingsByBoth = results;
      this.pokemonDetails.length = 0;//empty the array before pushing many PokeDetails to it

      for(let i = 0; i < results.length; i++)
      {
        this.pokemonService.GetPokemonDetailsByID(this.pokemonRankingsByBoth[i].pokemonApiid).subscribe((result:PokemonDetails)=>
        {
          this.pokemonDetails.push(result);
        })
      }

      this.currentPokemonRankings = results;
      console.log(`Current rankings by Both: ${this.currentPokemonRankings}`);
    })
  }

  AddPokemonRanking(): void
  {
    this.pokemonRankingsService.AddRanking(0, this.userRank, this.currentPokemonDetails.id,this.currentUser.id ).subscribe
  }
  //helper method i.e. doesnt call service to create array of unranked pokemon
  GetUnrankedPokemon(): void
  {

    console.log("Unranked Pokemon Details List");

    for (let i = 0; i < this.allPokemonList.length; i++)
    {
      this.pokemonService.GetPokemonDetailsByID(this.currentPokemonRankings[i].pokemonApiid).subscribe((result:PokemonDetails)=>
      {
        this.pokemonDetails.push(result);
      })
      
    }
    for (let i = 0; i < this.allPokemonList.length; i++)
    {
      if (!this.allPokemonDetailsList.includes(this.pokemonDetails[i]))
      {
        this.unrankedPokemonDetailsList.push(this.pokemonDetails[i]);
      }

      // if(!this.pokemonDetails[i].name.includes(this.allPokemonList[i].name))
      // {
      //   this.unrankedPokemonDetailsList.push(this.pokemonDetails[i]);
      // }

    }
    
    console.log("Unranked Pokemon List");
    console.log(this.unrankedPokemonDetailsList);
  }

  GetAllPokemonDetails():void
  {
    for (let i = 0; i < this.allPokemonList.length; i++)
    {
      this.pokemonService.GetPokemonDetailsByName(this.allPokemonList[i].name).subscribe((result : PokemonDetails) => 
      {
        this.allPokemonDetailsList.push(result);
      }
      );
    }
  }
}
