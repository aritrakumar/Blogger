namespace BloggerBackend.Repositories;
using BloggerBackend.Models;

public interface IUserRepository
{
    public Task SignUp(User user);
    public Task<User> Find(User user);
}