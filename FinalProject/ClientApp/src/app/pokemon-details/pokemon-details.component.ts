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
  pokemonGenerationID: number = 0;

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

  GetPokemonGenerationID(id: number): number
  {
    if (id > 0 && id <= 151)
    {
      this.pokemonGenerationID = 1;
    }

    else if (id > 151 && id <= 251)
    {
      this.pokemonGenerationID = 2;
    }

    else if (id > 251 && id <= 386)
    {
      this.pokemonGenerationID = 3;
    }

    else if (id > 386 && id <= 493)
    {
      this.pokemonGenerationID = 4;
    }

    else if (id > 493 && id <= 649)
    {
      this.pokemonGenerationID = 5;
    }

    else if (id > 649 && id <= 721)
    {
      this.pokemonGenerationID = 6;
    }

    else if (id > 721 && id <= 809)
    {
      this.pokemonGenerationID = 7;
    }

    else if (id > 809 && id <= 905)
    {
      this.pokemonGenerationID = 8;
    }

    else
    {
      this.pokemonGenerationID = 9;
    }
    
    return this.pokemonGenerationID;
  }

}
