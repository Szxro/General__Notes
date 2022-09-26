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

# Model File Upload

```c#
 public class FileUpload
    {
        public string? FileName { get; set; }

        public string? FilePath { get; set; }
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

# Services

> This are usually inteface that implement in class with the same name or sometimes are Classes.

```c#
//ServiceResponse.cs
public class ServiceResponse<T>//This is a generic to obtain all the data that is going to ve given
{
     public T? Data { get; set; }

     public bool Success { get; set; } = true;//Default Values

     public string Message { get; set; } = string.Empty;
}

//ICharacterService.cs
public interface ICharacterService //This interface is for all the methods that Character Service is going to have
{
    Task<ServiceResponse<List<Character>>> getAll();
    //Task is for async but in this case the data is hardcode
    //ServiceResponse is going to Return a List of Characters

    Task<ServiceResponse<Character>> filterByID(int id);

    Task<ServiceResponse<List<Character>>> AddCharacter(Character character);
}

//CharacterService.cs
public class CharacterService : ICharacterService
    {
      //These are the hardcode data
        private static List<Character> _characters = new List<Character>
        {
            new Character{ Id = 1, CharacterName = "Knight", HitPoinst = 100, Class = RpgClass.Knight },
            new Character{ Id = 2, CharacterName = "Samurai", HitPoinst = 150, Class = RpgClass.Samurai }
        };

        public async Task<ServiceResponse<List<Character>>> AddCharacter(Character character)
        {
            var characterID = _characters.Find(x => x.Id == character.Id);
            //Seeing if the id exist
            if (characterID != null)
            //if the id exist
                return new ServiceResponse<List<Character>>() { Data = null, Success = false, Message = "That Character already exist" };
                //Is going to throw this
            _characters.Add(character);
            //else is going to add the character
            return new ServiceResponse<List<Character>>() {Data = _characters };
            // and is going to return a Service Response with the data given
        }

        public async Task<ServiceResponse<Character>> filterByID(int id)
        {
            var characters = _characters.Find(x => x.Id == id);
            if (characters == null)
                return new ServiceResponse<Character>() { Data = null, Success = false, Message = "Character not Found" };
            return new ServiceResponse<Character>() { Data = characters };
            //Return the Character
        }

        public async Task <ServiceResponse<List<Character>>> getAll()
        {
            return new ServiceResponse<List<Character>>() { Data = _characters };
        }
    }
```

> ServiceResponse is to control the data in the web api.

# Dependency Injection in the Controllers

```c#
//CharacterController.cs
//Its just to inject the ICharacterService in the controller and use the methods of it.
  private readonly ICharacterService _CharacterService;

        public CharacterController(ICharacterService characterService)
        {
           _CharacterService = characterService;
        }
//Configuring it in the Program.cs
//Have to do this step to not have an error
builder.Services.AddScoped<ICharacterService, CharacterService>();
```

# Controller Methods

```c#
    [ApiController]
    [Route("api/[controller]")]
    public class CharacterController : ControllerBase
    {
        private readonly ICharacterService _CharacterService;

        public CharacterController(ICharacterService characterService)
        {
           _CharacterService = characterService;
        }

        [HttpGet("getAll")]
        //The Method have to be the same as the CharacterService.cs but with the addition of ActionResult
        public async Task<ActionResult<ServiceResponse<List<Character>>>> getCharacter()
        {
            return Ok(await _CharacterService.getAll());
            //Returning it with a 200 response
        }

        [HttpGet("filter/{id}")]
        public async Task<ActionResult<ServiceResponse<Character>>> filterID(int id)
        {
            return Ok(await _CharacterService.filterByID(id));
        }

        [HttpPost("AddCharacter")]
        public async Task<ActionResult<ServiceResponse<List<Character>>>> addCharacter(Character character)
        {
            return Ok(await _CharacterService.AddCharacter(character));
        }
    }
```

# DTO (Data Transfer Model)

> A DTO (Data Transfer Object) is an object that defines how data will be sent between applications.

> It’s used only to send and receive data and does not contain in itself any business logic.

> More Info: https://www.telerik.com/blogs/dotnet-basics-dto-data-transfer-object

```c#
//GetCharacterDTO.cs
//GetCharacterDTO = Character.cs
 public class GetCharacterDTO : Common
    {
        public string CharacterName { get; set; } = string.Empty;

        public int HitPoinst { get; set; }

        public RpgClass Class { get; set; }
    }
//AddCharacterDTO.cs
//Is just the Character Class but without the id
 public class AddCharacterDTO
    {
        public string CharacterName { get; set; } = string.Empty;

        public int HitPoinst { get; set; }

        public RpgClass Class { get; set; }
    }
