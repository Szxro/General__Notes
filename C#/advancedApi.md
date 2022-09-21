# Enum Class

```c#
  [JsonConverter(typeof(JsonStringEnumConverter))]
  //This is just to convert to enum to an array of the elements that are in the enum
    public enum RpgClass
    {
       Samurai = 0,
       Knight = 1,
       Wizard = 2
    }
```

# IAction Result

```c#
[HttpGet("GetAllCharacter")]
public IActionResult getCharacter()
{
    return Ok(_characters.ToList());
}
```

> With IActionResult you can return whatever will be the response , is better to use instead of ActionResult.
