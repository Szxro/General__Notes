# OOP

## Classes/Methods/Attributes C#

```c#
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Basics
{
    class Hello
    {
        string Hello;

       public void name(string name)
        {
            this.Hello = name;
            Console.WriteLine($"Hello {this.Hello}");
        }
    }
}

//Using it

using Basics; //Importing from Basics

Hello name = new Hello(); //Instancing the object

name.name("Hello World"); //Using the method of the class.
```

> Just to create an auto generate song its just (add, create new class).

> Put the method that you want to use.

> Its not a good idea to put all the methods public

> When you use a class , to import it you just have to put **using and the namespace** to import it

# Constructors C#

```c#
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Basics
{
    class Hello
    {
        string hello;
        private readonly string name;

        public Hello(string hello) { //This is the constructor , need to have the same name as the class.
            this.hello = hello; //The parameter of the constructor is the same as the attribute of the class.
            name = "Sebastian";
            //You can change the value of the name property even thought is readonly property.
        }

       public void name()
        {
            Console.WriteLine($"Hello {hello}");
        }
    }
}

```

> The constructor part is another kind of a method , you can do whatever you want like a normal method.

# Static (Classes)

```c#
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Basics
{
    class Hello
    {
        string hello;
        public static int num = 0; //static atribute.

        public Hello(string hello) {
            this.hello = hello;
            num++;
        }

       public void name()
        {
            Console.WriteLine($"Hello {hello}");
        }

        public static void greet(){ //Public static Method
            Console.WriteLine("Hello World");
        }
    }
}

//Main.cs
Hello.greet(); //It belong to the class not the instance.
Console.WriteLine(Hello.num);
```

> At static method belongs to the class itself no the object.

> You can create object from a static class, just use like the Math Class.

> You can assign static to a class.

# Overloaded Constructors

> It just create multiple constructor , with differents parameters.

> Its just like the Overloaded methods.

# Inheritance (Basic)

```c#
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Basics
{
    class greet : Hello //class greet extends Hello (Hello father / greet son)
    {
        string name = "Sebastian";

        public void greeting() {
            Console.WriteLine($"Hello {name}");
        }
    }
}
```

> The greet class can use methods or attr of the class greet.

> You can inheritance from one class but can inheritance from some interfaces.

# Abstract Class

> Its just modifier that you can put into a class , attr or method to indicate missing components or incomplete implementation. (abstract class hello).

# Array of objects

```c#
Hello[] hellos = { new Hello("Sebastian"), new Hello("Juanito") }; //This is the izi way
//The object (instances) are know as anonymous objects in this way.


foreach (Hello hello in hellos) { //You can use the foreach in the array of objects.
    Console.WriteLine(hello.hello);
}

```

# Objects as Arguments

```c#
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Basics
{
    class Hello
    {
       public string hello;

        public Hello(string hello) {
            this.hello = hello;
        }

        public static Hello copyGreet(Hello hello) { //Hello hello (object parameter)
            return new Hello(hello.hello); //Returning the new Hello to copy whatever object of the class.
        }

    }
}

//Using it (Main.cs)

Hello hello4 = new Hello("Pedrito");

Hello hello5 = Hello.copyGreet(hello4);

Console.WriteLine($"Hello5 {hello5.hello}");

```

> Just put in the parameter of the function , an object of the class.

# Method Overriding

```c#
class Animal{
    public virtual void speak(){
        Console.WriteLine("Hello World")
    }
}

class Dog{
    public override void speak(){
        Console.Writeline("Woff");
    }
}

//Main Class
Using Basics;
 Dog doggie = new Dog();
 doggie.speak(); //It will override the method and it will execute the speak part assign in his class
```

> If you want to override it you only have to put absctract or virtual to not have errors.

# toString Method

> You can override the method to show some representation of the class or you can use it to convert to string int,doubles,boolean etc..

# Polymorphism

> Greek Word that means to have many forms, objects can be identified by more than one type.

