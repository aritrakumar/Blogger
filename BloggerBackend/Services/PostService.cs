using BloggerBackend.Dto.PostDto;
using BloggerBackend.Models;
using BloggerBackend.Repositories;


namespace BloggerBackend.Services;

public class PostService : IPostService
{
    private readonly IPostRepository _postRepository;
    public PostService(IPostRepository postRepository)
    {
        _postRepository = postRepository;
    }
    public async Task<PostDto> CreatePost(PostDto postDto, string authorId)
    {
        Post post = new Post { postTitle = postDto.postTitle, postBody = postDto.postBody, authorId = authorId };
        var res = await _postRepository.CreatePost(post);
        return new PostDto { postTitle=res.postTitle, postBody=res.postBody, postId =res.postId};
    }


    public async Task<PostDto> EditPost(PostDto postDto, string authorId)
    {
        Post post = new Post { postId = postDto.postId, postTitle = postDto.postTitle, postBody = postDto.postBody, authorId = authorId };
        var res = await _postRepository.EditPost(post);
        return new PostDto { postTitle=res.postTitle, postBody=res.postBody, postId =res.postId};
    }

    public async Task DeletePost(string postId)
    {
        //Post post = new Post { _id = postDto.postTitle, postTitle = postDto.postTitle, postBody = postDto.postBody, authorId = authorId };
        await _postRepository.DeletePost(postId);
    }

    // public async Task<List<PostDto>> SearchPost(string keyword)
    // {
    //     var res = await _postRepository.SearchPost(keyword);
    //     List<PostDto> postDtos = new List<PostDto>();
    //     foreach (var post in res)
    //     {
    //         postDtos.Add(new PostDto { postTitle=post.postTitle, postBody=post.postBody, postId =post.postId});
    //     }
    //     return postDtos;
    // }


    // feed post
}

