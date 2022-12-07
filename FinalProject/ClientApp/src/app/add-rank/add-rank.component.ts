import { Component, OnInit } from '@angular/core';
import { Console } from 'console';
import { PokemonRanking } from '../Models/PokemonRanking';
import { PokemonRankingsService } from '../Services/pokemon-rankings.service';

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

  constructor(private pokemonRankingsService:PokemonRankingsService) { }

  ngOnInit(): void 
  {

  }
  
  AddRanking(userId:number, userRank:number, pokemonApiid:number, name:string):void
  {
    this.pokemonRankingsService.AddRanking(userId, userRank, pokemonApiid, name).subscribe((result:PokemonRanking)=>
    {
      console.log(result);
    });
  }
}
