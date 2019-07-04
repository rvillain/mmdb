﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using mots_marrants.DAL;

namespace motsmarrants.web.Migrations
{
    [DbContext(typeof(WordContext))]
    [Migration("20190624195907_InitialCreate")]
    partial class InitialCreate
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.2.4-servicing-10062")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("mots_marrants.web.Models.WordData", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Author");

                    b.Property<DateTime>("CreationDate");

                    b.Property<string>("Definition");

                    b.Property<string>("Examples");

                    b.Property<string>("Link");

                    b.Property<string>("Word");

                    b.HasKey("Id");

                    b.ToTable("WordData");
                });

            modelBuilder.Entity("mots_marrants.web.Models.WordRate", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("Rate");

                    b.Property<int>("WordDataId");

                    b.HasKey("Id");

                    b.HasIndex("WordDataId");

                    b.ToTable("WordRate");
                });

            modelBuilder.Entity("mots_marrants.web.Models.WordRate", b =>
                {
                    b.HasOne("mots_marrants.web.Models.WordData", "WordData")
                        .WithMany("WordRates")
                        .HasForeignKey("WordDataId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
