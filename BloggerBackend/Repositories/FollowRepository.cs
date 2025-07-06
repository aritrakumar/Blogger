using BloggerBackend.Models;
using BloggerBackend.Repositories;
using MongoDB.Driver;

public class FollowRepository : IFollowRepository
{
    IMongoCollection<Follow> _follow;

    public FollowRepository(IMongoDatabase db)
    {
        _follow = db.GetCollection<Follow>("Follows");
    }

    public async Task Follow(Follow follow)
    {
        await _follow.InsertOneAsync(follow);
    }

    public async Task Unfollow(Follow oldfollow) {
        await _follow.DeleteOneAsync(follow => follow.who == oldfollow.who && follow.toWhom == oldfollow.toWhom);  // Assuming Follow.who and Follow.toWhom are unique identifiers.;
    }
}