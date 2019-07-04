using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace motsmarrants.web.Migrations
{
    public partial class Validation : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Validated",
                table: "WordData",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<DateTime>(
                name: "ValidationDate",
                table: "WordData",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "WordType",
                table: "WordData",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Validated",
                table: "WordData");

            migrationBuilder.DropColumn(
                name: "ValidationDate",
                table: "WordData");

            migrationBuilder.DropColumn(
                name: "WordType",
                table: "WordData");
        }
    }
}
