using Microsoft.EntityFrameworkCore.Migrations;

namespace motsmarrants.web.Migrations
{
    public partial class AdminRole : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "f901e79d-843d-4af7-b1cc-2683ff1bbbb2", "dc5e450d-a351-4a96-bd24-88bb9b6b1f8e", "Admin", "ADMIN" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "f901e79d-843d-4af7-b1cc-2683ff1bbbb2");
        }
    }
}
