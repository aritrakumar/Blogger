using Microsoft.AspNetCore.Mvc;

namespace BloggerBackend.Controllers;


[ApiController]
[Route("api/[Controller]")]
class Controller : ControllerBase
{
    [HttpPost("/")]
}