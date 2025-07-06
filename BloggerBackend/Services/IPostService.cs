using BloggerBackend.Dto.PostDto;

namespace BloggerBackend.Services;
public interface IPostService
{
    Task<PostDto> CreatePost(PostDto postDto, string authorId);
    Task<PostDto> EditPost(PostDto postDto, string authorId);
    Task DeletePost(string postId);

    //Task<List<PostDto>> SearchPost(string keyword);
}