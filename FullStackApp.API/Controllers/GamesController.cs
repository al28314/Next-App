using System.Runtime.Intrinsics.X86;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;

namespace FullStackApp.API;
[Route("api/[controller]")]
[ApiController]
public class GamesController:ControllerBase
{
    private readonly GameContext gameContext;
    public GamesController(GameContext context)
    {
        gameContext = context;
    }
    [HttpDelete("{id}")]
    public IActionResult Delete(int id) {
        var game = gameContext.Games.First(g => g.Id == id);
        gameContext.Games.Remove(game);
        gameContext.SaveChanges();
        return Ok();
    }

    [HttpPut]
    public IActionResult Update(Game game) {
        gameContext.Games.Update(game);
        gameContext.SaveChanges();
        return Ok();
    }

    [HttpGet]
    public IActionResult Get() {
        return Ok(gameContext.Games.ToList());
    }
    [HttpPost]
    public IActionResult Post(Game game) {
        gameContext.Games.Add(game);
        gameContext.SaveChanges();
        return Ok();
    }
}
