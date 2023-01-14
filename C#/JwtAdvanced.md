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
            //For the 2FACTORAUTH
            if (result.RequiresTwoFactor)
            {
                return RedirectToAction("Verify2FactorCode", new {returnUrl = returnUrl});
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

# Two Factor Authentication

```c#
[HttpGet]
 public async Task<IActionResult> ActivateTwoFactor()
    {
     //Obtaining the user by the claims
    var user = await _manager.GetUserAsync(User);
    //reseting the auth key
    await _manager.ResetAuthenticatorKeyAsync(user);
    //gettting the token for the 2FAUTH
    var token = await _manager.GetAuthenticatorKeyAsync(user)
    var twoAuth = new _2FAUTHModel() { Token = token };

    return View(twoAuth);
    }

/*
2AUTHMODEL
 public class _2FAUTHModel
    {
        [Required]
        public string Code { get; set; } = string.Empty;

        //Token for activate the 2FAUTH
        public string Token { get; set; } = string.Empty;
    }
*/
```

> For activate the 2Factor have to give the token to atutenticator (google,microsoft), download the app , in microsoft autenticator create a new account - others - enter code manually and just put an account name and the code that the method give.

# Create method to active the 2Factor

```c#
[HttpPost]
 public async Task<IActionResult> EnableTwoFactor(_2FAUTHModel request)
        {
            if (ModelState.IsValid)
            {
                //Getting the user
                var user = await _manager.GetUserAsync(User);
                //Getting the tokenProvider
                var tokenProvider = _manager.Options.Tokens.AuthenticatorTokenProvider;
                //bol to verify the code given
                var success = await _manager.VerifyTwoFactorTokenAsync(user, tokenProvider, request.Code);

                if (success)
                {
                    //enable the 2FACTOR
                    await _manager.SetTwoFactorEnabledAsync(user, true);
                }

                if (!success)
                {
                    ModelState.AddModelError(string.Empty, "The given code is invalid");
                }
            }

            return View(nameof(ConfirmTwoFactor));

        }
```

> In this part the user have to enter the token in the app , and wait till it generate a code and give the code in the input to pass and enable the two factor auth.

> A dummy view is going to appear when the user past , to let it know that the 2Factor was activated

# Verify2FactorCode MethodGet

```c#
 [HttpGet]

        public async Task<IActionResult> Verify2FactorCode(bool remenberMe,string returnUrl = null)
        {
            //Getting the user with the TwoFactor
            var user = await _signIn.GetTwoFactorAuthenticationUserAsync();
            if (user == null)
            {
                return View("ErrorView");
            }

            ViewData["returnUrl"] = returnUrl;
            //the code have the user give it
            return View(new VerifyData2FactorModel() {returnUrl = returnUrl, RemenberMe = remenberMe });
        }

/*
    Model VerifyData2FactorModel
      [Required]
        //The given code from the app
        public  int Code { get; set; }

        //the given returnUrl
        public string returnUrl { get; set; } = string.Empty;

        //bool to remenber the account
        public bool RemenberMe { get; set; }
*/
```

> When the user log again a view is going to appear to put the a code from the authenticator, put the code verify it and let it pass if its correct.

# Verify2FactorCode MethodPost

```c#
        [HttpPost]
        [ValidateAntiForgeryToken]
        [AllowAnonymous]
        public async Task<IActionResult> Verify2FactorCode(VerifyData2FactorModel request)
        {
            //returnUrl to redirect the user by default is just the home page ("/")
            request.returnUrl = Url.Content("~/");
            if (!ModelState.IsValid)
            {
                return View(request);
            }

            //Verificating the code and given a reesponse
            var result = await _signIn.TwoFactorAuthenticatorSignInAsync(request.Code,request.RemenberMe,rememberClient:true);
            /*
            await _signIn.TwoFactorAuthenticatorSignInAsync(code,bool(remenberMe),remeberClient(bool))
            true = the user dont need to log in again in the same device that log in last time
            false = the user need to log again with authenticator app
            */

            if (result.Succeeded)
            {
                return LocalRedirect(request.returnUrl);
            }

            if (result.IsLockedOut)
            {
                return View("Locked");
            }

            if (!result.Succeeded)
            {
                ModelState.AddModelError(string.Empty, "Invalid Code");
                return View(request);
            }

            return View(request);

        }
```

# Implement QR Code

```c#
//In the activate two factor have to put this string

//formatUrl for the qrCode (BE AWARE OF THE STRING HAVE TO BE THE SAME TO NOT ERRORS)
string formatUrl = "otpauth://totp/{0}:{1}?secret={2}&issuer={0}&digits=6";
//In the Model of the method have to put other prop UrlQR/string

//generating the url of the qr
var urlQr = string.Format(formatUrl, _urlEnconder.Encode("Auth_App"), _urlEnconder.Encode(user.UserName), token);
//in the model save it

//For use of it have to download the zip of this site: https://davidshimjs.github.io/qrcodejs/

//In the ActivateTwoFactor.cshtml view are have to setup the qr with the urlQr

```

# Activate/Desactivate the 2FactorAuth

```c#
  public async Task<IActionResult> DesactivateTwoFactor()
        {
            //Obtaining the user by the claims
            var user = await _manager.GetUserAsync(User);
            //reseting the auth key
            await _manager.ResetAuthenticatorKeyAsync(user);
            //desactivating the user 2FA
            await _manager.SetTwoFactorEnabledAsync(user, false);
            //Redirecting to the main page
            return RedirectToAction(nameof(Index),"Home");
        }
```

# Basic Authorization

```c#
// if you put above the class controller the folowing (protect or allow all the user to have access)
[Authorize] // the user need to be authorize
[AllowAnonymous] // all user can enter
[Authorize(Role = "Admin")] // just the user with role of manager can enter
[Authorize(Role = "Admin,User")] // multiple roles
```

> but if you put another [Authorize/AllowAnonymous] it will replaced the above one

# Creating roles && assign roles

```c#
 //Verifing if the roles dont exist to create it
            if (!await _roleManager.RoleExistsAsync("Admin"))
            {
                //This method need a new instance of IdentityRole
                await _roleManager.CreateAsync(new IdentityRole("Admin")); //Creating the role
            }


            if (!await _roleManager.RoleExistsAsync("User"))
            {
                await _roleManager.CreateAsync(new IdentityRole("User"));
            }

// Assign roles
await _manager.AddRoleAsync(user,"name_of_the_role");
// This have to be in the normal register and in the outsider result (Facebook / Google Auth)

await _manager.AddRolesAsync(user,INumerable<string>);
// Putting multiples roles to the user

//Getting the role from a user
await _manager.GetRolesAsync(user); //Get all the roles from the user (IEnumerable)
// can use to User.IsInRole("Admin") // But maybe this only works in Razor / User = User.PrincipalClaims

//Getting alll the roles from the DB
var roles = await _roles.Roles.ToListAsync();

//Finding and updating the role
var role = await _roles.FindByIdAsync(id); ///Finding the role by id or name
role.name = request.name;
var result = await _roleManager.UpdateAsync(role); //it need a identityRole to update it
//result = IdentityResult

//Deleting a role
var result = await _role.DeleteAsync(role); //need a IdentityRole
//result = IdentityResult
/*
delete role that assigned to user -> AspNetUserRoles
delete role's claims -> AspNetRoleClaims
delete role itself -> AspNetRoles
*/

//Deleting a User from a Role
await _manager.RemoveFromRoleAsync(user,role_name);
```

> The userManager (add the roles , can add multiple roles passing a Inumerable<string>,remove and update the role of the user)

> the roleManager (create the roles and some other functions)

> The id generate in the aspnetusers is a geo id is id created by the SQL Server

# Cookies Options

```c#
builder.Services.ConfigureApplicationCookie(options =>
{
    //To redirect to some endpoint
    options.LoginPath = new PathString("/Account/Login");
    options.AccessDeniedPath = new PathString("/Account/Locked");
});
```

# Protect the token given to the user

```c#
[ValidateAntiForgeryToken] //requires a token for requests to the action methods it marks, including HTTP GET requests.
```

# Lock and Unlock Users

```c#
   //lock the user or unlock it
    var loc3 = await _manager.SetLockoutEnabledAsync(user, true); // (user,false) unlock

   //Put the lockout date for the user (user,time) => the result is a identity result
    var lock4 = await _manager.SetLockoutEndDateAsync(user,DateTime.Now.AddMinutes(1));
    //Unlocking it just put the DateTime.Now

   //return true if the user is have enabled lockout
   var lock1 = await _manager.GetLockoutEnabledAsync(user);

   //return the date of the lockout
    var lock2 = await _manager.GetLockoutEndDateAsync(user);
```

# Delete User From the DB

```c#
// with this easily delete the user data but the problem, it have to be to delete in cascade
var result = await _manager.DeleteAsync(user);
```

> Alternaty Way : https://stackoverflow.com/questions/23977036/asp-net-mvc-5-how-to-delete-a-user-and-its-related-data-in-identity-2-0

# Claims (Policy)

```c#
// static class for the claims

public static class userClaims
{
    public static List<Claim> claimList = new List<Claim>()
    {
        new Claim("claim_name","claim_name")
    };
}

//This is just static claims for the user

//In a method get the user

var claims = await _manager.GetClaimsAsync(user); //Getting the user claims

var remove = await  _manager.RemoveClaimsAsync(user,IEnumerable<Claim);// Remove a list of claims from a specific user
//RemoveClaimAsync = Remove a single claim

var addClaims = await _manager.AddClaimsAsync(user,IEnumerable<Claim>); // Add a list of claims to the user
```

# Authorization by claims

```c#
//Policy like Role mode

//its not like the role have to configure it in the program.cs
[Authorize(Policy = "Administrador")]

//program.cs
builder.Services.AddPolicy(options=>
{
    //With this it will work the same as [Authorize(Role = "Administrador")]
    options.AddPolicy("Administrador",policy => policy.RequireRole("Administrador"))
    //in the controller [Authorize(Policy = "Administrador")]

    //Two Roles
    options.AddPolicy("AdministradoryUsuario",policy=> policy.RequireRole("Administrador").RequiredRole("Usuario"))
    //if the user have that policy must have the following roles
})

//Using the claims (in the builder)
options.AddPolicy("Administrador",policy=> policy.RequireRole("Admin").RequiredClaim("Add","True"));
//with this the user need to have the role Admin and the following claims to access (can add more than one claim)
```
