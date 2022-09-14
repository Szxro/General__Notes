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
AreaCalculator AreaCalculator = new AreaCalculator();
var rectangle = new List<Rectangle> {
    new Rectangle(){Width=200,Height=300 }
};
var triangles = new List<Triangle> {
    new Triangle(){Width=200,Height=300 }
};
WriteLine($"Result: {AreaCalculator.computedArea(rectangle)}");
WriteLine($"Result: {AreaCalculator.computedArea(triangles)}");

public abstract class IShape//Abstract class just extend , cant modify
{
    public abstract int Area();
}

public class Rectangle: IShape//Extending the class
{
    public int Width { get; set; }

    public int Height { get; set; }

    public override int Area()
    {
        return Width * Height;
    }
}

public class Triangle : IShape
{
    public int Width { get; set; }

    public int Height { get; set; }

    public override int Area()
    {
        return Width * Height / 2;
    }
}
public class AreaCalculator
{
    public int computedArea(IEnumerable<IShape> shapes)//The classes that IShape extends can use this method
    //In this case we are looping in the abstract Class (IShape)
    //IEnumerable can loop in Class,Abstract Class or Interfaces etc..
    {
        int area = 0;
        foreach (var i in shapes) {
            area += i.Area();//Is going to execute the Area Method and sum it to the area
        }
        return area;
    }
}
```

> Class are open to extension but closed to modifications.

> IEnumerable interface is used when we want to iterate among our classes using a foreach loop.

## L (Liskov Substitution Principle).

```c#
IShape shape = new Rectangle() {Width=200,Height=300 };
//IShape can use the subclasses with no problem, an can create new subclasses Objects
IShape shape1 = new Triangle() { Width = 200, Height = 300 };
WriteLine($"Result: {shape.Area()} <--Rectangle");
//Can use the override method in the subclasses
WriteLine($"Result: {shape1.Area()} <---Triangle");


public abstract class IShape//SuperClass(HighOrder Class)
{
  public abstract int Area();//Method that extend
}

public class Rectangle: IShape //Extending the Method
{
    public int Width { get; set; }

    public int Height { get; set; }

    public override int Area()//Overriding the subclass the method
    {
        return Width * Height;
    }
}

public class Triangle : IShape
{
    public int Width { get; set; }

    public int Height { get; set; }

    public  override int Area()
    {
        return Width * Height / 2;
    }
}
```

> A subClass need to not cause problems when you use it in the superclass(Main Class).

> The superclass most of the time are abstract class but can be interfaces.

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
//Main.cs
 interface Conexion
    {
        void getDatos();
        void setDatos();
    }

    class AccesoADatos
    {

        private Conexion conexion;

        public AccesoADatos(Conexion conexion)
        {
            this.conexion = conexion;
        }

        void getDatos()
        {
            conexion.getDatos();
        }
    }
//SubClass.cs
   class DDBBService : Conexion
    {

        public void getDatos()
        {
            //Implement getDatos
        }

        public void setDatos()
        {
            //Implement setDatos
        }
    }

    class APIService : Conexion
    {
        public void getDatos()
        {
            //implementación de getdatos
        }

        public void setDatos()
        {
            //implementación de setdatos
        }
    }
```

> The class of superior level must not meet the class of inferior level.

> Entities must depend on abstractions, not concretions. Indicates that the high-level module should not depend on the low-level module, but instead should depend on the abstractions.
