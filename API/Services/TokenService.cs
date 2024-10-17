
using API.Interfaces;
using API.Models;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace API.Services
{
    public class TokenService(IConfiguration config) : ITokenService
    {
        public string CreateToken(AppUser user)
        {
            var tokenKey = config["TokenKey"] ?? throw new ArgumentNullException("TokenKey is missing from appsettings.json");
            if(tokenKey.Length < 64) throw new ArgumentException("TokenKey must be at least 64 characters long");

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(tokenKey));

            //claims
            var claims = new List<Claim>
            {
               new (ClaimTypes.NameIdentifier,user.Username)
            };

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature)
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);

        }
    }
}
