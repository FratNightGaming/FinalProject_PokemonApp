namespace FinalProject.Models
{
    public class HelperMethods
    {
        PokemonDAL pokeDAL = new PokemonDAL();
        public int GetPokemonGenerationID(int id)
        {
            if (id > 0 && id <= 151)
            {
                return 1;
            }

            else if (id > 151 && id <= 251)
            {
                return 2;
            }

            else if (id > 251 && id <= 386)
            {
                return 3;
            }

            else if (id > 386 && id <= 493)
            {
                return 4;
            }

            else if (id > 493 && id <= 649)
            {
                return 5;
            }

            else if (id > 649 && id <= 721)
            {
                return 6;
            }

            else if (id > 721 && id <= 809)
            {
                return 7;
            }

            else if (id > 809 && id <= 905)
            {
                return 8;
            }

            else
            {
                return 9;
            }
        }

        public List<PokemonRanking> FilteredByRank(List<PokemonRanking> allRankings, string typeFilter="", int genFilter=-1)
        {
            List<PokemonRanking> filteredRankings = new List<PokemonRanking>();

            if(typeFilter != "" && genFilter==-1)
            {
                for (int i = 0; i < allRankings.Count; i++)
                {
                    PokemonDetails pokeDetails = pokeDAL.GetPokemonDetails((int)allRankings[i].PokemonApiid);

                    if (pokeDetails.types.Length == 1)
                    {
                        if (pokeDetails.types[0].type.name.ToUpper() == typeFilter.ToUpper())
                        {
                            filteredRankings.Add(allRankings[i]);
                        }
                    }

                    else if (pokeDetails.types.Length == 2)
                    {
                        if (pokeDetails.types[0].type.name.ToUpper() == typeFilter.ToUpper() || pokeDetails.types[1].type.name.ToUpper() == typeFilter.ToUpper())
                        {
                            filteredRankings.Add(allRankings[i]);
                        }
                    }
                }
                return filteredRankings;
            }
            else if (typeFilter != "" && genFilter != -1)
            {

            }
            else if(genFilter != -1 && typeFilter == "")
            {

            }
            
            return allRankings.OrderBy(rank => rank.UserRank).ToList();
            //return pokemonRankings;
        }
    }
}
