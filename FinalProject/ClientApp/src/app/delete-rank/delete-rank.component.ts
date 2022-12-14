import { Component, OnInit } from '@angular/core';
import { PokemonRankingsService } from '../Services/pokemon-rankings.service';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { PokemonRanking } from '../Models/PokemonRanking';
import { PokemonDetailsService } from '../Services/pokemon-details.service';
import { PokemonDetails } from '../Models/PokemonDetails';

@Component({
  selector: 'app-delete-rank',
  templateUrl: './delete-rank.component.html',
  styleUrls: ['./delete-rank.component.css']
})
export class DeleteRankComponent implements OnInit {

  currentUser: SocialUser = {} as SocialUser;
  loggedIn:boolean = false;

  userId:number = 0;
  name:string = "";
  pokeID:number = -1;
  currentPokemon: PokemonDetails = {} as PokemonDetails;
  userRankings:PokemonRanking[] = [];
  userRank:number = -1;

  constructor(private pokemonRankingsService:PokemonRankingsService, private authService: SocialAuthService, private pokemonDetailsService: PokemonDetailsService) { }

  ngOnInit(): void {
    this.authService.authState.subscribe((currentUser) => {
      this.currentUser = currentUser;
      this.loggedIn = (currentUser != null);
    });
  }

  DeletePokemonRanking(userRank:number, name:string, pokemonApiid:number, types:string, originalGame:string, sprite:string): void
  {
    let deletedPoke:PokemonRanking = 
    {
      id: 0, userId: 0, userRank: userRank, name: name, pokemonApiid: pokemonApiid, types: types, originalGame: originalGame, sprite: sprite
    };
    
    this.pokemonRankingsService.RemovePokemonRanking(deletedPoke, this.currentUser.id);
  }

}
