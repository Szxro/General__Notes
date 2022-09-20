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

# Controller Operations

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
         [HttpGet("SingleHeroe")]

        public async Task<ActionResult<SuperHero>> SingleHero(int id)
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
    }
}
```
