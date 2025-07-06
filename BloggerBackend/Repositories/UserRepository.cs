namespace BloggerBackend.Repository;
using BloggerBackend.Models;
using BloggerBackend.Repositories;
using MongoDB.Driver;

public class UserRepository : IUserRepository
{

    IMongoCollection<User> _user;

    public UserRepository(IMongoDatabase db)
    {
        _user = db.GetCollection<User>("Users");
    }
    public async Task SignUp(User user)
    {
        await _user.InsertOneAsync(user);
    }



    public async Task<User> Find(User user)
    {
        var usr = await _user.FindAsync(__user => __user.userEmail == user.userEmail);
        return await usr.FirstOrDefaultAsync();
    }

}