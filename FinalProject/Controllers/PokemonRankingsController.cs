using FinalProject.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FinalProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PokemonRankingsController : ControllerBase
    {
        private readonly PokemonDbContext _context;
        PokemonDAL pokeDAL = new PokemonDAL();



        public PokemonRankingsController(PokemonDbContext context)
        {
            _context = context;
        }
        //why cant we access the variable _context?
        //list<pokemonranking> pokemonrankingsall = _context.pokemonrankings.tolist();
        //list<pokemonranking> pokemonrankingsall = _context.pokemonrankings.tolist();
        //list<pokemonranking> pokemonrankingsall = _context.pokemonrankings.tolist();

        // GET: api/PokemonRankings
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PokemonRanking>>> GetPokemonRankings()
        {
            return await _context.PokemonRankings.ToListAsync();
        }


        //CHANGE TO USERID, but we can test first with just user
        //How to do this logic with a for loop and no linq?

        // GET: api/PokemonRankings/user
        [HttpGet("User/{id}")]
        public List<PokemonRanking> GetPokemonRankingsByUser(int id)
        {
            List<PokemonRanking> pokemonRankingsByUser = _context.PokemonRankings.Where(ranking => ranking.UserId == id).ToList();
            return pokemonRankingsByUser;
        }

        //GET: api/PokemonRankings/user/type
        [HttpGet("User/{userID}/Type/{type}")]
        public async Task<ActionResult<IEnumerable<PokemonRanking>>> GetPokemonRankingsByUser(int userID, string type)
        {
            List<PokemonRanking> pokemonRankingsByUser = _context.PokemonRankings.Where(ranking => ranking.UserId == userID).ToList();

            List<PokemonRanking> pokemonRankingsByType = new List<PokemonRanking>();


            for (int i = 0; i < pokemonRankingsByUser.Count; i++)
            {
                PokemonDetails pokeDetails = pokeDAL.GetPokemonDetails((int)pokemonRankingsByUser[i].PokemonApiId);

                if (pokeDetails.types.Length == 1)
                {
                    if (pokeDetails.types[0].type.name.ToUpper() == type.ToUpper())
                    {
                        //int pokeID = pokeDetails.id;
                        pokemonRankingsByType.Add(pokemonRankingsByUser[i]);
                        //pokemonRankingsByType = pokemonRankingsByUser.Where(ranking => ranking.PokemonApiId == pokeID).ToList();
                    }
                }

                else if (pokeDetails.types.Length == 2)
                {
                    if (pokeDetails.types[0].type.name.ToUpper() == type.ToUpper() || pokeDetails.types[1].type.name.ToUpper() == type.ToUpper())
                    {
                        //int pokeID = pokeDetails.id;
                        pokemonRankingsByType.Add(pokemonRankingsByUser[i]);
                        //pokemonRankingsByType = pokemonRankingsByUser.Where(ranking => ranking.PokemonApiId == pokeID).ToList();
                    }
                }
            }

            return pokemonRankingsByType;

            //pokemonRankingsByUser[i].PokemonApiId;

            //convert the pokemon id to the actual pokemon
        }

        //GET: api/PokemonRankings/User/userID/Generation/generationID
        [HttpGet("User/{userID}/Generation/{generationID}")]
        public async Task<ActionResult<IEnumerable<PokemonRanking>>> GetPokemonRankingsByGeneration(int userID, int generationID)
        {
            List<PokemonRanking> pokemonRankingsByUser = _context.PokemonRankings.Where(ranking => ranking.UserId == userID).ToList();

            List<PokemonRanking> pokemonRankingsByGeneration = new List<PokemonRanking>();


            for (int i = 0; i < pokemonRankingsByUser.Count; i++)
            {
                PokemonDetails pokeDetails = pokeDAL.GetPokemonDetails((int)pokemonRankingsByUser[i].PokemonApiId);

                if (pokeDetails.GetPokemonGenerationID((int)pokemonRankingsByUser[i].PokemonApiId) == generationID)
                {
                    pokemonRankingsByGeneration.Add(pokemonRankingsByUser[i]);
                }
            }

            return pokemonRankingsByGeneration;
        }

        // GET: api/PokemonRankings/5
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

        // PUT: api/PokemonRankings/5
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
        [HttpPost]
        public async Task<ActionResult<PokemonRanking>> PostPokemonRanking(PokemonRanking pokemonRanking)
        {
            _context.PokemonRankings.Add(pokemonRanking);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPokemonRanking", new { id = pokemonRanking.Id }, pokemonRanking);
        }

        // DELETE: api/PokemonRankings/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePokemonRanking(int id)
        {
            var pokemonRanking = await _context.PokemonRankings.FindAsync(id);
            if (pokemonRanking == null)
            {
                return NotFound();
            }

            _context.PokemonRankings.Remove(pokemonRanking);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PokemonRankingExists(int id)
        {
            return _context.PokemonRankings.Any(e => e.Id == id);
        }
    }
}
