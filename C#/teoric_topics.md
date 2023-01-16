# Transient vs Scoped vs Singleton

```c#
builder.Services.AddSingleton(interface_name,class_name);
// Singleton is a single instance for the lifetime of the application domain.

builder.Services.AddScoped(interface_name,class_name);
//Scoped is a single instance for the duration of the scoped request, which means per HTTP request in ASP.NET.

builder.Services.AddTransient(interface_name,class_name);
//Transient is a single instance per code request.
```

> Singleton is always one to be the same

> Scoped is going to be different per http request but is always the same

> Transient is always going to be different
