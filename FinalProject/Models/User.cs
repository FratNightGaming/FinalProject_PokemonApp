using System;
using System.Collections.Generic;

namespace FinalProject.Models;

public partial class User
{
    public int Id { get; set; }

    public string? UserName { get; set; }

    public virtual ICollection<PokemonRanking> PokemonRankings { get; } = new List<PokemonRanking>();
}
