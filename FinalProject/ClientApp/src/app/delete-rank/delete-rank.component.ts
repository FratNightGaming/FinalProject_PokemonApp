import { Component, OnInit } from '@angular/core';
import { PokemonRankingsService } from '../Services/pokemon-rankings.service';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { PokemonRanking } from '../Models/PokemonRanking';
import { PokemonDetailsService } from '../Services/pokemon-details.service';
import { PokemonDetails } from '../Models/PokemonDetails';
import { UserService } from '../Services/user.service';
import { User } from '../Models/user';

@Component({
  selector: 'app-delete-rank',
  templateUrl: './delete-rank.component.html',
  styleUrls: ['./delete-rank.component.css']
})
export class DeleteRankComponent implements OnInit {
  user: SocialUser = {} as SocialUser;
  userId:number = 2;
  loggedIn:boolean = false;
  name:string = "";
  pokeID:number = -1;
  currentPokemon: PokemonDetails = {} as PokemonDetails;
  userRankings:PokemonRanking[] = [];
  userRank:number = -1;

  constructor(private pokemonRankingsService:PokemonRankingsService, 
    private authService: SocialAuthService,
    private pokemonDetailsService: PokemonDetailsService,
    private userService:UserService) { }

  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
    });
  }

  RemovePokemonRanking(userId:number, userRank:number, name:string, pokemonApiid:number, types:string,originalGame:string, sprite:string):void
  {
    this.FindPokeInfo(name);
    let removedPoke:PokemonRanking = {id: 0, userId:userId, userRank:userRank, name:name, pokemonApiid:pokemonApiid, types:types, originalGame:originalGame, sprite:sprite};
    this.pokemonRankingsService.RemovePokemonRanking(removedPoke, this.user.id);
  }

  FindPokeInfo(name:string):void
  {
    this.pokemonDetailsService.GetPokemonDetailsByName(name).subscribe((result: PokemonDetails) =>
    {
      this.currentPokemon = result;
      console.log(result);
      console.log(this.currentPokemon.sprites.front_default);
      console.log(result.id);
      this.pokeID = result.id;
    });
    // this.pokemonRankingsService.GetPokemonRankingsByUser(this.user.id).subscribe((results:PokemonRanking[]) =>
    // {
    //   console.log(results);
    //   this.userRankings = results;
    // });
  }

  FindUserInfo(googleID: string):void
  {
    this.userService.GetCurrentUserByGoogleID(googleID).subscribe((result:User) => 
    {
      console.log(result.googleID);
    })
  }

}
