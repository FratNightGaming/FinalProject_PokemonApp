import { Component, OnInit } from '@angular/core';
import { PokemonRankingsService } from '../Services/pokemon-rankings.service';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { CommunityRanking } from '../Models/CommunityRanking';
import { PokemonDetailsService } from '../Services/pokemon-details.service';
import { PokemonDetails } from '../Models/PokemonDetails';

@Component({
  selector: 'app-communityrankings',
  templateUrl: './communityrankings.component.html',
  styleUrls: ['./communityrankings.component.css']
})
export class CommunityRankingsComponent implements OnInit {

  constructor(private pokemonRankingsService:PokemonRankingsService, private authService:SocialAuthService, private pokeDetailsService:PokemonDetailsService) { }
  
  commRankDetails:PokemonDetails = {} as PokemonDetails;
  commRankDetailsList:PokemonDetails[] = [];
  communityRankings:CommunityRanking[] = [];
  user: SocialUser = {} as SocialUser;
  loggedIn: boolean = false;

  ngOnInit(): void 
  {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
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

  GetCommDetails(name:string):PokemonDetails{
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

  

  }


