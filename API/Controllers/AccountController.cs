﻿using Microsoft.AspNetCore.Mvc;
using API.Data;
using API.Models;
using System.Security.Cryptography;
using System.Text;
using API.DTOs;
using Microsoft.EntityFrameworkCore;
using API.Interfaces;
using Microsoft.AspNetCore.Http.HttpResults;

namespace API.Controllers
{
    public class AccountController(DataContext context, ITokenService tokenService) : BaseApiController
    {

        [HttpPost("register")] //api/account/register
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto) //using DTO
        {
            // Make UserExists asynchronous
            if (await UserExists(registerDto.Username)) return BadRequest("Username is taken");

            using var hmac = new HMACSHA512();

            var user = new AppUser
            {
                Username = registerDto.Username.ToLower(),
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
                PasswordSalt = hmac.Key
            };

            context.Users.Add(user);
            await context.SaveChangesAsync();

            return Ok(
                new UserDto
                {
                    Username = user.Username,
                    Token = tokenService.CreateToken(user)
                }
                );

        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await context.Users
                .FirstOrDefaultAsync(u => u.Username == loginDto.Username.ToLower());

            if (user == null) return Unauthorized("Invalid username");

            using var hmac = new HMACSHA512(user.PasswordSalt);

            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));

            for (int i = 0; i < computedHash.Length; i++)
            {
                if (computedHash[i] != user.PasswordHash[i]) return Unauthorized("Invalid password");
            }

            return Ok(
                new UserDto
                {
                    Username = user.Username,
                    Token = tokenService.CreateToken(user)
                }
                );

        }

        // Asynchronous version of UserExists
        private async Task<bool> UserExists(string username)
        {
            return await context.Users.AnyAsync(u => u.Username.ToLower() == username.ToLower());
        }
    }
}