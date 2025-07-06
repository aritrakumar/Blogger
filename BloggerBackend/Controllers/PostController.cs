using System.Threading.Tasks;
using BloggerBackend.Dto.PostDto;
using BloggerBackend.Models;
using Microsoft.AspNetCore.Mvc;
using BloggerBackend.Services;
using Microsoft.AspNetCore.Authorization;

namespace BloggerBackend.Controllers;


[ApiController]
[Route("api/[Controller]")]



// Protected Route jwt Auth
public class PostController : ControllerBase
{
    private readonly IPostService _postService;
    public PostController(IPostService postService)
    {
        _postService = postService;
    }

    [Authorize]
    [HttpPost("create")]
    public async Task<ActionResult<PostDto>> CreatePost([FromBody] PostDto postDto)
    {
        try
        {
            
            var res = await _postService.CreatePost(postDto, "jwt");
            return Ok(res);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [Authorize]
    [HttpPut("edit")]
    public async Task<ActionResult<PostDto>> EditPost([FromBody] PostDto postDto)
    {
        try
        {
            var res = await _postService.EditPost(postDto, "jwt");
            return Ok(res);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [Authorize]
    [HttpDelete("delete")]
    public async Task<IActionResult> DeletePost([FromBody] string postId)
    {
        try
        {
            await _postService.DeletePost(postId);
            return Ok();
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }


    // [HttpPost("search")]
    // public async Task<ActionResult<List<PostDto>>> SearchPost([FromBody] string keyword)
    // {
    //     try
    //     {
    //         var res = await _postService.SearchPost(keyword);
    //         return Ok(res);
    //     }
    //     catch (Exception ex)
    //     {
    //         return BadRequest(ex.Message);
    //     }
    // }

    // feed post
}    