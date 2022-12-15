using FinalProject.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FinalProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PokemonRankingsController : ControllerBase
    {
        private readonly FinalProjectContext _context;
        PokemonDAL pokeDAL = new PokemonDAL();
        HelperMethods helperMethods = new HelperMethods();

        public List<PokemonRanking> AllPokemonRankingsList;
        public List<User> AllUsersList;
        public List<Pokemon> allPokemonList;
        public List<PokemonDetails> allPokemonDetails;

        public PokemonRankingsController(FinalProjectContext context)
        {
            _context = context;
            AllPokemonRankingsList = _context.PokemonRankings.ToList();
            AllUsersList = _context.Users.ToList();
            allPokemonList = pokeDAL.GetAllPokemon().ToList();
        }
        //why cant we access the variable _context?
        //list<pokemonranking> pokemonrankingsall = _context.pokemonrankings.tolist();
        //list<pokemonranking> pokemonrankingsall = _context.pokemonrankings.tolist();
        //list<pokemonranking> pokemonrankingsall = _context.pokemonrankings.tolist();

        // GET: api/PokemonRankings
        [HttpGet]
        public ActionResult<IEnumerable<PokemonRanking>> GetPokemonRankings()
        {
            return helperMethods.FilteredByRank(AllPokemonRankingsList);
        }


        //CHANGE TO USERID, but we can test first with just user
        //How to do this logic with a for loop and no linq?

        [HttpGet("User/{googleID}")]
        public List<PokemonRanking> GetPokemonRankingsByUser(string googleID)
        {
            int id = (int)AllUsersList.FirstOrDefault(user => user.GoogleId == googleID).Id;

            List<PokemonRanking> pokemonRankingsByUser = AllPokemonRankingsList.Where(ranking => ranking.UserId == id).ToList();

            pokemonRankingsByUser = pokemonRankingsByUser.OrderBy(rank => rank.UserRank).ToList();
            return pokemonRankingsByUser;
            //return helperMethods.FilteredByRank(pokemonRankingsByUser);
        }

        [HttpGet("User/{googleID}/Type/{type}")]
        public async Task<ActionResult<IEnumerable<PokemonRanking>>> GetPokemonRankingsByUser(string googleID, string type)
        {
            int id = (int)AllUsersList.FirstOrDefault(user => user.GoogleId == googleID).Id;

            List<PokemonRanking> pokemonRankingsByUser = _context.PokemonRankings.Where(ranking => ranking.UserId == id).ToList();

            List<PokemonRanking> pokemonRankingsByType = helperMethods.FilteredByRank(pokemonRankingsByUser, type, -1);


            /* for (int i = 0; i < pokemonRankingsByUser.Count; i++)
             {
                 PokemonDetails pokeDetails = pokeDAL.GetPokemonDetails((int)pokemonRankingsByUser[i].PokemonApiid);

                 if (pokeDetails.types.Length == 1)
                 {
                     if (pokeDetails.types[0].type.name.ToUpper() == type.ToUpper())
                     {
                         pokemonRankingsByType.Add(pokemonRankingsByUser[i]);
                     }
                 }

                 else if (pokeDetails.types.Length == 2)
                 {
                     if (pokeDetails.types[0].type.name.ToUpper() == type.ToUpper() || pokeDetails.types[1].type.name.ToUpper() == type.ToUpper())
                     {
                         pokemonRankingsByType.Add(pokemonRankingsByUser[i]);
                     }
                 }
             }*/

            return pokemonRankingsByType;
        }

        [HttpGet("User/{googleID}/Generation/{generationID}")]
        public async Task<ActionResult<IEnumerable<PokemonRanking>>> GetPokemonRankingsByGeneration(string googleID, int generationID)
        {
            int id = (int)AllUsersList.FirstOrDefault(user => user.GoogleId == googleID).Id;

            List<PokemonRanking> pokemonRankingsByUser = _context.PokemonRankings.Where(ranking => ranking.UserId == id).ToList();

            List<PokemonRanking> pokemonRankingsByGeneration = helperMethods.FilteredByRank(pokemonRankingsByUser, "", generationID);


            /*for (int i = 0; i < pokemonRankingsByUser.Count; i++)
            {
                PokemonDetails pokeDetails = pokeDAL.GetPokemonDetails((int)pokemonRankingsByUser[i].PokemonApiid);

                if (helperMethods.GetPokemonGenerationID((int)pokemonRankingsByUser[i].PokemonApiid) == generationID)
                {
                    pokemonRankingsByGeneration.Add(pokemonRankingsByUser[i]);
                }
            }

            pokemonRankingsByGeneration = helperMethods.FilteredByRank(pokemonRankingsByGeneration);*/

            return pokemonRankingsByGeneration;
        }

        [HttpGet("User/{googleID}/Generation/{genFilter}/Type/{typeFilter}")]
        public async Task<ActionResult<IEnumerable<PokemonRanking>>> GetPokemonRankingsByBoth(string googleID, int genFilter, string typeFilter)
        {
            int id = (int)AllUsersList.FirstOrDefault(user => user.GoogleId == googleID).Id;

            List<PokemonRanking> pokemonRankingsByUser = _context.PokemonRankings.Where(ranking => ranking.UserId == id).ToList();

            List<PokemonRanking> pokeRanksByBoth = helperMethods.FilteredByRank(pokemonRankingsByUser, typeFilter, genFilter);

            return pokeRanksByBoth;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<PokemonRanking>> GetPokemonRanking(int id)
        {
            var pokemonRanking = await _context.PokemonRankings.FindAsync(id);

            if (pokemonRanking == null)
            {
                return NotFound();
            }

            return pokemonRanking;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutPokemonRanking(int id, PokemonRanking pokemonRanking)
        {
            if (id != pokemonRanking.Id)
            {
                return BadRequest();
            }

            _context.Entry(pokemonRanking).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PokemonRankingExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/PokemonRankings
        [HttpPost("{googleID}")]
        //I want to change first parameter, PokemonRanking pokemonRanking, to be an int "rank" instead
        public List<PokemonRanking> PostPokemonRanking(PokemonRanking pokemonRanking, string googleID)
        {
            //List<PokemonRanking> newPokemonRankings = AllPokemonRankingsList;
            pokemonRanking.Id = null;

            int id = (int)AllUsersList.FirstOrDefault(user => user.GoogleId == googleID).Id;

            pokemonRanking.UserId = id;

            List<PokemonRanking> ranksByUser = (List<PokemonRanking>)AllPokemonRankingsList.Where(rank => rank.UserId == id).ToList();


            for (int i = 0; i < ranksByUser.Count; i++)
            {
                if (ranksByUser[i].UserRank == pokemonRanking.UserRank)
                {
                    for (int j = (int)pokemonRanking.UserRank; i < ranksByUser.Count; i++)
                    {
                            //AllPokemonRankingsList[i].UserRank += 1;
                            _context.PokemonRankings.Find(ranksByUser[j].Id).UserRank += 1;
                    }
                }
                else
                {
                    continue;
                }
            }

            _context.PokemonRankings.Add(pokemonRanking);
            _context.SaveChanges();
            return _context.PokemonRankings.ToList();
        }

        // DELETE: api/PokemonRankings/5
        [HttpDelete("{name}/{googleID}")]
        public List<PokemonRanking> DeletePokemonRanking(string name, string googleID)
        {
            //List<PokemonRanking> newPokemonRankings = AllPokemonRankingsList;
            int id1 = (int)AllUsersList.FirstOrDefault(user => user.GoogleId == googleID).Id;

            List<PokemonRanking> ranksByUser = (List<PokemonRanking>)AllPokemonRankingsList.Where(rank => rank.UserId == id1).ToList();

            PokemonRanking pokemonRanking = new PokemonRanking();

            pokemonRanking = ranksByUser.FirstOrDefault(rank => rank.Name == name);

            for (int i = 0; i < ranksByUser.Count; i++)
            {

                    if (ranksByUser[i].UserRank >= pokemonRanking.UserRank)
                    {
                        //AllPokemonRankingsList[i].UserRank += 1;
                        _context.PokemonRankings.Find(ranksByUser[i].Id).UserRank -= 1;
                    }
                
            }

            _context.PokemonRankings.Remove(pokemonRanking);
            _context.SaveChanges();
            List<PokemonRanking> pokemonRankingsByUser = _context.PokemonRankings.Where(ranking => ranking.UserId == id1).ToList();
            pokemonRankingsByUser = helperMethods.FilteredByRank(pokemonRankingsByUser);
            return pokemonRankingsByUser;
        }

        private bool PokemonRankingExists(int id)
        {
            return _context.PokemonRankings.Any(e => e.Id == id);
        }

        [HttpGet("CommunityRankings")]
        public List<CommunityRanking> GetCommunityRankings()
        {           
            List<int> gen1IDs = new List<int>();

            for(int i = 1; i <=151; i++)
            {
                gen1IDs.Add(i);
            }

            return helperMethods.FindCommunityRanks(AllPokemonRankingsList, gen1IDs);
        }
    }

}

            