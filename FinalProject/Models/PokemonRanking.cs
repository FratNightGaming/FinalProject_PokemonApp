using System;
using System.Collections.Generic;

namespace FinalProject.Models;

public partial class PokemonRanking
{
    public int Id { get; set; }

    public int? UserId { get; set; }

    public int? UserRank { get; set; }

    public int? PokemonApiid { get; set; }

    public virtual User? User { get; set; }
}
