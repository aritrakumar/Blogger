
using MongoDB.Driver;
using BloggerBackend.Models;
using BloggerBackend.Repositories;

namespace BloggerBackend.Repository;

public class PostRepository : IPostRepository
{
    IMongoCollection<Post> _post;

    public PostRepository(IMongoDatabase db)
    {
        _post = db.GetCollection<Post>("Posts");
    }

    public async Task<Post> CreatePost(Post post)
    {
        await _post.InsertOneAsync(post);
        return post;
    }

    public async Task<Post> EditPost(Post post)
    {
        // Use a filter to match by postId
        var filter = Builders<Post>.Filter.Eq(p => p.postId, post.postId);
        await _post.ReplaceOneAsync(filter, post);
        return post;
    }

    public async Task DeletePost(string postId)
    {
        var filter = Builders<Post>.Filter.Eq(p => p.postId, postId);
        await _post.DeleteOneAsync(filter);
    }

    // public async Task<List<Post>> SearchPost(string keyword)
    // {
    //     return await _post.Find() // => searching using $regex operator 
    // }

    // feed post
}