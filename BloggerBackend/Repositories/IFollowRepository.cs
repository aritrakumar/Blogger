namespace BloggerBackend.Repositories;

using BloggerBackend.Models;

public interface IFollowRepository
{

    public Task Follow(Follow follow);

    public Task Unfollow(Follow follow);

}