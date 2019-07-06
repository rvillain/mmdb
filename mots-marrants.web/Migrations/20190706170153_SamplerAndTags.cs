using Microsoft.EntityFrameworkCore.Migrations;

namespace motsmarrants.web.Migrations
{
    public partial class SamplerAndTags : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {

            migrationBuilder.AddColumn<string>(
                name: "Tags",
                table: "WordData",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Sampler",
                table: "AspNetUsers",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Tags",
                table: "WordData");

            migrationBuilder.DropColumn(
                name: "Sampler",
                table: "AspNetUsers");
        }
    }
}
