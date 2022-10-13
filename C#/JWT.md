# Json Web Tokens

> Is an open standard used to share security information between two parties a client and a server.

> This is use for the user authentication.

> Salt: comprises random bits that are used as one of the inputs to a key derivation function.

> Hash: is a code that is obtained after applying a special algorithm to a text string.

```c#
//SecurityService.cs
 public class SecurityService : ISecurityServices
    {
        //This for getting info from the json
        private readonly IConfiguration _configuration;
        public SecurityService(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512())
            {
                //Creating the passwordSalt
                passwordSalt = hmac.Key;
                //Creating the passwordHash (enconding the password boths)
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        public string CreateTokenJWT(User user)
        {
            //Making the claims
            List<Claim> claim = new List<Claim>()
            {
                new Claim(ClaimTypes.Name,user.Username)
            };

            //Making the SecurityKey
            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(_configuration.GetSection("AppSettings:Token").Value));

            //Making the Credentials
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            //Making the Token
            var token = new JwtSecurityToken
                (
                    claims: claim,
                    //When the Token is going to expire
                    expires: DateTime.Now.AddDays(1),
                    signingCredentials: creds
                );

            //Making the jwtHandler
            var jwt = new JwtSecurityTokenHandler().WriteToken(token);

            return jwt;
        }

        public bool VerifyPasswordHash(string password, byte[] passwordSalt, byte[] passwordHash)
        {
            using (var hmac = new HMACSHA512(passwordSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                return computedHash.SequenceEqual(passwordHash);
                /*
                 return computedHash == passwordHash;
                This is just return true or false if the computedHash that is given is equal to the passwordHash
                 */
            }
        }
    }
```

> This just to encrypt , register and verify a user , this also have a UserService in the repository is the code.

> When you make the securityKey(AppSettings:Token) just search a HASH 128bits mader to do it.

> Some things need that you import it or install a Nuget.

> More info about the code "insert url here"

# Authorize && AllowAnonymous Attributes

```c#
[HttpGet("get"),Authorize]//This is only for the autenticated users.
[HttpGet("get"),AllowAnonymous]//This is for allow all the user use this
```

> Obviously this is in the controller, you can put authorize in the controller too for the same reason.

# Adding the authentication to the program.cs

```c#
//program.cs
// Adding the Authentication
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        //Adding the TokenValidation Parameters
    options.TokenValidationParameters = new TokenValidationParameters
    {
        //Parameters
        ValidateIssuerSigningKey = true,
        //Giving the security key
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8
            .GetBytes(builder.Configuration.GetSection("AppSettings:Token").Value)),
        ValidateIssuer = false,
        ValidateAudience = false,
        };
    });

//This have to be above of authorization to prevent some errors
app.UseAuthentication();

app.UseAuthorization();
```

> Have to install and import JwtBearer and have to import TokenValidation Parameters.

> With this the Authorize property is not going to have problems.

# Adding the Authorization header to Swagger (To test purpose)

```c#
builder.Services.AddSwaggerGen(options =>
{
    //Adding the Authentication Header
    options.AddSecurityDefinition("oauth2", new OpenApiSecurityScheme
    {
        //Adding some descriptions and other stufss
        Description ="Standard Authorization header using the Bearer Scheme(\"bearer {token}\")" ,
        In= ParameterLocation.Header,
        Name="Authorization",
        Type = SecuritySchemeType.ApiKey
    });
    //Lastly adding the operation filter
    options.OperationFilter<SecurityRequirementsOperationFilter>();
});
```

> With Angular or another framework have to add the authorization header.

