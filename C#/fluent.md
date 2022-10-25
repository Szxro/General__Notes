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
             RuleForEach(x => x.names)//Just for models that are iterables (array,List,etc..)
                    .ChildRules(x =>
                    {
                        //Setting it to the name part
                        x.RuleFor(c => c.Name).NotEmpty().NotNull().WithMessage("The Child Fild have to be fill");
                        //Is not going to throw the message is going to throw the name field and the error
                    });
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

# Setting a Validator inside another validator

```c#
public class UserValidator : AbstractValidator<User>
    {
        public UserValidator()
        {
            RuleFor(c => c.Name).NotNull().NotEmpty().WithMessage("The Name field must be fill");
           // RuleFor(c => c.Name).Must(x => x?.StartsWith("S") == true).WithMessage("The Name fill need a S");
            RuleFor(c => c.Number).NotNull().WithMessage("The Number Field must be fill");
            RuleFor(c => c.Number).NotEqual(0).WithMessage("The Number must be higher than zero");
            RuleFor(c => c.LastName).NotEmpty().NotNull().WithMessage("The LastName Field must be fill");

            //Children Rules(Array Rules)
            RuleForEach(x => x.names)
                    //Setting up the validator
                    .SetValidator(new UserNameValidator());
        }
    }

///new Validator for that model
    public class UserNameValidator : AbstractValidator<UserName>
    {
        public UserNameValidator()
        {
          RuleFor(c => c.Name).NotEmpty().NotNull().WithMessage("The Child Fild have to be fill");
        }
    }
```

> Just going to throw the same error like above one.

# Making the code more cleaner

```c#
 public class UserValidator : AbstractValidator<User>
    {
        public UserValidator()
        {
            //Using the validators
            Include(new UserSimpleValidator());
            Include(new UserComplexValidator());

        }
    }


    public class UserNameValidator : AbstractValidator<UserName>
    {
        public UserNameValidator()
        {
          RuleFor(c => c.Name).NotEmpty().NotNull().WithMessage("The Child Fild have to be fill");
        }
    }

    //Creating some class apart to the simple part of the model and the complex

    public class UserSimpleValidator : AbstractValidator<User>
    {
        public UserSimpleValidator()
        {
            RuleFor(c => c.Name).NotNull().NotEmpty().WithMessage("The Name field must be fill");
            // RuleFor(c => c.Name).Must(x => x?.StartsWith("S") == true).WithMessage("The Name fill need a S");
            RuleFor(c => c.Number).NotNull().WithMessage("The Number Field must be fill");
            RuleFor(c => c.Number).NotEqual(0).WithMessage("The Number must be higher than zero");
            RuleFor(c => c.LastName).NotEmpty().NotNull().WithMessage("The LastName Field must be fill");
        }
    }

    public class UserComplexValidator : AbstractValidator<User>
    {
        public UserComplexValidator()
        {
            RuleForEach(x => x.names)
                    .SetValidator(new UserNameValidator());
        }
    }
```
