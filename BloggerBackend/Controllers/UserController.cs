
using System.Threading.Tasks;
using BloggerBackend.Dto.FollowDto;
using BloggerBackend.Dto.UserDto;
using BloggerBackend.Services;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace BloggerBackend.Controllers;


// error handling from db 
// data validation from request

// async await => repo, service, controller 
// task / promise return =>  repo, service 

[ApiController]

[Route("api/[controller]")]
public class UserController : ControllerBase
{
    private readonly IUserService _userService;
    public UserController(IUserService userService) {
        _userService = userService;
    }

    [HttpPost("signUp")]
    public async Task<IActionResult> SignUp([FromBody] UserSignupDto userSignupDto)
    {
        try
        {
            await _userService.SignUp(userSignupDto);
            return Ok(new { message = "User created successfully" });
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }


    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] UserLoginDto userLoginDto)
    {
        try
        {
            var token = await _userService.Login(userLoginDto);
            return Ok(new { token });
        }
        catch (Exception ex)

        {
            return Unauthorized(new { error = ex.Message });
        }
    }


    [Authorize]
    [HttpPost("follow")]
    public async Task<IActionResult> Follow([FromBody] FollowUnfollowRequestDto followUnfollowRequestDto)
    {
        try
        {
            await _userService.Follow(followUnfollowRequestDto);
            return Ok();
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [Authorize]
    [HttpPost("unfollow")]
    public async Task<IActionResult> Unfollow([FromBody] FollowUnfollowRequestDto followUnfollowRequestDto)
    {
        try
        {
            await _userService.Unfollow(followUnfollowRequestDto);
            return Ok();
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }


}