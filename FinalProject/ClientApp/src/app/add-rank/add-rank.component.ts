import { Component, OnInit } from '@angular/core';
import { Console } from 'console';
import { PokemonRanking } from '../Models/PokemonRanking';
import { PokemonRankingsService } from '../Services/pokemon-rankings.service';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';


@Component({
  selector: 'app-add-rank',
  templateUrl: './add-rank.component.html',
  styleUrls: ['./add-rank.component.css']
})
export class AddRankComponent implements OnInit {
  userId:number=2;
  userRank:number = 0;
  pokemonApiid:number = 0;
  name:string="";
  user: SocialUser = {} as SocialUser;
  loggedIn:boolean = false;

  

  constructor(private pokemonRankingsService:PokemonRankingsService, private authService: SocialAuthService) { }

  ngOnInit(): void 
  {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
    });

  }
  
  AddRanking(userId:number, userRank:number, pokemonApiid:number, name:string):void
  {
    this.pokemonRankingsService.AddRanking(userId, userRank, pokemonApiid, name, this.user.id).subscribe((result:PokemonRanking[])=>
    {
      console.log(result);
    });
  }
}