```

> Just do Classes with the DTO to indetinfy it.

# Using the DTO with the Services

```c#
//ICharacterService.cs
 public interface ICharacterService
    {
        Task<ServiceResponse<List<GetCharacterDTO>>> getAll();
        //Instead of been Character Class is going to be the DTO

        Task<ServiceResponse<GetCharacterDTO>> filterByID(int id);

        Task<ServiceResponse<List<GetCharacterDTO>>> AddCharacter(AddCharacterDTO character);
        //The same but the parameter is the AddCharacterDTO

        Task<ServiceResponse<GetCharacterDTO>> updateCharacter(UpdateCharacterDTO updatecharacter);

        Task<ServiceResponse<GetCharacyerDTO>> removeCharacter(int id);

        //Uploading a File
        Task<ServiceResponse<List<FileUpload>>> uploadFile(List<IFormFile> files);
    }

```

# AutoMapper

> Is just relation The Dto's with the Classes.

> Must Install AutoMapper.Dependency.Injection

```c#
//Program.cs
builder.Services.AddAutoMapper(typeof(Program).Assembly);
//Adding the automapper to the project
```

# AutoMapper in the Services

```c#
 public class CharacterService : ICharacterService
    {
        private static List<Character> _characters = new List<Character>
        {
            new Character{ Id = 1, CharacterName = "Knight", HitPoinst = 100, Class = RpgClass.Knight },
            new Character{ Id = 2, CharacterName = "Samurai", HitPoinst = 150, Class = RpgClass.Samurai }
        };

        private readonly IMapper _mapper; //Have to make a Dependency Injection

        public CharacterService(IMapper mapper)
        {
            _mapper = mapper;
        }

        public async Task<ServiceResponse<List<GetCharacterDTO>>> AddCharacter(AddCharacterDTO newcharacter)
        //Updating the Interface with the DTO and AutoMapper
        {
             Character character = _mapper.Map<Character>(newcharacter);
             //Creating a new Character but mapping from Character to the Dto
            character.Id = _characters.Max(x => x.Id) + 1;
            //Incremeting the ID by default (the user is just only going to add the user without id)
            _characters.Add(character);//Adding the new character
            return new ServiceResponse<List<GetCharacterDTO>>() {Data = _characters.Select(x => _mapper.Map<GetCharacterDTO>(x)).ToList()};
            //Mapping from Character to Dto and make it a list
            //With the lamdba expression is just to select all
        }

        public async Task<ServiceResponse<GetCharacterDTO>> filterByID(int id)
        {
            var characters = _characters.Find(x => x.Id == id);
            if (characters == null)
                return new ServiceResponse<GetCharacterDTO>() { Data = null, Success = false, Message = "Character not Found" };
            return new ServiceResponse<GetCharacterDTO>() { Data = _mapper.Map<GetCharacterDTO>(characters) };
            //Mapping from Character to DTO
        }

        public async Task <ServiceResponse<List<GetCharacterDTO>>> getAll()
        {
            return new ServiceResponse<List<GetCharacterDTO>>() { Data = _characters.Select(x => _mapper.Map<GetCharacterDTO>(x)).ToList()};
        }

         public async Task<ServiceResponse<GetCharacterDTO>> UpdateCharacter(UpdateCharacterDTO updatecharacter)
        {
            Character character = _characters.Find(x => x.Id == updatecharacter.Id);
            if (character == null)
                return new ServiceResponse<GetCharacterDTO>() { Data = null, Success = false, Message = "That character dont exist" };

            //Updating the properties with the mapper
            _mapper.Map(updatecharacter,character);

            //Mapping the data
            return new ServiceResponse<GetCharacterDTO>() { Data = _mapper.Map<GetCharacterDTO>(character) };
        }

        public async Task<ServiceResponse<GetCharacterDTO>> deleteCharacter(int id)
        {
            var res = _characters.Find(x => x.Id == id);
            if(res == null)
                return new ServiceResponse<List<GetCharacterDTO>>() { Data = null, Success = false, Message = "That character dont exist" };
            _characters.Remove(res);
            return new ServiceResponse<List<GetCharacterDTO>> (){Data = _characters.Select(x => _mapper.Map<GetCharacterDTO>(res))};
        }

        //File Upload
          public async Task<ServiceResponse<List<ImageUpload>>> UploadFile([FromForm] List<IFormFile> files)
        {
            try
            {

                List<ImageUpload> result = new List<ImageUpload>();//Creating a list of ImageUpload
                DateTime dateTime = DateTime.Now;//Creating a DateTime object

                foreach (var file in files)
                {
                    ImageUpload ImageResult = new ImageUpload();//Creating a instance for each one of the imageUpload to not override it.
                    //Creating the FileName
                    var fileName = Guid.NewGuid();//Good Practices with the name of the file
                    var realName = file.FileName;
                    var extension = Path.GetExtension(realName);//Getting the extension

                    //Making the Path and Saving it
                    string pathFileName = Path.GetRandomFileName();
                    var path = Path.Combine("Upload", $"{fileName}{extension}");
                    await using FileStream fs = new(path, FileMode.Create);
                    await file.CopyToAsync(fs);

                    //Adding the result
                    ImageResult.FileName = fileName;
                    ImageResult.FilePath = path;
                    ImageResult.OrginalName = realName;
                    ImageResult.FileType = extension;
                    ImageResult.CreationDate = dateTime;

                    //Adding it in the List
                    result.Add(ImageResult);
                    await _context.imageUploads.AddAsync(ImageResult);
                }
                await _context.SaveChangesAsync();
                return new ServiceResponse<List<ImageUpload>>() { Data = result };

            }
            catch (Exception e)
            {
                return new ServiceResponse<List<ImageUpload>>() { Data = null, Success = false, Message = e.Message };
            }

     public async Task<FileDownload> downloadFile(string filename)
        {
            try
            {
                //Getting the file by the name
                var fileResult = await _context.imageUploads.Where(x => x.OriginalName == filename).FirstOrDefaultAsync();
                //The first who find it will return

                //Getting the path to download
                var path = Path.Combine(_env.ContentRootPath, "Upload", $"{fileResult.FileName}{fileResult.FileType}");

                var memory = new MemoryStream();
                using (var stream = new FileStream(path, FileMode.Open)) //Open the file and saving it
                {
                    await stream.CopyToAsync(memory);//Copy in the memory

                }
                memory.Position = 0;//In the first position is save

                return new FileDownload() { FileName = fileResult.OriginalName, FileType = fileResult.FileType, Memory = memory, Path = path };
                //Saving it in the FileDownload model.

            } catch (Exception e)
            {
                return new FileDownload() {Error = true };
            }
        }

    }
```

> The content root path is the absolute path to the directory that contains the application content files.

> The web root path is the absolute path to the directory that contains the web-servable application content files.

> Path.Combine() method to construct a physical file path to a specific file or directory.

> FileDownload is the model where the data is divided and save.

# AutoMapper Profiles

> You can create more than one profile for the DTOS, if the class dont have to many changes.

```c#
 public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<Character, GetCharacterDTO>();
            //Character with th e DTO
            CreateMap<AddCharacterDTO,Character>();
            CreateMap<UpdateCharacterDTO,Character>();
        }

    }
