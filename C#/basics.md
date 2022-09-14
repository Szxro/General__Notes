# C#

# Output (Console)

```C#
Console.writeLine('Hello World'); //Write in a new line the message
Console.write('Hello');//Write in the same line the message
Console.Beep(); //Just Beep
Console.ReadKey(); //Is going to way a key to end the program
```

> The Beep part just throw a beep , when the console open.

> Beware ; , you must put that to not have an error.

# Comments

```c#
//Hello World(inline)
/*
Hello World(multiline)
*/
```

# Variables && Const

```c#
//Data Types
int a = 12345; //Integer (Number)
//int a = default(int) 0
string b ="Hello World"; //Text
bool c = true; //boolean
double d = 2.5; //Decimal number
double e =3.5f; //Float Number
char f = '@'; //Single character
int[] a ={1,2,3,4,5,6} //Array of numbers, can be string[](string array) etc.. (inmutable)
byte f = 200; //0-255
sbyte e = -100;//-128 / 127
short g =3000; // -32768 / 32767
ushort h = 6000; // 0 / 65535
/*
More data Types
https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/built-in-types
*/

//Const
const int a = 7;

//Var
var a = 10;
```

> Diff between float and double is the capacity.

> The precision of float is only six or seven decimal digits, while double variables have a precision of about 15 digits.

> The char part must have single quotes ''

> Variables are mutable and const are unmutable.

> You can put default to put the values by defaults of the type like default(int) / default(boolean) etc..

> readonly is just a variable to read.

> private string _hola = "Sebastian" put _ is to say that var is private

> const all in UPPERCASE (name), with space put \_ (NAME_NAME).

> typeof(int/string/etc..) just show the system data type.

> using static System.Console; Just to simplify the use the console.

# Concat

```c#
string a ="Hello";
Console.writeLine('Hello World' + a ); //Concating the string with a value

string b = 'Hello ' + a;

string c = "Sebastian";
Console.writeLine($"Hello {name}");//(`Hello ${name}`)
```

# Type Casting

```c#
//Double to Int
double a =4.5784;

int b = Convert.ToInt32(a); //Convert to int

//Int to String
int a = 4;

string b = a.ToString();

Console.WriteLine(b.GetType()); //return the type of the value (typeof)

double c = 20.0;
int d = (int)c;
```

> Convert have many useful type casting methods to convert the data types of a value.

# User Input (Console)

```c#
Console.WriteLine("What is your name?");
string name = Console.ReadLine(); //Is like a prompt it store the data that the user gave (always return a string)
Console.WriteLine(name);
```

# Basic Arimtehic Operators

```c#
int num = 1;

//increment/decrement
num+=2;//num-=2;
num++;//num--

//multiply
num*=2;//num = num *2;

//divide
num/=2;//num = num *2;

//remainder
int remainder = num % 3; //remainder
```

> When you divide a number , and the number is a integer is going to return an integer even though the division might gave a double. (integer division)

# Math Class

```c#
double x = 3;

double a = Math.Pow(x,2);
//Math.Pow(num,exponent) its going to elevate the number to the exponent (double)

//Math.Sqrt(x) its going to return the square root of the number (double)
//Math.Abs(x) return a positive number
//Math.Round(x) return a rounded the number
//Math.Floor(x) returns the largest integer less than or equal to a number.
//Math.Ceiling returns the smallest integral value greater than or equal to the specified number.

/*
Max && Min
Math.Max(x,y) return the maximimun number
Math.Min(x,y) return the minimun number
*/
```

> Be aware of the double or integer results.

# Random Number

```c#
Random random = new Random(); //Initialazing the class

int num = random.Next(1, 7); //.Next(min,max); 1-6 , 7 is going to exclude this number (integer)

double num2 = random.NextDouble(1,7); //The same but with double numbers

Console.WriteLine(num);
```

# Strings Methods

```c#
string upper = "Hello World".ToUpper(); //toUpperCase();
upper = upper.toLower(); //toLowerCase();

//Replace
string number = "809-789-1132";
number = numer.Replace('-',"/");//Replace(old char,new char); replace a char in the string

//Insert
string name = "Pedro";
name = name.Insert(0,"@");//Insert(index,value); just insert a value in the index

Console.writeLine(name.Length)
Console.WriteLine(upper);

//Substring
name = name.Substring(0,3); //Substring(index,value); index = where to start / value = where to end
//Take a part of the string

bool t = name.Contains("Pedro"); //It Contains Pedro? (true or false)
```

> EndWith() / StartWith() return true or false depends on the value search

> Can use Remove (index,value) to remove a value.

> Split("") divide the string

# DateTime

```c#
Datetime date = new Datetime(); //With this you can use differents methods.
date = Datetime.Now;//Changing the value to the date now
/*Can use in this form in a string*/

Console.WriteLine(date.Day); //Just show positions of the days

Datetime dateNow = Datetime.now; //Show the currenly date

// 2015 is year, 12 is month, 25 is day
DateTime date1 = new DateTime(2015, 12, 25);
Console.WriteLine(date1.ToString()); // 12/25/2015 12:00:00 AM

// 2015 - year, 12 - month, 25 – day, 10 – hour, 30 – minute, 50 - second
DateTime date2 = new DateTime(2012, 12, 25, 10, 30, 50);
Console.WriteLine(date1.ToString());// 12/25/2015 10:30:00 AM }

string dateTime = String.Format("Todays date {0:dddd mm yyyy}",DateTime.Now);//Formatting the date d = days m = months y = years
Console.WriteLine(dateTime);
```

