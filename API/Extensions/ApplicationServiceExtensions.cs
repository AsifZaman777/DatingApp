using API.Data;
using API.Interfaces;
using API.Services;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions
{
    public static class ApplicationServiceExtensions
    {
      public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
        {
            // Add services to the container.
            services.AddControllers();

            // Configure Entity Framework with SQLite
            services.AddDbContext<DataContext>(opt =>
            {
                opt.UseSqlite(config.GetConnectionString("DefaultConnection"));
            });

            // Configure CORS to allow requests from your React app
           services.AddCors(options =>
            {
                options.AddPolicy("AllowReactApp",
                    builder =>
                    {
                        builder.WithOrigins("http://localhost:5173") // Replace with the correct origin
                               .AllowAnyHeader()
                               .AllowAnyMethod();
                    });
            });

           services.AddScoped<ITokenService, TokenService>(); // add token service to the container

            return services;
        }
    }
}