```

> But in this example is just one class with all the profiles

> The CreateMap have an order beware of that.

# DTO / Mapper in the controller

```c#
 public class CharacterController : ControllerBase
    {
        private readonly ICharacterService _CharacterService;

        public CharacterController(ICharacterService characterService)
        {
           _CharacterService = characterService;
        }

        [HttpGet("getAll")]
        public async Task<ActionResult<ServiceResponse<List<GetCharacterDTO>>>> getCharacter()
        {
            return Ok(await _CharacterService.getAll());
        }

        [HttpGet("filter/{id}")]
        public async Task<ActionResult<ServiceResponse<GetCharacterDTO>>> filterID(int id)
        {
            return Ok(await _CharacterService.filterByID(id));
        }

        [HttpPost("AddCharacter")]
        public async Task<ActionResult<ServiceResponse<List<GetCharacterDTO>>>> addCharacter(AddCharacterDTO character)
        {
            return Ok(await _CharacterService.AddCharacter(character));
        }

        [HttpPut("update")]

        public async Task<ActionResult<ServiceResponse<GetCharacterDTO>>> updateCharacter(UpdateCharacterDTO updateCharacter)
        {
            //Saving the response in a variable
            var response = await _CharacterService.UpdateCharacter(updateCharacter);
            if (response.Data == null)//If Data is Null is going to throw a badRequest (400)
                return BadRequest(response);
            return Ok(response);//Else a Ok response
        }
        [HttpDelete("delete/{id}")]
        public async Task<ActionResult<ServiceResponse<List<GetCharacterDTO>>>> deleteCharacter(int id)
        {
            var response = await _CharacterService.deleteByID(id);
            if (response.Data == null)
                return NotFound(response);
            return Ok(response);
        }

        [HttpPost("upload")]
        public async Task<ActionResult<ServiceResponse<List<FileUpload>>>> uploadFile(List<IFormFile> files)
        {
            return Ok(await _CharacterService.uploadFile(files));
        }

        [HttpGet("download/{filename}")]
        public async Task<IActionResult> DowloadFile(string filename)
        {

            var result = await _fileService.downloadFile(filename);//Waiting the result
            var contentType = new FileExtensionContentTypeProvider();//ContentType to download

            if (!contentType.TryGetContentType(result.FileType, out var defaultType))//Getting the ContentType
            {
                defaultType = "application/octet-stream";//ContentType by default with this just download the file
            }

            if(result.Error == true)
                return BadRequest(result);
            return File(result.Memory,defaultType, Path.GetFileName(result.Path));//Returning and Downloading the file
        }
    }
```

> The Content Type is important with this you can download files.
