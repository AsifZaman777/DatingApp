using Microsoft.AspNetCore.Mvc;
using API.Data;
using API.Models;
using Microsoft.EntityFrameworkCore;


namespace API.Controllers;

[ApiController]
[Route("api/[controller]")] //api/users endpoint


//conventional way 

//public class UsersController : ControllerBase
//{
//    private readonly DataContext context;

//    public UsersController(DataContext context)
//    {
//      this.context = context;
//    }
//    [HttpGet]
//    public ActionResult<IEnumerable<AppUser>> GetUsers()
//    {

//    }
//}


// c#12 way using primary constructor
public class UsersController(DataContext context) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<AppUser>>> GetUser()
    {
        var users = await context.Users.ToListAsync();
        return Ok(users);
    }

    //search by id
    [HttpGet("{id:int}")]
    public async Task<ActionResult<AppUser>> GetUser(int id)
    {
        var user = await context.Users.FindAsync(id);
        if(user == null) return NotFound();
        return Ok(user);
    }

    //search by name
    [HttpGet("{name}")]
    public async Task<ActionResult> GetUser(string name)
    {
        var user = await context.Users.FirstOrDefaultAsync(u => u.Username.ToLower() == name.ToLower());

        if (user == null) return NotFound();
        return Ok(user);


    }

}


