# Fluent Validation

```c#
//UserValidator.cs
 public class UserValidator : AbstractValidator<User>
    {
        public UserValidator()
        {
            //This is just to no be null or empty
            RuleFor(c => c.Name).NotNull().NotEmpty().WithMessage("The Name field must be fill");
            //The must part is like a if and the result of it must be true to pass
            RuleFor(c => c.Name).Must(x => x?.StartsWith("S") == true).WithMessage("The Name fill need a S");
            //WithMessage show a message
            RuleFor(c => c.Number).NotNull().WithMessage("The Number Field must be fill");
            RuleFor(c => c.Number).NotEqual(0).WithMessage("The Number must be higher than zero");
            RuleFor(c => c.LastName).NotEmpty().NotNull().WithMessage("The LastName Field must be fill");
        }
    }
//Program.cs
builder.Services.AddScoped<IValidator<User>, UserValidator>();
//Like a Services But in the IValidatot have to put the class that is validating the UserValidator

//User.Service
//Have to inject it
 private readonly IValidator<User> _validator;
 //and inject it in the ctor

 //Using it
 public async Task<ServiceResponse<List<User>>> postAUser(user request)
 {
            var errors = new List<ErrorList>() { };//Just to save the errors
            var validation = await _validator.ValidateAsync(request); //You can use with a DB
            //Validate(Synchronous / Asynchronous)
            if (!validation.IsValid)//return true or false
            {
                //validation.Errors = dictionary
                foreach (var e in validation.Errors)
                {
                    var error = new ErrorList() { ErrorField = e.PropertyName,ErrorDescription = e.ErrorMessage };
                    errors.Add(error);
                }
                return new ServiceResponse<List<User>>() { errors = errors, Message = "Something Happen", Success = false };
                //Errors is a IEnumarable<ErrorList>
            }
 }
```

> Are two ways one with the Nuget and the other hand by dotnet command

> dotnet add package FluentValidation.AspNetCore or dotnet add package FluentValidation

> Exist Other form but this is the form that are using with dependency injection to ther services.

> Documentation https://docs.fluentvalidation.net/en/latest/
