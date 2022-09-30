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
