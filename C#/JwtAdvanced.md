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
public string GenerateURL(string code,string controller,string method,string uid = "")
{
   //var code = await _manager.GeneratePasswordResetTokenAsync(user);

 //var email_body =
//    "Please confirm to change the password address <a href =\"#URL#\">Click here</a>";

var callback_url = "";

if (uid != "")
 {
       callback_url = _http.HttpContext.Request.Scheme + "://" + _http.HttpContext.Request.Host
           + _url.Action(method, controller, new { code = code, uid = uid });
 }
 else
{
     callback_url = _http.HttpContext.Request.Scheme + "://" + _http.HttpContext.Request.Host
           + _url.Action(method, controller, new { code = code });
 }


 return callback_url;

   /*
   builder.Services.AddUrlHelper();
   builder.Services.AddHttpContextAccessor();
   */
}
```

> This for me work more with MVC but just an api is better a code to verify the email.

> have to inject the httpContextAcccesor and the UrlHelper.

> can use other optional chaining to generate code according to your needs, or can generate the code in the method of the service.

# Reset Password

```c#
 //With the userManager can reset the password with this
 public bool ResetPassword(ResetPasswordModel request)
 {
    var userEmail = await _manager.FindByEmailAsync(request.Email);
    if (userEmail == null)
     {
       //Create an error if the user dont exists
     }

     var code = /*get the code from the db, save it like a token*/
     if(code == null)
     {
        //Errors if the code dont exists
     }


   var resetPassword = await _manager.ResetPasswordAsync(userEmail,code,request.Password);

   /*
   This function need:

   the user (IdentityUser)
   the code generate
   the new password for the user
   */

    return resetPassword.Succedded;

    //and in the service do something for the case for true or false.
 }
```

> with this the user can reset the password

> the ResetPasswordModel need the email and the new password from the user and in the database save the code, the user-email and the other usual stuffs.

# Facebook AUTH

```c#
//program.cs
builder.Services.AddAuthentication().AddFacebook
(
    options =>
    {
        options.AppId = "app_id";
        options.AppSecret = "app_secret";
    }
);
```

> Have to make an account in meta developers, later create a product, later have to search in the login with facebook the basisc config to put the url of the page.

> Have to install a nugget (Auth.Facebook)

> note : have to inject the signInManager

# Google Auth

1. Have to go to google cloud console and create a new project.

2. Have to search the Api Libray and search for Google+Api and activate it.

3. Create the consent screen

4. Go to credentials and seacrh for create credentials of OAuth

5. App Types (Web Type)

6. Javascript origin , just put the localhost

7. In the Authorized redirect URIs have to put example:(https://localhost:44388/signin-google)

8. Take the credentials and install the nugget

```c#
//program.cs
builder.Services.AddAuthentication().AddGoogle
(
    options =>
    {
         options.ClientId = "Client_Id";
         options.ClientSecret = "Secret_id";
    }
);
```

# Method AuthOutsiders

```c#

[HttpPost]
[ValidateAntiForgeryToken]

public async Task<AuthResponse> Outsiders()
{
    var schems = await signInManager.GetExternalAuthenticationSchemesAsync();
    //Its a IEnumerable can iterate with it to get the names of providers

    /*
    forEach(var i in schems)
    {
        Console.WriteLine($"{i.Name} , etc...")
        //Get all the names
    }
    */

    var urlCallback = _url.generateURL("Account","AuthOutsiders", "", returnUrl);
    //by default the url just contain the controller and the method and the returnUrl is null
    var properties = _signIn.ConfigureExternalAuthenticationProperties(provider, urlCallback);
    //this are the auth properties
    return Challenge(properties,provider);
    /*
    This return a ChallengeResult , A ChallengeResult is an ActionResult that when executed, challenges the given authentication schemes' handler. Or if none is specified, the default challenge scheme's handler.
    */
}
```

> More info about ChallengeResult https://stackoverflow.com/questions/45186432/what-does-challenge-term-stand-for

> The controller just return the challenge or the IActionResult methods

# CallbackMethod

```c#
      [HttpGet]
      [AllowAnonymous]

        public async Task<IActionResult> OutsiderCallback(string returnUrl = null,string error = null)
        {
            //The url by default is going to be ("/")
            returnUrl = returnUrl ?? Url.Content("~/");

            if (error != null) //error is just for catch errors that can happen
            {
                //return some alert
            }

            //going to get some info about the user (like name,email,etc..)
            var info = await _signIn.GetExternalLoginInfoAsync();
            if (info == null)
            {
                //return the redirect to something
            }
            //if the user is register is going to log in
            var result = await _signIn.ExternalLoginSignInAsync(info.LoginProvider,info.ProviderKey,isPersistent:false);
            if (result.Succeeded)
            {
                //Update the access tokens
                await _signIn.UpdateExternalAuthenticationTokensAsync(info);
                //return the redirect url to something
            }
            else
            {
                //if the user is first time log in have to do this phase

                /*
                -- This is MVC but is the same for a auth api
                ViewData["returnUrl"] = returnUrl;
                ViewData["LoginProvider"] = info.ProviderDisplayName;
                */
                //Getting the name and the email (in the claims are the provider Key,the name and the email)
                var email = info.Principal.FindFirstValue(ClaimTypes.Email);
                var name = info.Principal.FindFirstValue(ClaimTypes.Name);
                //Sedding to another method/view with the email and name to save it in the DB
                return View(nameof(AuthOutsiderResult), new AuthOutsider {Email = email , Name = name });
            }
        }
```

# Creating the user by the data the auth offer

```c#
//AoutsiderResult.cs
        [HttpPost]
        [AllowAnonymous]

        //AuthOutsiderResult just have email and name
        public async Task<IActionResult> AuthOutsiderResult(AuthOutsider request,string returnUrl = null)
        {
            //path by default "/"
            returnUrl = returnUrl ?? Url.Content("~/");

            if (ModelState.IsValid)
            {
                //Getting the loginProvider and the providerKey
                var info = await _signIn.GetExternalLoginInfoAsync();
                if (info == null)
                {
                    //return some error
                }

                //Creating the user with the given data
                var user = new IdentityUser() {UserName = request.Name,Email = request.Email,EmailConfirmed = true};
                var result = await _manager.CreateAsync(user);

                if (result.Succeeded)
                {
                    //Verify the external login and the add the login
                    result = await _manager.AddLoginAsync(user,info);
                    if(result.Succeeded)
                    {
                        //log the user by default
                        await _signIn.SignInAsync(user,isPersistent:false);
                        //update the access token
                        await _signIn.UpdateExternalAuthenticationTokensAsync(info);
                        return LocalRedirect(returnUrl);
                    }
                }
                //Putting the errors in the view
                _helper.validatingErrors(result);
            }
            //If the modelState is invalid is going to return to same url and put the errors
            ViewData["returnUrl"] = returnUrl;
            return View(request);
        }
```

> With this method can do the same for twitter auth or github or instagram

> With just this method are both done (Facebook and Google Auth).
