# Identity Terminology

> Its just a framework to do authorization , claims , Roles , Tokens etc...

> Token (JWT) is usually used in the web apis, Single Pages App and IOT and it use to ease the of some services like Google Auth or Facebook..

> Usually the token is send in the header

> The Auth with token when the user logout the token is going to destroy but in the part of Auth with Cookies the value is saved in the Db and is going to remove it from the BD and the Client side when the user logout.

> Architecture Identity: The administractor are high level classes that are use for operations like creating a user. The stores are inferior classes that just keep entityi like the user and their roles.

# What a modern System of Authentication could have

![modern Sytem](./images/modern.PNG)

# What a modern Authorization Sytem could have

![modern authorization](./images/authorization.PNG)

# Making the Connection to the DB with Identity and EFCore

```c#
//The same as EFCore but with some diferents
 public class DataContext : IdentityDbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {

        }

        //Tables (Models)
    }
```

> When you are creating a project you can choose the authentication method to instally created all for you.

> wwwroot are localted the css,lib and the js files. (Asp.Net.Core MVC), Razor Views (Views folder).

> Have to install EFCore and install Identity.EFCore , later have to do the connection with the DB like with EFCore but is not :DbContext is IdentityDbContext

> And do the usual connection to the DB with Connection String and do the usual connection in the Program.cs (EFCore).

> When you the migrations without tables or something , the Data context is inheriting IdentityDbContext and it have some default tables that is going to add to the migration.

# Adding Identity Service to the project

```c#
//Program.cs
// Add services to the container.
builder.Services.AddIdentity<IdentityUser, IdentityRole>().AddEntityFrameworkStores<DataContext>();

//Adding the Authentication (Must be above the Authorization)
app.UseAuthentication();
```

> In the Part of AddEntityFrameworkStores is where the dbContext must stay.