> You have one class that can inheritance many classes , you only do the inheritance , and put a method in common to all the classes and overriding to do their stuff.

> You can create an array of object but from the main class and save the child classes, and make a foreach with the main class with the array and execute all the method that you want.

# Interfaces C#

```c#
interface IEat{
    string name; //Attr that the class need
    void talk();//Method that the class need

}

class Animal: IEat/*Animal:IEat,ISleep*/{
    string name;
    public void talk(){
        Console.WriteLine("Hello World");
    }

}
//Main.cs (using it)
Animal animal = new Animal();

animal.talk();
```

> It just how a class must have.

> You can put two interfaces. (must put all the attr or method to not have error)

> Good practices to put first I and later the new of the interface.

# Lists C#

```c#
using System.Collections.Generic; //Must import to use list


string[] food = {"Hello","World","Hola","Mundo"};
List<string> list = new List<string>();//Creating a list type string (generic string)

foreach (string item in food) {
      list.Add(item);//Using a method to add values to the list
}

list.Remove("Hello");//Removing a value from the list

foreach (string item in list) {
    Console.WriteLine($"Items {item}");
}

Console.WriteLine($"Position 0 {list[0]}")

list.Insert(0,"Heyy");//Inserting values in the list
//list.Insert(index,value)

Console.WriteLine(list.count); //Count(Length)
//return the length of the list

Console.WriteLine(list.IndexOf("World")); //Searching the position of the value and returning it.
Console.WriteLine(list.LastIndexOf("Mundo")); //Searching the position of the value and returning the last position.
Console.WriteLine(list.Contains("World"));//Return True or False if the list contains it


list.Sort();//Its going to sort the list alphabetic
list.Reverse(); //Its going to reverse the list
list.Clear();//Its going to delete all the values of the list

string[] greetList =list.ToArray(); //Converting from list to array.
```

> List are mutable.

# List of Objects

```c#
class Player{
    public string username;

    public void callUser(string username){
        Console.WriteLine($"Hello {username}");
    }
}

//Main.cs
using System.Collections.Generic; //Must import to use list
using Basics;

List<Player> players = new List<Player>(); //Creating a list of object of Player class.

Player player1 = new Player("Chad");
Player player2 = new Player("Steve");

players.add(player1); //Addding values in the list of objects
players.add(player2);

//Other izi way
players.add(new Player("Chad"));//Adding unknonws Objects
players.add(new Player("Steve"));

foreach(Player player in players){
    Console.WriteLine(player.username);
    //Using a foreach to see all player username
}
```

> You can override the method toString to return the player username , and just put in the WriteLine the player part , this instally go to find the the override method. (toString).

> With the second form you only have to add the new Player no creating an instance and later adding it.

# Getters and Setters

```c#
class Car{
    private int num;

    public Car(int speed){
        Speed = speed;
    }

    public int Speed{
        get{return num;}//read the value (num)
        set{
            if(value > 500){ //Values is the giving value
                num = 200;
            }else{
                num = value;
            }
        }
    }

}
```

> Add Security to fields by encapsulation.

# Auto-Implement Property

```c#
class Car{
   public string Model{get; set;} //Just put get; set;
   public Car(string model){
    this.Model = model
   }

}
```

> Just a shortcut when no additional logic is needed

# Enums

```c#
enum Hello{
    Hello = 55, //Defining a value
    World, //Position by default.
    Hola,
    Mundo
}

Hello word = Hello.Hola;//Using a value of the enum
int i = (int)Hello.Hello;//Getting the value or the by default value (position).

Hello x = (Hello)55;
//Using the value or the position to get the value

Console.WriteLine(Hello.World); //Show what is in the world part
Console.Writeline($"{Hello.World} {(int)Hello.World}") //Show the value and the show the value of the attr.
```

> Need to be in a class (throw some errors).

> You can put by default without defining a attr or you can pass a attr to define it.

> You can use it anywhere , method , variables etc...

> It is consider good practices to use it.

