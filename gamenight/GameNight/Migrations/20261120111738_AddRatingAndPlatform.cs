using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GameNight.Migrations
{
    /// <inheritdoc />
    public partial class AddRatingAndPlatform : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsArchived",
                table: "GameSuggestions",
                type: "tinyint(1)",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "Platform",
                table: "GameSuggestions",
                type: "varchar(40)",
                maxLength: 40,
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<int>(
                name: "Rating",
                table: "GameSuggestions",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_GameSuggestions_IsArchived_HasGame",
                table: "GameSuggestions",
                columns: new[] { "IsArchived", "HasGame" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_GameSuggestions_IsArchived_HasGame",
                table: "GameSuggestions");

            migrationBuilder.DropColumn(
                name: "IsArchived",
                table: "GameSuggestions");

            migrationBuilder.DropColumn(
                name: "Platform",
                table: "GameSuggestions");

            migrationBuilder.DropColumn(
                name: "Rating",
                table: "GameSuggestions");
        }
    }
}
