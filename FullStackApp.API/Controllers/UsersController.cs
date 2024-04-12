using FullStackApp.API.requests;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace FullStackApp.API;
[Route("api/[controller]")]
[ApiController]
public class UsersController : ControllerBase
{
    [HttpPost]
    public bool Login(LoginRequest request) {
        return true;
    }
}
