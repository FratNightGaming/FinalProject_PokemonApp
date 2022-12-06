using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace FinalProject.Models;

public partial class PokemonDbContext : DbContext
{
    public PokemonDbContext()
    {
    }

    public PokemonDbContext(DbContextOptions<PokemonDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<PokemonRanking> PokemonRankings { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)

#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer

        ("Server = tcp:finalproject2022.database.windows.net, 1433; Initial Catalog = FinalProject; Persist Security Info=False;User ID = FinalProject; Password=Pokemon2022!; MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout = 30;");
        //("Server=.\\SQLExpress;Database=PokemonDB;Trusted_Connection=True;TrustServerCertificate=True");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<PokemonRanking>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__PokemonR__3214EC07AAA1B012");

            entity.Property(e => e.Criteria).HasMaxLength(25);
            entity.Property(e => e.PokemonApiId).HasColumnName("PokemonAPIID");

            entity.HasOne(d => d.User).WithMany(p => p.PokemonRankings)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK__PokemonRa__UserI__38996AB5");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Users__3214EC274D57017D");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.UserName).HasMaxLength(30);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