# Generics C#

```c#
int[] intArr ={1,2,3,4,5};

double[] doubleArr ={1.0,2.0,3.0,4.0,5.0};

//T[] = Array of T
static void dislayElements<T>(T[] array){ //T generic
    foreach(T item in array){
        Console.Write($"{item} ");
    }
        Console.WriteLine();
}

/*Other Example*/
class Program
{
    public static void type<T>(T type) {
    WriteLine(type);
    }
    static void Main(string[] args)
    {
        //Instancing the generic list and adding the value<type>
        GenericList<int> intList = new GenericList<int>();
        intList.Add(100);
        GenericList<string> stringList = new GenericList<string>();
        stringList.Add("Sebastian");
        GenericList<Program> programClass = new GenericList<Program>();
        programClass.Add(new Program());
        //Generic Method to print any value
        type<int>(456);
    }
}

//Generic Class
public class GenericList<T> {
    //Generic Method
    public void Add(T input) {//Generic params to accept any type and work with it
        WriteLine(input.GetType());
    }

}
```

> You can add generic type to reuse a class or method or field etc..

> In this example you are using a method to make a foreach for both int[] and double[].

# Refer

```c#
int numero = 0;//By now the value is 0
static int change(refer int num){return num=10;}//It will change to 10
change(refer numero); //Changing the value
Console.WriteLine(numero);//See the changes

```

> Its just to change the value of the variable by refer.

> Here we are changing the variable and not the copy.

# Local Function

> Its just a function with another function inside.

# String Builder

> More info https://docs.microsoft.com/en-us/dotnet/api/system.text.stringbuilder?view=net-6.0

# Collections

```c#
//ArrayList
ArrayList list = new ArrayList(); //Save info like a list but in an array
list.Add("Hello");//Saving Values
list.Add(1);//You can putt whatever value (its not like the normal arrays)
int length = list.Count;// list.Length
WriteLine(list[0]);//Accessing to the position 0
/*
Some usefull methods
Insert(index,object);
Remove(index,object);
RemoveAt(index);
Clear();//Just delete all the values of the array list
IndexOf();//Show where the value in the array is
Contains(); return true or false
*/

//Stack
Stack stack = new Stack();//first in, last out (You can put whatever value)
stack.Push(1);//Adding Values
stack.Push(2);
stack.Push(3);
// 3 --> 2 --> 1 --> etc...
//The first number will be the last value added
var num = stack.Pop();//Take the top number
int index = stack.Count; //stack.Length
stack.Clear(); //Delete all


//Queue
Queue queue = new Queue(); // first in , first out
queue.Enqueue(3);//Adding values
queue.Enqueue("Hello World"); //Save whatever value
var tail = queue.Dequeue(); //Removes and returns the object at the beginning of the Queue<T>.
tail = queue.Dequeue();//Save the next value and so on...
var top = queue.Peek();//return the object at the top of the queue

/*
Some usefull Methods
Contains();
Clear();
Count(); === Length
*/


//HashTable
HashTable hastable = new HashTable();
//Can add whatever value
hashtable.Add("Key","Value"); //Adding Values
//First the key , and then the value
hashtable.Add("Hello",45787);//(Key,Value);

foreach(DictionaryEntry in hashtable){
      WriteLine($"Value:{j.Key} - Key:{j.Value}");
}

//Obtaining the value
var value = hashtable[1]; //Put the key and is going to return the value
WriteLine(hashtable.Count);//hashtable.Length;

//Deleting the value
hashtable.Remove("key");///Put the key to remove the value

//Clear all
hashtable.Clear();

//ContainsKey

bool boo =hashtable.ContainsKey("key");
//Return true or false.


```

> You want to use this , you must (using.System.Collections)

> (Better idea use List<T> is more efficent) than the ArrayList.

> In the stack part it exist the Contains() Methods.

# Struct vs Class

> Structs are value types, allocated either on the stack or inline in containing types. Classes are reference types, allocated on the heap and garbage-collected. Allocations and de-allocations of value types are in general cheaper than allocations and de-allocations of reference types.

