using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GameNight.Migrations
{
    /// <inheritdoc />
    public partial class AddWithdrawalCode : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "WithdrawalCodeHash",
                table: "EventRegistrations",
                type: "varchar(64)",
                maxLength: 64,
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "WithdrawalCodeHash",
                table: "EventRegistrations");
        }
    }
}
