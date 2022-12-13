using Microsoft.EntityFrameworkCore;

namespace FinalProject.Models
{
    public class HelperMethods
    {
        PokemonDAL pokeDAL = new PokemonDAL();
        FinalProjectContext pokeContext = new FinalProjectContext();
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

            if (typeFilter != "" && genFilter == -1)
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
                return filteredRankings.OrderBy(rank => rank.UserRank).ToList();
            }
            else if (typeFilter != "" && genFilter != -1)
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
                    for(int i = 0; i < filteredRankings.Count; i++)
                    {
                        int genID = GetPokemonGenerationID((int)filteredRankings[i].PokemonApiid);
                        if(genID != genFilter) 
                        { 
                            filteredRankings.RemoveAt(i);
                        }
                    }

                return filteredRankings;
            }

            else if (genFilter != -1 && typeFilter == "")
            {
                for(int i = 0; i < allRankings.Count; i++)
                {
                    int genID = GetPokemonGenerationID((int)allRankings[i].PokemonApiid);
                    if(genID == genFilter)
                    {
                        filteredRankings.Add(allRankings[i]);
                    }
                }
                return filteredRankings.OrderBy(rank => rank.UserRank).ToList();
            }
            
            return allRankings.OrderBy(rank => rank.UserRank).ToList();
            //return pokemonRankings;
        }

        public List<CommunityRanking> FindCommunityRanks(List<PokemonRanking> allRanks, List<PokemonDetails> gen1s)
        {
            List<CommunityRanking> commRanks = new List<CommunityRanking>();

            foreach (PokemonDetails p in gen1s)
            {
                List<PokemonRanking> preAdd = allRanks.Where(r => r.PokemonApiid == p.id).ToList();

                float commRank = 0;

                for (int i = 0; i < preAdd.Count; i++)
                {
                    commRank += (float)preAdd[i].UserRank;
                }

                commRank /= pokeContext.Users.ToList().Count;

                //commRank /= (float)preAdd.Count;

                if (commRank != 0)
                {
                    commRanks.Add(new CommunityRanking { name = p.name, rank = commRank });
                }
            }

            return commRanks.OrderBy(cr => cr.rank).ToList();
        }
    }
}
