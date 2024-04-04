using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FullStackApp.API.Migrations
{
    /// <inheritdoc />
    public partial class AddDevicePropertyToGame : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Device",
                table: "Games",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Device",
                table: "Games");
        }
    }
}
