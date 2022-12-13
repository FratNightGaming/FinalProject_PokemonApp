using RestSharp;

namespace FinalProject.Models
{
    public class PokemonDAL
    {

        public Pokemon[] GetAllPokemon()
        {
            RestClient client = new RestClient($"https://pokeapi.co/api/v2/pokemon?limit=151");
            RestRequest request = new RestRequest();
            var response = client.GetAsync<Results>(request);
            Results pokemonResults = response.Result;
            Pokemon[] pokemon = pokemonResults.results;

            return pokemon;
        }
        public PokemonDetails GetPokemonDetails(int id)
        {
            RestClient client = new RestClient($"https://pokeapi.co/api/v2/pokemon/{id}");
            RestRequest request = new RestRequest();
            var response = client.GetAsync<PokemonDetails>(request);
            PokemonDetails pokemon = response.Result;

            return pokemon;
        }

        public PokemonDetails GetPokemonDetailsByName(string name)
        {
            RestClient client = new RestClient($"https://pokeapi.co/api/v2/pokemon/{name}");
            RestRequest request = new RestRequest();
            var response = client.GetAsync<PokemonDetails>(request);
            PokemonDetails pokemon = response.Result;

            return pokemon;
        }
    }
}
