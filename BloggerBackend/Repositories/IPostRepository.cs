namespace BloggerBackend.Repositories;

using BloggerBackend.Models;

public interface IPostRepository
{
    public Task<Post> CreatePost(Post post);
    public Task<Post> EditPost(Post post);
    public Task DeletePost(string postId);
}