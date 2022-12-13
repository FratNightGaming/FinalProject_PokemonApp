using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace FinalProject.Models;

public partial class FinalProjectContext : DbContext
{
    public FinalProjectContext()
    {
    }

    public FinalProjectContext(DbContextOptions<FinalProjectContext> options)
        : base(options)
    {
    }

    public virtual DbSet<PokemonRanking> PokemonRankings { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer(Secret.connectionString);

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<PokemonRanking>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__PokemonR__3214EC07FFFB191C");

            entity.Property(e => e.Name)
                .HasMaxLength(30)
                .HasColumnName("name");
            entity.Property(e => e.OriginalGame)
                .HasMaxLength(20)
                .HasColumnName("originalGame");
            entity.Property(e => e.PokemonApiid).HasColumnName("PokemonAPIID");
            entity.Property(e => e.Sprite)
                .HasMaxLength(200)
                .HasColumnName("sprite");
            entity.Property(e => e.Types)
                .HasMaxLength(20)
                .HasColumnName("types");

            entity.HasOne(d => d.User).WithMany(p => p.PokemonRankings)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK__PokemonRa__UserI__5EBF139D");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Users__3214EC27577D9028");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.GoogleId)
                .HasMaxLength(60)
                .HasColumnName("GoogleID");
            entity.Property(e => e.UserName).HasMaxLength(30);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
