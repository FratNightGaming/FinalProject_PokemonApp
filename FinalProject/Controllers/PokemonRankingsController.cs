using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FinalProject.Models;

namespace FinalProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PokemonRankingsController : ControllerBase
    {
        private readonly PokemonDbContext _context;

        public PokemonRankingsController(PokemonDbContext context)
        {
            _context = context;
        }

        // GET: api/PokemonRankings
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PokemonRanking>>> GetPokemonRankings()
        {
            return await _context.PokemonRankings.ToListAsync();
        }


        //CHANGE TO USERID, but we can test first with just user
        //How to do this logic with a for loop and no linq?

        // GET: api/PokemonRankings/user
        [HttpGet("{user}")]
        public async Task<ActionResult<IEnumerable<PokemonRanking>>> GetPokemonRankingsByUser(User user)
        {
            List<PokemonRanking> pokemonRankingsByUser = _context.PokemonRankings.Where(ranking => ranking.UserId == user.Id).ToList();
            return pokemonRankingsByUser;
        }

        // GET: api/PokemonRankings/user/type
        [HttpGet("{user}")]
        public async Task<ActionResult<IEnumerable<PokemonRanking>>> GetPokemonRankingsByUser(User user, string type)
        {
            List<PokemonRanking> pokemonRankingsByUser = _context.PokemonRankings.Where(ranking => ranking.UserId == user.Id).ToList();
            return pokemonRankingsByUser;
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
