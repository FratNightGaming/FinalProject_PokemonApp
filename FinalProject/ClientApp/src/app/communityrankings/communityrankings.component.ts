import { Component, Input, OnInit } from '@angular/core';
import { PokemonRankingsService } from '../Services/pokemon-rankings.service';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { CommunityRanking } from '../Models/CommunityRanking';
import { PokemonDetailsService } from '../Services/pokemon-details.service';
import { PokemonDetails } from '../Models/PokemonDetails';
import { PokemonRankingsComponent } from '../pokemon-rankings/pokemon-rankings.component';
import { PokemonRanking } from '../Models/PokemonRanking';

@Component({
  selector: 'app-communityrankings',
  templateUrl: './communityrankings.component.html',
  styleUrls: ['./communityrankings.component.css']
})
export class CommunityRankingsComponent implements OnInit {

  constructor(private authService:SocialAuthService, private pokemonRankingsService:PokemonRankingsService, private pokeDetailsService:PokemonDetailsService) { }

  @Input() allPokemonDetailsList: PokemonDetails[] = []; 

  typeFilter:string = "";

  commRankDetails:PokemonDetails = {} as PokemonDetails;
  commRankDetailsList:PokemonDetails[] = [];
  communityRankings:CommunityRanking[] = [];
  currentPokeDetails: PokemonDetails = {} as PokemonDetails;
  
  currentCommunityPokemonRankings: PokemonRanking[] = [];
  pokemonRankingsByType: PokemonRanking[] = [];
  pokemonRankingsByGeneration: PokemonRanking[] = [];
  
  currentUser: SocialUser = {} as SocialUser;
  loggedIn: boolean = false;

  ModalTitle:string = "";
  userRank:number = 0;
  newRank:number = 0;

  typeFilter: string = "";
  generationFilter: number = 0;

  ngOnInit(): void 
  {
    this.authService.authState.subscribe((currentUser) => {
      this.currentUser = currentUser;
      this.loggedIn = (currentUser != null);
    });
    this.GetCommunityRankings();
  }

  GetCommunityRankings():void
  {
    this.pokemonRankingsService.GetCommunityRankings().subscribe((results) =>
    {
      this.communityRankings = results;
      console.log("Community Rankings:")
      console.log(this.communityRankings);
    })
  }

  GetCommunityRankingDetails(name:string):PokemonDetails
  {
    this.pokeDetailsService.GetPokemonDetailsByName(name).subscribe((result) =>
    {
      this.commRankDetails = result;
    })
    return this.commRankDetails;
  }

  GetPokemonRankingsByType(type:string):void
  {
    if (this.loggedIn && type !== null)
    {
      this.pokemonRankingsService.GetPokemonRankingsByType(this.currentUser.id, type).subscribe((results : PokemonRanking[]) =>
      {
        this.pokemonRankingsByType = results;
        this.currentCommunityPokemonRankings = this.pokemonRankingsByType;
        console.log("Pokemon Rankings by Type:");
        console.log(this.currentCommunityPokemonRankings);
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
        this.currentCommunityPokemonRankings = this.pokemonRankingsByGeneration;
        console.log("Pokemon Rankings by Generation: ");
        console.log(this.currentCommunityPokemonRankings);
      }
      )
    }
  }

  // GetAllCommDetails(commRankDetails:CommunityRanking[]):PokemonDetails[]
  // {
  //   for(let i = 0; i < commRankDetails.length; i++)
  //   {
  //     this.GetCommDetails(commRankDetails[i].name);
  //     this.commRankDetailsList.push(commRankDetails[i]);
  //   }

  CloseClick():void
  {

  }

  EditRanking(newRank:number, name:string):void
  {
    this.pokemonRankingsService.RemovePokemonRanking(name, this.currentUser.id);
    this.pokeDetailsService.GetPokemonDetailsByName(name).subscribe((result) =>

    {
      this.currentPokeDetails = result;

      let types:string = this.currentPokeDetails.types.length > 1?  `${this.currentPokeDetails.types[0].type.name}, ${this.currentPokeDetails.types[1].type.name}`:this.currentPokeDetails.types[0].type.name;
      
      let newPokeRank : PokemonRanking = 
      {
        id: 0, userId: 0, userRank:newRank, sprite:this.currentPokeDetails.sprites.front_default, 
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

  successAlert():void
  {
    alert("Successfully updated pokemon rank!");    
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


