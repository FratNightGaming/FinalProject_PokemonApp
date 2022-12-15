import { Component, Input, OnInit } from '@angular/core';
import { PokemonRankingsService } from '../Services/pokemon-rankings.service';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { CommunityRanking } from '../Models/CommunityRanking';
import { PokemonDetailsService } from '../Services/pokemon-details.service';
import { PokemonDetails } from '../Models/PokemonDetails';
import { PokemonRankingsComponent } from '../pokemon-rankings/pokemon-rankings.component';

@Component({
  selector: 'app-communityrankings',
  templateUrl: './communityrankings.component.html',
  styleUrls: ['./communityrankings.component.css']
})
export class CommunityRankingsComponent implements OnInit {

  constructor(private authService:SocialAuthService, private pokemonRankingsService:PokemonRankingsService, private pokeDetailsService:PokemonDetailsService) { }

  @Input() allPokemonDetailsList: PokemonDetails[] = []; 



  commRankDetails:PokemonDetails = {} as PokemonDetails;
  commRankDetailsList:PokemonDetails[] = [];
  communityRankings:CommunityRanking[] = [];
  
  currentUser: SocialUser = {} as SocialUser;
  loggedIn: boolean = false;

  ModalTitle:string = "";
  userRank:number = 0;

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

  GetCommunityRankinDetails(name:string):PokemonDetails
  {
    this.pokeDetailsService.GetPokemonDetailsByName(name).subscribe((result) =>
    {
      this.commRankDetails = result;
    })
    return this.commRankDetails;
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

  EditRankings():void
  {

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


