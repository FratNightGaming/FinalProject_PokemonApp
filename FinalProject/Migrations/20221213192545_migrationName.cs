using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FinalProject.Migrations
{
    /// <inheritdoc />
    public partial class migrationName : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserName = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: true),
                    GoogleID = table.Column<string>(type: "nvarchar(60)", maxLength: 60, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Users__3214EC27577D9028", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "PokemonRankings",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: true),
                    UserRank = table.Column<int>(type: "int", nullable: true),
                    PokemonAPIID = table.Column<int>(type: "int", nullable: true),
                    sprite = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    name = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: true),
                    types = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    originalGame = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__PokemonR__3214EC07FFFB191C", x => x.Id);
                    table.ForeignKey(
                        name: "FK__PokemonRa__UserI__5EBF139D",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "ID");
                });

            migrationBuilder.CreateIndex(
                name: "IX_PokemonRankings_UserId",
                table: "PokemonRankings",
                column: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PokemonRankings");

            migrationBuilder.DropTable(
                name: "Users");
        }
        

    }
}