> Angular(https://stackoverflow.com/questions/47400929/how-to-add-authorization-header-to-angular-http-request)

> With this you only have to put the Token that gave you the login part and have to put bearer tokenLogin.

> This is to access the controller that need authorization.

# Adding the Role Part

```c#
[HttpPost("fileUpload"),Authorize(Role = "Admin")]
//With this you are putting the role that the user must have to enter.

//In the claims
//When is going to create the claim , is going to put the role automatic
List<Claim> claim = new List<Claim>()
{
    //Static role for all the users
    new Claim(ClaimTypes.Role,"Noob")
    //ClaimTypes.NameIdentifier(ID)
};

```

> The Claims are just what the Token is going to have like name, Roles etc...

> The Roles have to be the same to pass the authorization.

# Read Claims in the Service

```c#
//Have to add in the program.cs
builder.Services.AddHttpContextAccessor();

//Have to inject in the service
private readonly IHttpContextAccessor _contextAccessor;

//In the method
public ServiceResponse<object> getUser()
{
     //Acceding to the user claims
     var user = _contextAccessor.HttpContext.User;
     var userName = user.Identity.Name;//Getting the name of the log person
     //user.FindFirstValue(ClaimTypes.Name);
     var role = user.FindFirst(ClaimTypes.Role).Value; //Gettting the role of the person
     //Returning the name of the log user
     return new ServiceResponse<object>() { Data = new {userName,role}};
}
//And just use normally in the controller , the method need to have authorize.
```

> With just the controller is Just put User?.Identity?.Name and return that result and must have authorize , in the case of using a service have to do the things above.

# Refresh Tokens

```c#
/*
1. Have to make a new Model with prop of Token(string),Created(DateTime.Now) and Expired(DateTime)
2. Add new props to the User RefreshToken(string),CreatedToken(DateTime.Now) and ExpiredToken(Token)
*/

//Security Service
// Have to Inject the IHttpContextAccessor
       public RefreshToken generateRefreshToken()
        {
            //Creating the refreshToken
            var refreshToken = new RefreshToken
            {
                //Creating the Token
                Token = Convert.ToBase64String(RandomNumberGenerator.GetBytes(64)),
                Expired = DateTime.Now.AddDays(7),
                Created = DateTime.Now
            };

            return refreshToken;
        }

        public CookieOptions SetRefreshToken(RefreshToken newrefreshToken)
        {
            //Adding the CookieOptions
            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Expires = newrefreshToken.Expired
            };
            //Adding the Response to the cookie
            _http.HttpContext.Response.Cookies.Append("refreshToken", newrefreshToken.Token, cookieOptions);

            return cookieOptions;
        }
//User Service
//Login Method
//Generating the refresh Token
        var refreshToken = _security.generateRefreshToken();
        //Set the CookieOptions and the new Token
        var setRefreshToken = _security.SetRefreshToken(refreshToken);
        //Updating the Values
        userFound.RefreshToken = refreshToken.Token;
        userFound.TokenCreated = refreshToken.Created;
        userFound.TokenExpires = refreshToken.Expired;
```

> userFound is the user that access in the login.

# Validanting the refreshing Token and Making a new One

```c#
//In the User Service make a method RefreshToken
var refreshToken = _contextAccessor.HttpContext.Request.Cookies["refreshToken"];//Getting the token
 try
        {
           if (user == null)
               return new ServiceResponse<string>() { Message = "Please Log In", Success = false };
           //Finding the User
           var userFound = users.Where(x => x.Username == user).FirstOrDefault();
           //Some Validations
           if (!userFound.RefreshToken.Equals(refreshToken))
               return new ServiceResponse<string>() { Message = "Invalid Refresh Token" };
           if (userFound.TokenExpires < DateTime.Now)
               return new ServiceResponse<string>() { Message = "Token Expired", Success = false };
           //Creating the Token and Refreshing The Token (Cokkie)
           string Token = _security.CreateTokenJWT(userFound);
           var newRefreshToken = _security.generateRefreshToken();
           //Set the CookieOptions and the new Token
           var setRefreshToken = _security.SetRefreshToken(newRefreshToken);
           //Updating the Values
           userFound.RefreshToken = newRefreshToken.Token;
           userFound.TokenCreated = newRefreshToken.Created;
           userFound.TokenExpires = newRefreshToken.Expired;

                 return new ServiceResponse<string>() { Data = Token };
          }
            catch (Exception e)
          {
                return new ServiceResponse<string>() { Message = e.Message, Success = false };
          }
```

> More Info https://github.com/Szxro/JWTApi
