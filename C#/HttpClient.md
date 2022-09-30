# HTTPClient

# Get (Console)

```c#

   public class Program
    {
        static async Task Main(string[] args)
        {
            string url = "https://localhost:7286/api/File/GetAll";

            using var client = new HttpClient();//Is IDisposable must use  using in this case

                var response = await client.GetAsync(url);//Making a Get
                try
                {
                    if (response.IsSuccessStatusCode)
                    {
                       var responseData = await response.Content.ReadAsStringAsync();//Getting the content of the response
                       var responseResult = JsonSerializer.Deserialize<ServiceResponse<ReponseResult>>(responseData,new JsonSerializerOptions() {PropertyNameCaseInsensitive = true });
                       //Must import text.Json
                       //This is just to make the response and save it in a model
                       //The options and that property is just to the case of the words
                    }
                }
                catch(Exception e)
                {
                    Console.WriteLine(e.Message);
                }
            }

        }

```

# Models

```c#
 public class ReponseResult
    {
        public Guid? FileName { get; set; }

        public string OriginalName { get; set; }
    }
    public class ServiceResponse<T>
    {
        //List<T>
        public IEnumerable<T> Data { get; set; }
    }
```

> If the result of the response have a object and in there and array of object you only have to make two objects (classes) one for the principal data (Data) and the other fo the data that contain (ResponseResult).

# PostAsync && PostAsJsonAsync

- PostAsJsonAsync (izi way)

```c#
//Thi is just a normal model of Person
using var client = new HttpClient();
var person = new Person(){Name ="Juan"};
//The id is autoincrement
var response = await httpClient.PostAsJsonAsync(url,person);
//It need the url and the data
var bodyResponse = await response.Content.ReadAsStringAsync();
//Getting the response of the post
Console.WriteLine(bodyResponse);
```

> Must import a .net.Http.json

> Always it post a JSON.

> When you send just a JSON you can use this way.

- PostAsync

```c#
using var client = new HttpClient();
var person = new Person(){Name ="Juan"};
//Have to make it a string
var personSerialize = JsonSerializer.Serialize(person);
//Content-type what are you going to send
var content = new StringContent(personSerialize,Enconding.UTF8,"aplication/json");
//stringSerialize,Enconding must import it,"data conten = what type of data you are going to send".
var response = await client.PostAsync(url,content);
//need the url and the content-type
//And just to see the resul just do a get request
```

> This is when you dont have to send a JSON.

# Dictionary Errors (User Friendly)

```c#
public class Utitlity
{
    public static Dictionary<string,List<string>> extractErrors(string json)
    {
        var response = new Dictionary<string,List<string>>();
        //Making a Dictionary
        var jsonElement = JsonSerializer.Deserialize<JsonElement>(json);
        //Deserializing the json
        foreach(var error in jsonElement.EnumerateObject())
        {
            var errorsName = error.name;
            //Getting the errors
            var errors = new List<string>();
            //Making a list of errors
            foreach(var errorKind in error)
            {
                var error = errorKind.GetString();
                //Getting the errorKind
                errors.Add(error);
                //add it in the errors list
            }
            response.Add(errorsName,errors);
            //Adding the errosName and the errors Kind
        }
        return response;
    }
}
```

- Using it

```c#
using var client = new HttpClient();
var person = new Person(){Name ="Juan"};
var response = await httpClient.PostAsJsonAsync(url,person);

try
{
    var body = await response.Content.ReadAsStringAsync();
    var errors = Utility.extractErrors(body);
    //Is static just use it wit the class
} cacth(Exception e)
{
    foreach(var error in errors)
    {
        Console.WriteLine($"{error.Key}");
        foreach(var errorKind in error.value)
        {
            Console.WriteLine($"{errorKind}");
        }
    }
}
```

> This just to show the error in a more friendly way to the user.

# SendAsync

```c#
//request type and url
var options = new JsonSerializerOptions(){PropertyNameCaseInsensitive = true };
using(var requestMessage = new HttoRequestMessage(HttpMethod.Get,url))
{
    requestMessage.Headers.Add("headerParam","dataSend");
    var response = await httpClient.SendAsync(requestMessage);
    var content = await response.Content.ReadAsStringAsync();
    var contentResult = JsonSerializer.Deserialize<List<WeatherForecast>>(content,options);
    //Seeing the response.

    //Other request
    var contentResult = JsonSerializer.Deserialize<List<WeatherForecast>>(content,options);
    //Seeing the response.
}
```

> JWT = JsonWebToken

> SendAsync dont affect other requests.

> In the first request is just sending the dataSend and is going to show the result , in the other is no seding nothing it means that the params have a default and is going to show the result with the default params.

> DefaultRequestHeaders is going to affect the other request (be aware of this).

> JWT info https://www.youtube.com/watch?v=pInbqavlcd8&list=PL0kIvpOlieSPMzysCe2jTIxENapz6-Wnl&index=3 (10:57)\

# HTTP PUT && DELETE

```c#

```

>
