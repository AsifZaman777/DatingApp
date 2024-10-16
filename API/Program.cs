using API.Data;
using API.Interfaces;
using API.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
//use jwt bearer

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// Configure Entity Framework with SQLite
builder.Services.AddDbContext<DataContext>(opt =>
{
    opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});

// Configure CORS to allow requests from your React app
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        builder =>
        {
            builder.WithOrigins("http://localhost:5173") // Replace with the correct origin
                   .AllowAnyHeader()
                   .AllowAnyMethod();
        });
});

builder.Services.AddScoped<ITokenService, TokenService>(); // add token service to the container

// authentication


var app = builder.Build();

// Enable CORS
app.UseCors("AllowReactApp");

//Enable CORS for angular

app.UseCors(
    x => x.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:4200")
    );


// Use authorization if needed
app.UseAuthorization();

// Map controller routes
app.MapControllers();

// Run the application
app.Run();
