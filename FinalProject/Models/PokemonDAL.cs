using RestSharp;

namespace FinalProject.Models
{
    public class PokemonDAL
    {
        public Pokemon GetPokemon(string name)
        {
            RestClient client = new RestClient($"https://pokeapi.co/api/v2/pokemon/{name}");
            RestRequest request = new RestRequest();
            var response = client.GetAsync<Pokemon>(request);
            Pokemon pokemon = response.Result;

            return pokemon;
        }
        
        

    }
}
