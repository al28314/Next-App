using Microsoft.AspNetCore.Identity;

namespace FullStackApp.API;

public class User : IdentityUser
{
    public string Name { get; set; }
    public string LastName { get; set; }
    
}
