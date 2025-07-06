namespace BloggerBackend.Services;

using BloggerBackend.Dto.UserDto;
using BloggerBackend.Models;
using BloggerBackend.Repositories;
using BloggerBackend.Dto.FollowDto;



//Data validation, logic, dto to entity mapping, multiple repo call
public class UserService : IUserService
{

    private readonly IUserRepository _userRepository;
    private readonly IFollowRepository _followRepository;
    private readonly JwtService _jwtService;

    public UserService(IUserRepository userRepository, IFollowRepository followRepository, JwtService jwtService)
    {
        _userRepository = userRepository;
        _followRepository = followRepository;
        _jwtService = jwtService;

    }

    public async Task SignUp(UserSignupDto userSignupDto)
    {
        User _user = new User { userName = userSignupDto.userName, userEmail = userSignupDto.userEmail, password = userSignupDto.password };

        var existingUser = await _userRepository.Find(_user);
        if (existingUser!= null)
        {
            throw new Exception("User already exists");
        }

        await _userRepository.SignUp(_user);
    }

    public async Task<string> Login(UserLoginDto userLoginDto)
    {
        // Try to find the user by email
        User user = await _userRepository.Find(new User { userEmail = userLoginDto.userEmail });
        
        if (user == null)
        {
            throw new Exception("User not found");
        }

        // Validate password (plain-text for now; use hashing in production)
        if (user.password != userLoginDto.password)
        {
            throw new Exception("Invalid password");
        }

        // Generate and return JWT token
        return _jwtService.GenerateToken(user._id.ToString(), user.userName);
    }

    public async Task Follow(FollowUnfollowRequestDto followUnfollowRequestDto)
    {
        Follow _follow = new Follow { who = followUnfollowRequestDto.who, toWhom = followUnfollowRequestDto.toWhom };
        await _followRepository.Follow(_follow);
    }

    public async Task Unfollow(FollowUnfollowRequestDto followUnfollowRequestDto)
    {
        Follow _follow = new Follow { who = followUnfollowRequestDto.who, toWhom = followUnfollowRequestDto.toWhom };
        await _followRepository.Unfollow(_follow);
    }

}