> More info https://docs.microsoft.com/en-us/dotnet/api/system.datetime?view=net-6.0

> More info https://www.c-sharpcorner.com/article/datetime-in-c-sharp/

> Formatting https://docs.microsoft.com/es-es/dotnet/standard/base-types/custom-date-and-time-format-strings

# If Statement

```c#
int num = 45;

if(num >=18){
    Console.WriteLine('Bigger');
}else if(num == 15){
    Console.WriteLine('Teen')
}else{
     Console.WriteLine('Bigger');
}
//Other Form
if(num>=18)
    Console.WriteLine("Bigger");
else
    Console.WriteLine("Teen");

```

> Work the same as js.

# Switches

```c#
Console.WriteLine("Hello World");
string a = Console.ReadLine();

switch (a) { //Evaluating a
    case "Hello": //Writing the cases
        Console.WriteLine("Hello World");
        break;
    default: //Default case
        Console.WriteLine("Hola default");
        break;
}
```

> A efficient way to use when you have to many else if.

> Logical Operator (|| or &&) and or or.

> and both have to be true , and or just one need to be true.

# While Loop

```c#
int i = 0;

while (i<=10) {
    Console.WriteLine(i);
    i++;
}
Console.ReadKey();
```

> When the paramanter is true it stop

# Do While

```c#
int i = 0;

do
{
    Console.WriteLine($"i = {0}", i); //It Write it first
    i++;//Later increment

} while (i < 5); //Verify if it is true to continue , if not it stop.
```

>

# For loop

```c#
for (int x = 0;x<10;x++) {
    Console.WriteLine(x);
}
```

# Nested Loops

```c#
for(int x = 0;i>10;i++){
    for(int y=0;y>10;y++){
        Console.WriteLine(y);
    }
}
```

> Loop who is inside another loop

# Arrays

```c#
string[] hello = new string[3]; //Defining the size of the array 3.
//Have to add the values one by one.

string[] hello ={"name","primero"};

string[,] hello = new int[2,2]; //Matriz 2x2

string[,] hello = {{"name"},{"primero"}}; //The same as the above

string[,] hello = new int[6][];//Matriz 6x0
hello[0] = new int[4] {3,4,5,4};
//In the position 0 is going to be an array with the size of 4.

Console.writeLine(hello[0]); //Accessing to a determined part of the array (postion 0);

//Updating the value or entering data
hello[0] = "Sebastian";
Console.writeLine(hello[0]);

//Looping in the array (for)
for(int i =0;i<hello.Length;i++){
    Console.writeLine(hello[i]);
}

```

# forEach

```c#
int[] abc = { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };

foreach (int i in abc) {
    Console.WriteLine(i);
}

/*
You can put a var in the params of the foreach to not type the data type
foreach(var i in abc){
    WriteLine(i);
}
*/

Console.ReadKey();
```

> simple way to iterate over an array , but its less flexible.

# Methods (Functions)

```c#
static void sayName(string name) { //Creating a static method with a parameter
    Console.WriteLine($"Hello {name}");
}

sayName("Sebastian"); //Invoque it and fullying the parameter to execute the method/function
```

> In this form , doesnt marrent the type.

# Return keyword

```c#
static string sayName(string name) { //It will return a string type
    return $"Hello {name}";
}

Console.WriteLine(sayName("Sebastian"));
```

> But in this form you have to know type of what you are going to return

# Method Overloading

```c#
static void name(string name) {
    Console.WriteLine($"Hello {name}");
}

static void name(string name,int age) {
    Console.WriteLine($"Hello {name} and {age}");
}
```

> Just put two method the same but with differents parameter .

# Params KeyWord

```c#
static double num(params double[] price) { //Its going to use the array for the paramaters
    double total = 0;

    foreach (var p in price) {
        total += p; //Sum the values of the price array.
    }

    return total;
}

Console.WriteLine(num(1,2,3,4,5,6,7,8,9,10));
```

> params = rest params.

> It more efficient that method overloading.

# Exception Handling (try/catch/finally)

```c#
try {
    Console.WriteLine("Your name?");
    string name = Console.ReadLine();
    if (name == "") {
        throw new Exception();
    }
    Console.WriteLine(name);

} catch (Exception e) {
    Console.WriteLine("Something went wrong");

}finally { //Its optional
    Console.WriteLine($"Hello World");
}
```

> Is a better practice to catch all errors that can happen, that only put Exception e.

# Conditional Operator (Ternary Operator)

```c#
string message;

message = (x > 15) ? "Its warm outside!" : "Its Cold";
//(condition) ? true : false;
```

# String Interpolation (String Template)

```c#
string name = $"Hello {name}";
```

# Multidimensional Array

```c#
string[,] hello = {
          {"Hello1","Hola2"},
          {"Hello4","Hola3"},
          {"Hello5","Hola6"}
};

Console.WriteLine(hello[1,1]);
//hello[position,position of the array];


//foreach method
foreach (var item in hello) { //Iteration of the array
    Console.WriteLine(item);
}
//for method
for (int i =0; i<hello.GetLength(0);i++) { //Getting the positions in the position 0
    for (int j=0;j<hello.GetLength(1);j++) { //Getting the positions in the position 1
        Console.WriteLine(hello[i,j]); //Accessing to hello with results.
    }
}
```

> Just an arrays of arrays.

> More izi with the foreach
