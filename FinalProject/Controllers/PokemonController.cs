using FinalProject.Models;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace FinalProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PokemonController : ControllerBase
    {
        PokemonDAL pokeDAL = new PokemonDAL();

        // GET: api/<PokemonController>
        [HttpGet()]
        public Pokemon [] GetAllPokemon()
        {
            Pokemon [] pokemon = pokeDAL.GetAllPokemon();
            return pokemon;
        }

        // GET api/<PokemonController>/5
        [HttpGet("{id}")]
        public PokemonDetails GetPokemonByID(int id)
        {
            PokemonDetails pokemonDetails = pokeDAL.GetPokemonDetails(id);
            return pokemonDetails;
        }

        // GET api/Pokemon/Name/<pikachu>
        [HttpGet("Name/{name}")]
        public PokemonDetails GetPokemonByName(string name)
        {
            PokemonDetails details = pokeDAL.GetPokemonDetailsByName(name);
            return details;
        }


        
    }
}
