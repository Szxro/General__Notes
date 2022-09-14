# Solid Principes

## S (Single responsibility principle).

```c#
namespace Program {

    class Program
    {
        static void Main(string[] args)
        {
            Book book = new Book(1,"Sebastian");
            WriteLine($"Getting: {book.getId()} - {book.getName()}");

        }
    }
}
public class Book{

    int Id;
    string Name;

    public Book(int id, string name) {
       Id = id;
       Name = name;
    }

    public int getId() {
        return Id;
    }

    public string getName() {
        return Name;
    }

}

public class BookService {

    public void savingBook(Book book) {

    //Saving the data in the DB
    }

    public void deletingBook(Book book) {
        //Deleting a Book in the DB
    }

}
```

> A module or class must have one responsibility.

> In this example have differents responsibilitys one getting the data of the book and the other one just to save or delete the book.

## O (Open Closed Principle).

```c#
namespace Program {
    class Program {
         static void Main(string[] args) {
            List<Water> water = new List<Water>();
            water.Add(new Water("Sebastian") { });
            water.Add(new Water("Sebastian") { });

            GetType getType = new GetType();
            getType.GetWater(water);
        }
    }
}

public abstract class Invoice //Cant modify just extend
{
    public string Name { get; set; }

    public string Description { get; set; }


    public abstract void Get();
}

public class Water : Invoice //Extending the method and overriding it
{
    string name;
    public Water(string Name)
    {
        name = Name;
    }

    public override void Get()
    {
        WriteLine("Hello Water");
    }

}

public class GetType
{
    public void GetWater(List<Water> water)
    {
        foreach (var item in water)
        {
            item.Get();
        }
    }

}
```

> Class are open to extension but closed to modifications.

## L (Liskov Substitution Principle).

```c#
namespace Program {
    class Program {
         static void Main(string[] args) {
            Car card = new Car2020();//Using the Superclass and instancing a new Subclass object
            card.getSpeed();//Using the method overrided

            Car car2 = new Car2022();
            car2.getSpeed();

        }
    }
}

public abstract class Car //SuperClass(MainClass)
{
    public abstract void getSpeed();//Method to override
}

public class Car2020 : Car //Extending to a subclass
{
    public override void getSpeed()
    {
        Console.WriteLine("Car2020");
    }
}

public class Car2022 : Car
{
    public override void getSpeed()
    {
        Console.WriteLine("Car2022");
    }
}
```

> A subClass need to not cause problems when you use it in the superclass(Main Class).

> The superclass most of the time are abstract class.

## I (Interface Segregation Principle).

```c#
public class AirPlane : AirVehicle, GroundVehicle
//Cause is a airplane have this two interface
{
    public void Fly()
    {
        throw new NotImplementedException();
    }

    public void Run()
    {
        throw new NotImplementedException();
    }
}

public class Car : GroundVehicle
//One interface because it cant fly
{
    public void Run()
    {
        throw new NotImplementedException();
    }
}


public interface AirVehicle
//A interface for the vehicle that can fly
{
    public void Fly();
}

public interface GroundVehicle
//A interface for the vehicle that can Run(Ground)
{
    public void Run();
}
```

> When you use an interfaces is better that interface have a specific purpose.(is better to have some interfaces with some methods to have to many methods in a interface).

> With this a class just is going to implement the void or stuff that it need.

## D (Dependency Inversion).

```c#

```

> The class of superior level must not meet the class of inferior level.
