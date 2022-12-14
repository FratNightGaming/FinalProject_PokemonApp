// <auto-generated />
using System;
using FinalProject.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace FinalProject.Migrations
{
    [DbContext(typeof(FinalProjectContext))]
    partial class FinalProjectContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("FinalProject.Models.PokemonRanking", b =>
                {
                    b.Property<int?>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int?>("Id"));

                    b.Property<string>("Name")
                        .HasMaxLength(30)
                        .HasColumnType("nvarchar(30)")
                        .HasColumnName("name");

                    b.Property<string>("OriginalGame")
                        .HasMaxLength(20)
                        .HasColumnType("nvarchar(20)")
                        .HasColumnName("originalGame");

                    b.Property<int?>("PokemonApiid")
                        .HasColumnType("int")
                        .HasColumnName("PokemonAPIID");

                    b.Property<string>("Sprite")
                        .HasMaxLength(200)
                        .HasColumnType("nvarchar(200)")
                        .HasColumnName("sprite");

                    b.Property<string>("Types")
                        .HasMaxLength(20)
                        .HasColumnType("nvarchar(20)")
                        .HasColumnName("types");

                    b.Property<int?>("UserId")
                        .HasColumnType("int");

                    b.Property<int?>("UserRank")
                        .HasColumnType("int");

                    b.HasKey("Id")
                        .HasName("PK__PokemonR__3214EC07FFFB191C");

                    b.HasIndex("UserId");

                    b.ToTable("PokemonRankings");
                });

            modelBuilder.Entity("FinalProject.Models.User", b =>
                {
                    b.Property<int?>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("ID");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int?>("Id"));

                    b.Property<string>("GoogleId")
                        .HasMaxLength(60)
                        .HasColumnType("nvarchar(60)")
                        .HasColumnName("GoogleID");

                    b.Property<string>("UserName")
                        .HasMaxLength(30)
                        .HasColumnType("nvarchar(30)");

                    b.HasKey("Id")
                        .HasName("PK__Users__3214EC27577D9028");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("FinalProject.Models.PokemonRanking", b =>
                {
                    b.HasOne("FinalProject.Models.User", "User")
                        .WithMany("PokemonRankings")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("FK__PokemonRa__UserI__5EBF139D");

                    b.Navigation("User");
                });

            modelBuilder.Entity("FinalProject.Models.User", b =>
                {
                    b.Navigation("PokemonRankings");
                });
#pragma warning restore 612, 618
        }
    }
}
