using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace FullStackApp.API;

public class GameContext : IdentityDbContext<User>
{    public DbSet<Game> Games { get; set; }
    public GameContext(DbContextOptions<GameContext>options):base(options) {

    }
}