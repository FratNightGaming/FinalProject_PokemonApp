import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { Console } from 'console';
import { PokemonDetails } from '../Models/PokemonDetails';
import { PokemonRanking } from '../Models/PokemonRanking';
import { PokemonDetailsService } from '../Services/pokemon-details.service';
import { PokemonRankingsService } from '../Services/pokemon-rankings.service';

@Component({
  selector: 'app-add-rank',
  templateUrl: './add-rank.component.html',
  styleUrls: ['./add-rank.component.css']
})
export class AddRankComponent implements OnInit {
  currentPokeDetails: PokemonDetails = {} as PokemonDetails;
  currentPokeRanking: PokemonRanking = {} as PokemonRanking;

  userId:number = 0;
  userRank:number = 0;
  pokemonApiid:number = 0;
  name:string="";
  sprite:string="";
  types:string ="";
  originalGame:string="";

  currentUser: SocialUser = {} as SocialUser;
  loggedIn:boolean = false;

  constructor(private pokemonRankingsService:PokemonRankingsService, private authService: SocialAuthService, private pokeDetailsService: PokemonDetailsService ) { }

  ngOnInit(): void 
  {
    this.authService.authState.subscribe((currentUser) => {
      this.currentUser = currentUser;
      this.loggedIn = (currentUser != null);
    });

  }
  
  AddRanking(userRank:number, name:string):void
  {
    this.pokeDetailsService.GetPokemonDetailsByName(name).subscribe((result) =>

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

}
