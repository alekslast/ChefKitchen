using BusinessLogic.DTOs;





namespace Infrastructure.Interfaces
{
    public interface IInfrastructureServices
    {
        UserDto     Login           (LoginRequest loginRequest);
        int         CreateNewUser   (UserDto userDto);
        string      CreateToken     (UserDto user);
        string      Hash            (string password);
        bool        Verify          (string password, string passwordHash);
    }
}
