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
        [HttpGet]
        /*public Pokemon GetPokemon(string name)
        {
            //return new string[] { "value1", "value2" };
        }*/

        // GET api/<PokemonController>/5
        [HttpGet("{name}")]
        public Pokemon GetPokemonByName(string name)
        {
            Pokemon pokemon = pokeDAL.GetPokemon(name);
            Console.WriteLine(pokemon.name);
            return pokemon;
        }

        // POST api/<PokemonController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<PokemonController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<PokemonController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
