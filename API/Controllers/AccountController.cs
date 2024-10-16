using Microsoft.AspNetCore.Mvc;
using API.Data;
using API.Models;
using System.Data.Entity;
using System.Security.Cryptography;
using System.Text;
using API.DTOs;

namespace API.Controllers
{
    public class AccountController(DataContext context) : BaseApiController
    {

        //check if user exists
       

        [HttpPost("register")] //api/account/register


        //public async Task<ActionResult<AppUser>> Register([FromQuery]string username, string password) //conventional way without DTO


        //using DTOs
        public async Task<ActionResult<AppUser>> Register(RegisterDto registerDto) //using DTO
        {

            if (UserExists(registerDto.Username)) return BadRequest("Username is taken");

            using var hmac = new HMACSHA512();

            var user = new AppUser
            {
                Username = registerDto.Username.ToLower(),
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
                PasswordSalt = hmac.Key
            };

            context.Users.Add(user);
            await context.SaveChangesAsync();
            return Ok(user);
        }

        private bool UserExists(string username)
        {
            return context.Users.Any(u => u.Username.ToLower() == username.ToLower());
        }




    }
}
