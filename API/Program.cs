using API.Data;
using API.Extensions;
using API.Interfaces;
using API.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
//use jwt bearer

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddApplicationServices(builder.Configuration); //custom extension method
builder.Services.AddIdentityServices(builder.Configuration); //custom extension method


var app = builder.Build();

// Enable CORS
app.UseCors("AllowReactApp");

//Enable CORS for angular

app.UseCors(
    x => x.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:4200")
    );

// Use authorization if needed
app.UseAuthentication();
app.UseAuthorization();

// Map controller routes
app.MapControllers();

// Run the application
app.Run();
