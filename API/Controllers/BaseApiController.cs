
using Microsoft.AspNetCore.Mvc;


//this code prevents us from repeating the same code in all controllers
namespace API.Controllers

{
    [ApiController]
    [Route("api/[controller]")]
    public class BaseApiController : ControllerBase
    {

    }
}