> More info https://www.c-sharpcorner.com/blogs/difference-between-struct-and-class-in-c-sharp#:~:text=Structs%20are%20value%20types%2C%20allocated,the%20heap%20and%20garbage%2Dcollected.&text=Allocations%20and%20de%2Dallocations%20of,de%2Dallocations%20of%20reference%20types.

> More info https://stackoverflow.com/questions/13049/whats-the-difference-between-struct-and-class-in-net

# Accesibility Level

> Private is just acept in the class , you can use anywhere in the class that was created.

> Public anywhere

> Internal global access with the same version (.net,.netCore,Framework);

> Protected is a keyword that C# uses to make access restriction for class members. When we mark members as protected, it becomes accessible only in the class where it's defined or inside the derived class. The protected keyword is used to share functionality that derived classes might find useful. (A class who is inheriting the main class who have this type of protection can access and modify it).

> Protected Internal is the fusion of the protected and the Internal.

> Abstract class have abstract method who have no body , just params.

> Virtual keyword is used to modify a method, property, indexer, or event declaration and allow for it to be overridden in a derived class.

> Sealed can inheritance from another class but not a class from it.

> Static is basically the same as a non-static class, but there is one difference: a static class cannot be instantiated. In other words, you cannot use the new operator to create a variable of the class type.

# Destructor

```c#
class name{
    private string name = "Sebastian";
    private int age =20;

    public name(string name, int age){ this.name = name , this.age = age};

    ~name(){ //Desctructor in c# (alt+126)
        name = "";
        age =0;
    }
}
```

> Destructors in C# are methods inside the class used to destroy instances of that class when they are no longer needed.

# Abstract class vs Interface

> An abstract class allows you to create functionality that subclasses can implement or override. An interface only allows you to define functionality, not implement it.

# Delegate

```c#
//Class Program
class Program {
    public delegate void Bigger (string x); //Creating the Delegate

    public static void showNumber(string x) { //A method to use with the delegate
        Console.WriteLine(x);
    }

    public static void callbackMethod(int x, int num2,Bigger callback) {//Callback method with a delegate
        callback($"The result is: {x + num2}");
    }
    static void Main(string[] args) //Main method
    {
        Bigger bigger = showNumber; //Instancing the delegate and putting a method to use
        bigger("Hello World");//Filling the params
        callbackMethod(100, 50, bigger);//Using the callback method with the delegate

         //Using differents method with delegates
        methodClass method = new methodClass();//Using the class
        Bigger d1 = method.methodX;//using the class methods
        Bigger d2 = method.methodY;
        Bigger d3 = showNumber;
        Bigger allMethods = d1 + d2; //Gathering all in only one method
        allMethods += d3;
        allMethods("Hello World"); //Calling all the methods with their params

        Console.WriteLine();
        //removing a method
        allMethods -= d1;
        allMethods("Hello Christ");

        Console.WriteLine();
        //Copying all the methods but d1 is not going to show (just d2 & d3)
        Bigger twoMethods = allMethods - d1;
        twoMethods("Hello Sebastian");
    }
}
public class methodClass {
    public void methodX(string x)
    {
        Console.WriteLine($"methodX: {x}");
    }
    public void methodY(string x)
    {
        Console.WriteLine($"methodY: {x}");
    }
}
```

> A delegate is a type that represents references to methods with a particular parameter list and return type.

> More info https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/delegates/

> A delegate is sealed (like a sealed class)

> A delegate encapsulated a method to make it more secure.

> The methods of the delegate have to be equal of the delegate created (params, accesibility, etc..) to use.

> a delegate can be use as a callback.

> When you remove like the second way , if you put d2 is not going to show d1 and d2 just d3 or d3 is just going to show d2.

# Anonymous methods (Delegates)

