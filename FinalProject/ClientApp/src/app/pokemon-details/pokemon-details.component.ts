import { Component, OnInit } from '@angular/core';
import { PokemonDetailsService } from '../pokemon-details.service';
import { PokemonDetails } from '../PokemonDetails';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.css']
})
export class PokemonDetailsComponent implements OnInit {

  currentPokemon: PokemonDetails = {} as PokemonDetails;

  pokemonID:number = -1;

  constructor(private pokemonDetailsService:PokemonDetailsService) { }

  ngOnInit(): void 
  {

  }

  GetPokemonDetails(index: number) : void
  {
    this.pokemonDetailsService.GetPokemonDetails(index).subscribe((result: PokemonDetails) =>
    {
      this.currentPokemon = result;
      console.log(result)
    });
  }

}
