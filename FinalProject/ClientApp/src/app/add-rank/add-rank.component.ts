import { Component, OnInit } from '@angular/core';
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

  constructor(private rankingsDB:PokemonRankingsService) { }

  AddRanking(userId:number, userRank:number, pokemonApiid:number, name:string):void{
    this.rankingsDB.AddRanking(userId, userRank, pokemonApiid, name);
  }

  ngOnInit(): void {
  }

}