```c#
class Program
{
    public delegate void Bigger(string x);

    public static void showNumber(string x)
    {
        Console.WriteLine($"showNumber: {x}");
    }
    static void Main(string[] args)
    {
        Bigger bigger = showNumber;
        Bigger show = delegate (string y) { Console.WriteLine(y); }; //Using an anonymous function to use the delegate
        /*
        Other Form
        Bigger show = delegate (string y){
            Console.WriteLine(y);
        };
        */
        show("Hello World"); //Passing the params and executing the function
        show = showNumber;//Overriding the anonymous function
        show("Hello World");//Using showNumber

    }

}

```

> Anonymous methods is use to not much methods with the delegates.

> You can asign a new method to override the anonymous method.

# Dinamics Types

```c#
class Program
{
    static void Main(string[] args)
    {
        dynamic newM = new newMethods(); //Using dynamic and the class newMethods
        newM.someMethods();//Using a method that dont exist
        newM.showX("x",3,"xsdasd");//Using a method but with more params
        //In all is going to throw an error

        dynamic c = "5";
        var sum = c +6;//The result of this is going to be dynamic
        Console.WriteLine(sum);//It can be a string depend of the dynamic
    }

}

public class newMethods {

    public newMethods() { }

    public newMethods(string t) { }

    public void showX(string x) {
        Console.WriteLine(x);
    }

    public void showY(int x) {
        Console.WriteLine(x);
    }

}
```

> The dynamic part only show errors when the program is running.

> Dynamic try the class or methods as a object , that is way is throwing any errors.

> It can be use when you dont the result of that service (api,objects,etc...).

# Using Keyword (Uses)

> To import class or packages **(using static System.Console)**.

> To import class and add a nickname **(using Hello = namespace of the class)**.

# Tuples

```c#
class Program
{
    public static Tuple<int,string> X() //Using a tuple in a method
    {
        return new Tuple<int, string>(1, "hELLO"); //Return the values of the tuples
    }
    static void Main(string[] args)
    {
        var tupla = new Tuple<int, string, string>(1, "Sebastuan", "Juan"); //Creating a filling the params of the tuple
        WriteLine(tupla);
        var tupla2 = Tuple.Create(1, 2, 3, 4, 5, "Hello", "World"); //Other form to create the tuple
        WriteLine(tupla2);
        WriteLine();
        WriteLine(X());//Just executing the method
        WriteLine(tupla.Item1);//Accessing to the values of tupla. (Item1,2,3,4,5,etc...)

    }

}
```

> You can save in it , at least 8 differents data types.

# Dictionaries

```c#
class Program
{
    static void Main(string[] args)
    {
        //Creating a the dictionary
        Dictionary<int, string> dic = new Dictionary<int, string>();
        //Adding values
        dic.Add(1, "Hello");
        dic.Add(2, "World");
        dic.Add(3, "Hola");

        //Accesing to values
        string value = string.Empty;
        dic.TryGetValue(3, out value);
        WriteLine(value);
        //Other form
        WriteLine(dic[2]);
        //Contains?
        if (!dic.ContainsKey(5)) {
            dic.Add(5, "Mundo");
            //You can update a value with the key
        }
        dic[5] = "World";//Updating the key 5
        //foreach
        foreach (KeyValuePair<int,string> kvp in dic)
        {
            WriteLine($"Key: {kvp.Key} & Value: {kvp.Value}");
        }
        //Obteining the keys
        Dictionary<int, string>.KeyCollection keyColl = dic.Keys;

        //Removing a key
        dic.Remove(1);
        /*Clear()*/
    }
}
```

> Represents a relation key and value , if you want to access to a value of the dictionary have to put the key.

> Dictionary is use to save data who have key/value (bd,etc...).

# Boxing & Unboxing

```c#
//Boxing is just save a value in an object.
int i = 123;
object o = i;//Coping the values of i into an object

o = 456;//Changing the value
i = (int)o;//Unboxing
//Is just casting to the data type that we want
```

> Beware of the value , if the value if diferent from the data type of it is going to throw an error.
