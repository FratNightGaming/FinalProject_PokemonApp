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

  // allPokemonRankings: PokemonRanking[] = [];
  pokemonRankingsByCurrentUser: PokemonRanking[] = [];
  pokemonRankingsByType: PokemonRanking[] = [];
  pokemonRankingsByGeneration: PokemonRanking[] = [];
  pokemonRankingsByBoth: PokemonRanking[] = [];

  //list of 151 pokemon details
  allPokemonDetailsList: PokemonDetails [] = [];
  //list of 151 pokemon names (and urls)
  allPokemonNames: Pokemon[] = [];

  //current rankings represents the current un/filtered list
  currentPokemonRankings: PokemonRanking[] = [];
  
  //filteredPokemonDetails changes after each filter
  filteredPokemonDetails: PokemonDetails[] = [];
  unrankedPokemonDetails: PokemonDetails[] = [];
  
  currentUser: SocialUser = {} as SocialUser;
  loggedIn: boolean = false;

  typeFilter: string = "";
  generationFilter: number = 0;

  pokemonName:string ="";

  user : User = {} as User;

  //will be used in NGMODULE to get rank from user
  userRank:number = 0;
  currentPokemonDetails: PokemonDetails = {} as PokemonDetails;

  displayDetails: boolean = false;

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
      this.GetAllPokemon();
      //we need to have an array that contains ALL pokemon upon initialization
      //getAllPokemon calls getAllPokemonDetails, which will then get all details and put it in a list
      //getAllPokemonDetails calls GetRankingsByCurrentUser, which gets the rankings by user and sets 
      //currentuserRankings to rankingsbyUser
      //this.GetUnrankedPokemon();
    });
  }
  
  GetAllPokemon():void
  {
    this.pokemonService.GetAllPokemon().subscribe((results : Pokemon[]) => 
    {
      this.allPokemonNames = results;
      console.log("ALL POKEMON Length:");
      console.log(this.allPokemonNames.length);
      this.GetAllPokemonDetails(0, 150); 
      //this.GetPokemonRankingsByUser();//the user MUST be logged in before entering this component...
    }); 
  }

  //sets all pokemondetails for all 151 pokemon
  GetAllPokemonDetails(i: number, totalPokemon: number):void
  {
    // for (let i = 0; i < this.allPokemonNames.length; i++)
    // {

      this.pokemonService.GetPokemonDetailsByName(this.allPokemonNames[i].name).subscribe((result : PokemonDetails) => 
      {
        this.allPokemonDetailsList.push(result);
        if (i < totalPokemon)
        {
          this.GetAllPokemonDetails(i + 1, totalPokemon);
        }

        else
        {
          console.log("All Pokemon Details List Length:");
          console.log(this.allPokemonDetailsList.length);
          this.GetPokemonRankingsByUser();
        }
        
      }
      );
    // }
  }
  
  
  // GetAllPokemonRankings():void
  // {
  //   this.pokemonRankingsService.GetPokemonRankings().subscribe((results: PokemonRanking[]) =>
  //   {
  //     console.log(results);
  //     this.pokemonRankings = results;

  //     for (let i = 0; i < this.pokemonRankings.length; i++)
  //     {
  //       this.pokemonService.GetPokemonDetails(this.pokemonRankings[i].pokemonApiid).subscribe((result:PokemonDetails) =>
  //       {
  //         this.filteredPokemonDetails.push(result); 
  //       });
  //     }
  //     //let newid : number = Number(this._Activatedroute.snapshot.paramMap.get("id"));
  //   });
  // }
  
  GetPokemonRankingsByUser():void
  {
    this.filteredPokemonDetails.length = 0;//empty the array before pushing many PokeDetails to it
    
    if (this.loggedIn)
    {
      this.pokemonRankingsService.GetPokemonRankingsByUser(this.currentUser.id).subscribe((results : PokemonRanking[]) =>
      {
        this.pokemonRankingsByCurrentUser = results;

        for (let i = 0; i < this.pokemonRankingsByCurrentUser.length; i++)
        {
          this.pokemonService.GetPokemonDetailsByID(this.pokemonRankingsByCurrentUser[i].pokemonApiid).subscribe((result:PokemonDetails) =>
          {
            this.filteredPokemonDetails.push(result);
          });
        }
        console.log("Pokemon Details List SHOULD BE FILLED");
        console.log(this.filteredPokemonDetails);
        //after each filter, set the currentPokemonRankings to result
        this.currentPokemonRankings = this.pokemonRankingsByCurrentUser;       
        this.GetUnrankedPokemon();
      })
    }
  }

  GetUnrankedPokemon(): void
  {
    this.unrankedPokemonDetails.length = 0;//clear out list
    console.log("Unranked Pokemon Details List Should be 0: ");
    console.log(this.unrankedPokemonDetails);

    this.filteredPokemonDetails.length = 0;//clear out list
    console.log("Pokemon Details List SHOULD be 0 below");
    console.log(this.filteredPokemonDetails);

    //get all user's pokemon, and add them to pokemondetails list
    for (let i = 0; i < this.allPokemonNames.length; i++)
    {
      this.pokemonService.GetPokemonDetailsByID(this.pokemonRankingsByCurrentUser[i].pokemonApiid).subscribe((result:PokemonDetails)=>
      {
        this.filteredPokemonDetails.push(result);
      })
    }
    
    //go through all 150 pokemon. If one of the 150 pokemon is NOT in user's list, we add it to the unranked list
    for (let i = 0; i < this.allPokemonNames.length; i++)
    {
      if (!this.filteredPokemonDetails.includes(this.allPokemonDetailsList[i]))
      {
        this.unrankedPokemonDetails.push(this.allPokemonDetailsList[i]);
      }
    }
    
    console.log("Unranked Pokemon List Should be filled: ");
    console.log(this.unrankedPokemonDetails);
  }

  GetPokemonRankingsByType(type:string):void
  {
    if (this.loggedIn)
    {
      this.pokemonRankingsService.GetPokemonRankingsByType(this.currentUser.id, type).subscribe((results : PokemonRanking[]) =>
      {
        this.pokemonRankingsByType = results;

        this.filteredPokemonDetails.length = 0;//empty the array before pushing many PokeDetails to it
  
        for (let i = 0; i < this.pokemonRankingsByType.length; i++)
        {
          this.pokemonService.GetPokemonDetailsByID(this.pokemonRankingsByType[i].pokemonApiid).subscribe((result:PokemonDetails) =>
          {
            this.filteredPokemonDetails.push(result);
          });

          this.currentPokemonRankings = this.pokemonRankingsByType;
        }
        console.log("Pokemon Rankings by Type:");
        console.log(this.currentPokemonRankings);
      })
    }
  }

  GetPokemonRankingsByGeneration(generationID: number):void
  {
    this.pokemonRankingsService.GetPokemonRankingsByGeneration(this.currentUser.id, generationID).subscribe((results : PokemonRanking[]) =>
    {
      this.filteredPokemonDetails.length = 0;//empty the array before pushing many PokeDetails to it
      
      for (let i = 0; i < this.pokemonRankingsByGeneration.length; i++)
      {
        this.pokemonService.GetPokemonDetailsByID(this.pokemonRankingsByGeneration[i].pokemonApiid).subscribe((result:PokemonDetails) =>
        {
          this.filteredPokemonDetails.push(result);
        });
      }

      this.currentPokemonRankings = this.pokemonRankingsByGeneration;
      console.log("Pokemon Rankings by Generation: ");
      console.log(this.currentPokemonRankings);
    }
    )
  }

  GetPokemonRankingsByBoth(typeFilter:string, genFilter:number):void
  {
    this.pokemonRankingsService.GetPokemonRankingsByBoth(this.currentUser.id, typeFilter, genFilter).subscribe((results: PokemonRanking[])=>
    {
      console.log(results);
      this.pokemonRankingsByBoth = results;
      this.filteredPokemonDetails.length = 0;//empty the array before pushing many PokeDetails to it

      for(let i = 0; i < results.length; i++)
      {
        this.pokemonService.GetPokemonDetailsByID(this.pokemonRankingsByBoth[i].pokemonApiid).subscribe((result:PokemonDetails)=>
        {
          this.filteredPokemonDetails.push(result);
        })
      }

      this.currentPokemonRankings = results;
      console.log(`Current rankings by Both: ${this.currentPokemonRankings}`);
    })
  }

  

  AddPokemonRanking(): void
  {
    this.pokemonRankingsService.AddRanking(0, this.userRank, this.currentPokemonDetails.id,this.currentUser.id ).subscribe

    //pokemonrankingsbycurrentuser = results; //update rankings after adding
  }

  // DeletePokemonRanking(): void
  // {
  //   this.pokemonRankingsService.DeleteRanking(0, this.userRank, this.currentPokemonDetails.id,this.currentUser.id ).subscribe

  //   //pokemonrankingsbycurrentuser = results; //update rankings after adding
  // }

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
