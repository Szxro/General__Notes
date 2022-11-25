# Adding the Authentication (Program.cs)

```c#
//Adding the JWT Authentication
builder.Services.AddAuthentication(options =>
{
    //Updating the defaults options with JWT
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
    //Adding the JWT Middleware
    .AddJwtBearer(jwt =>
{
    //Getting the Key and Enconding it
    var key = Encoding.ASCII.GetBytes(builder.Configuration.GetSection("JWTOptions:Key").Value);

    //Options JWT
    jwt.SaveToken = true; //Saving the Token after a successfully login
    jwt.TokenValidationParameters = new TokenValidationParameters()
    {
        //Checking the credentials
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(key),
        ValidateIssuer = false, //for dev
        ValidateAudience = false,
        RequireExpirationTime = false, //for no expiration (by the moment)
        ValidateLifetime = true
    };
});
```

> Have to install JwtBearer Nuget and Identity.

> The key is localted in the app.settingjson (just use a random string generator).

> Is better to save that key in a service like vault key (azure).

> Use Identity to save some time.

# Creating The token (login)

```c#
public string GenerateJwtToken(IdentityUser request)
        {
            var jwtTokenHandler = new JwtSecurityTokenHandler();
            //Getting the key and encoding it
            var key = Encoding.ASCII.GetBytes(_config.GetSection("JWTOptions:Key").Value) ;

            //Token Descriptor
            var tokenDescriptor = new SecurityTokenDescriptor()
            {
                Subject = new ClaimsIdentity(new[]
                {
                    //Creating a Custome Claim Property
                    new Claim("uid", request.Id),
                    new Claim(JwtRegisteredClaimNames.Name, request.UserName),
                    //Generating a guid for all the user
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                }),
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256)
            };
            //Creating the token with the Token Descriptor
            var token = jwtTokenHandler.CreateToken(tokenDescriptor);
            //Writing the token (converting the token to string)
            var jwtToken = jwtTokenHandler.WriteToken(token);

            return jwtToken;
        }
```

> Is the same way but with some changes.

> Have to use IConfiguration to get the key

> If you put DateTime.Now it will throw an error

> Need to install IHelper Nugget and add it like the HttpAccessor in the program.cs.

> Verify the connection string have a need part , that have to put it to solve an error.

> In this Api was use the MailJet

# Generate Confirmation Url

```c#

```

> This for me work more with MVC but just an api is better a code to verify the email.
