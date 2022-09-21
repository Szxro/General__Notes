# Simple Api Creation

```c#
//This is just the sample code that is created with the project
using Microsoft.AspNetCore.Mvc;

namespace SimpleApi.Controllers
{
    [ApiController]//Important to define an ApiController
    [Route("[controller]")]//The Route will be the controller name
    public class WeatherForecastController/*Name*/ : ControllerBase//Important to put like the main controller
    {
        private static readonly string[] Summaries = new[]
        {
        "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
    };

        private readonly ILogger<WeatherForecastController> _logger;

        public WeatherForecastController(ILogger<WeatherForecastController> logger)
        {
            _logger = logger;
        }

        [HttpGet("GetWeatherForecast")] //Naming the route , (with a Name property it change to the name of th Get)
        public IEnumerable<WeatherForecast> Get()
        {
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                Date = DateTime.Now.AddDays(index),
                TemperatureC = Random.Shared.Next(-20, 55),
                Summary = Summaries[Random.Shared.Next(Summaries.Length)]
            })
            .ToArray();
        }
    }
}
```

# Creating a Model

```c#

using System.ComponentModel;

namespace SimpleApi.Models
{
    public class SuperHero : Common
    //Created a abstract class with the property of ID with [Required]
    {
        [DefaultValue("Sebastian")]
        public string Name { get; set; }

        public string FirstName { get; set; } = string.Empty;
        //string.empty took off the Warnings.

        public string LastName { get; set; } = string.Empty;

        public string Power { get; set; } = string.Empty;
    }
}
```

# Creating a Controller

> Just Add a empty Controller in the controller folder and in that class is going to be the GET,PUT,DELETE or POST.

# Controller Operations (With Static Data)

```c#
using Microsoft.AspNetCore.Mvc;
using SimpleApi.Models;

namespace SimpleApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class HeroeController : ControllerBase
    {
        private static List<SuperHero> _heroes = new List<SuperHero>
          {
              new SuperHero{ ID= 1,Name = "SpiderMan",Power ="Spider" },
              new SuperHero{ ID= 2,Name = "Pedro",Power ="Be Pedro"},
              new SuperHero{ ID= 3,Name = "Juan",Power ="Be Juan"}
          };

        //Get Call
        [HttpGet("SuperHeroes")]
        //Get and newRoute("/nameController/SuperHeroes")

        public async Task<ActionResult<List<SuperHero>>> Get()
        //To see the Schema have to put it in ActionResult and what is going to return
        {
            return Ok(heroes);
            //Returning a 200 with the new List of heroes
        }

        //Get Call with a parameter (like a filter)
         [HttpGet("SearchByID")]

        public async Task<ActionResult<SuperHero>> SearchByID(int id)
        //return a singleHeroe it will be filter with his ID
        {
            var hero = _heroes.Find(res => res.ID == id);
            //Expresion Lambda to Find the heroe in _heroes with his id
            if (hero == null)
            //if the hero is null is going to throw a BadRequest with that definition
                return BadRequest("Heroe not Found.");
            return Ok(hero);
        }

        //Post Call
        [HttpPost("AddHero")]

        public async Task<ActionResult<List<SuperHero>>> AddHero(SuperHero hero)
        //Is the same but your Adding A hero to the _heroesList
        {
            //Adding a Hero
            _heroes.Add(hero);
            //Added and Showed
            return Ok(_heroes);
        }

        //Put Call
          [HttpPut("UpdateHero")]

        public async Task<ActionResult<List<SuperHero>>> UpdateHero(SuperHero request)
        //Getting a new SuperHero
        {
            var hero = _heroes.Find(res => res.ID == request.ID);
            //Finding by id and updating by it
            if (hero == null)
                return BadRequest("Hero not found");
            //Update Properties
            hero.Name = request.Name;
            //Updating by the params properties
            hero.Power = request.Power;
            //Updating the _heroes list
            return Ok(_heroes);
        }

        //Delete Call
        [HttpDelete("{id}")]
        public async Task<ActionResult<List<SuperHero>>> DeleteHero(int id)
        {
            var heroID = _heroes.Find(res => res.ID == id);
            //Finding the hero by ID
            if(heroID == null)
                return BadRequest("Hero not found");
            //Removing the hero from the _heroes List.
            _heroes.Remove(heroID);
            return Ok(_heroes);
            //Returnig all the heroes and showing the result
        }
    }
}
```

# Cors Error Solution (Basic)

```c#
//In the Program.cs

app.UseCors(m => {
    m.AllowAnyHeader();
    m.AllowAnyOrigin();
});
//This is just to not have an error when you make a request
```

# Controllers Operations (But connected to a DB)

> First you need to use EF, and the usual stuff with it (create de dbContext,add the dbContext to the Program.cs, etc...)

```c#
 public class HeroeController : ControllerBase
    {
        //Have to use dependency injection to the controller
        private readonly HeroeContext _context;

        public HeroeController(HeroeContext heroeContext)
        {
            //Injecting the HeroContext
            _context = heroeContext;
        }

        //Controllers Operations

        [HttpGet("GetHeroes")]

        //Getting all Heroes
        public async Task<ActionResult<List<SuperHero>>> GetHeroes()
        {
            //It is going to return the All Heroes
            return (await _context.SuperHeroes.ToListAsync());
        }

        [HttpGet("{id}")]

        //Getting the Heroes by ID
        public async Task<ActionResult<SuperHero>> SearchByID(int id)
        {
            //Going to Find the Hero by Id , in this case have to just add the parameter (id)
            var hero = await _context.SuperHeroes.FindAsync(id);
            if (hero == null)
                return BadRequest("Heroe not Found.");
                //Is going to return the hero who have that Id.
            return hero;
        }


        [HttpPost("AddHero")]

        //Adding a New Hero
        public async Task<ActionResult<List<SuperHero>>> AddHero(SuperHero hero)
        {
            _context.SuperHeroes.Add(hero);//Add the Hero
            await _context.SaveChangesAsync();//Save the Changes
            return (await _context.SuperHeroes.ToListAsync()); //Return all the Heroes with the new one
        }

        [HttpPut("UpdateHero")]

        //Updating a Hero
        public async Task<ActionResult<List<SuperHero>>> UpdateHero(SuperHero request)
        {
            var hero = await _context.SuperHeroes.FindAsync(request.ID);
            //Searching the Hero By ID
            if (hero == null)
                return BadRequest("Hero not found");
            //Updating the Properties
            hero.Name = request.Name;
            hero.PowerName = request.PowerName;
            await _context.SaveChangesAsync();//Saving the Changes
            return (await _context.SuperHeroes.ToListAsync());//Return all the heroes
        }

        [HttpDelete("{id}")]

        //Deleting a Hero
        public async Task<ActionResult<List<SuperHero>>> DeleteHero(int id)
        {
            var heroId = await _context.SuperHeroes.FindAsync(id);
            if (heroId == null)
                return BadRequest("Hero not found");
            //Removing the heroe
            _context.SuperHeroes.Remove(heroId);//Removing the Hero that found.
            await _context.SaveChangesAsync();
            return (await _context.SuperHeroes.ToListAsync());
        }
    }
```

> Is better to use Task/Async and Await when you are working with DB. (And the AsynMethods)

> dotnet new gitignore to dont push some files that are not important.
