using BloggerBackend.Dto.FollowDto;
using BloggerBackend.Dto.UserDto;

namespace BloggerBackend.Services;


public interface IUserService
{
    Task SignUp(UserSignupDto userSignupDto);
    Task<string> Login(UserLoginDto userLoginDto);

    Task Follow(FollowUnfollowRequestDto followUnfollowRequestDto);

    Task Unfollow(FollowUnfollowRequestDto followUnfollowRequestDto);
}