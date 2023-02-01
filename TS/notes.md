# TypeScript Notes

- Install Globally

  > npm install -g typescript

- Compile TS to JS

```javascript
console.log("Hello World");

/*
tsc (name project).ts (Compile the project)
tsc -init (Initialize the Project)
tsc -w (Wacth Mode)
*/
```

> Just type in the terminal after install globally TS tsc (name).ts

> Be aware of typescript errors like undefined , NaN and Null.

```typescript
function console(name: string, date: number) {
  console.log(`${name} and ${date}`);
  //This will cause an error cause date is undefined
  //In JS just is going to print the name and undefined
}
```

> If you try to compile , it will compile but on the ts core it is going to show a error.

- Emitting errors

  > tsc --noEmitOnError (file-name).ts

- Type annotations

Describe what types of values the function need.

```typescript
function greet(person: string, age: number) {
  console.log(`${person} and ${age}`);
}
greet("Juan", 25);
```

```typescript
function greet(person: string, date: Date) {
  console.log(`Hello ${person}, today is ${date.toDateString()}!`);
  //toDateString give the date in a format that a human can read but in English Format.
}

greet("Maddison", new Date());
```

> We don’t always have to write explicit type annotations. In many cases, TypeScript can even just infer (or “figure out”) the types for us even if we omit them.

```typescript
let message = "Hello World"; //let message:string;
```

> When you compile TS to JS it Downleveling

- Everyday Types

* The primitives (string, number and boolean)

> String, Number, and Boolean (starting with capital letters) are legal, but refer to some special built-in types that will very rarely appear in your code. Always use string, number, or boolean for types.

- Arrays

> You can do, string[] (a array of strings) , number[] (array of numbers) and so on. (the syntax works for any type)

> If you dont put the type ,typescript is goning to put any.

- any

It can be whatever type of value

```typescript
let hello: any;
hello = "Sebastian";
hello = 25;
hello = {
  name: "Pedro",
};
console.log(hello.name);
//It can transform in whatever type
```

- Type Annotations on Variables

```typescript
let msg: string = "Hola Mundo"; //The same but just with the type place.
let num: number = 24;
let bool: boolean = true;
//And so on......
```

> When you place a type is just is going to work for that type
> If you change the value to other type is going to shown an error.
> Is reconmendable to put the type explicit.(it's safer)
> Typescript compile all to ES3

- Parameter Type Annotations

```typescript
const greet = (name: string) => console.log(`Hello ${name.toUpperCase()}`);
greet("Pedrito"); //This function just want a string type
```

- Return Type Annotations

Return type annotations appear after the parameter list

```typescript
function sum(): number {
  return 28;
  //This is just going to have a error if the return dont have a the number type
}
```

- Anonymous Functions

When a function appears in a place where TypeScript can determine how it’s going to be called, the parameters of that function are automatically given types.

```typescript
const name = ["Pedro", "Juan"];

name.forEach(function (s) {
  console.log(s);
  //function is the anonymous function
});

//Other example
var result = function (a: number, b: number) {
  return a + b;
};

var c = result(12, 2); // c = 14
```

- Object Types

This refers to any JavaScript value with properties, which is almost all of them! To define an object type, we simply list its properties and their types.

```typescript
const obj: { name: string; age: number } = {
  name: "Sebastian",
  age: 20,
};

function print(pt: { x: number; y: number }) {
  console.log(pt.x + pt.y);
}

print({ x: 4, y: 8 });
```

> We can use the interface with objs to make a better code.

- Optional Properties

To add a optional value , just add ? afther the property name

```typescript
function print(obj: { first: string; last?: string }) {
  console.log(`${obj.first} and ${obj.last}`);
}

printName({ first: "Bob" });
//If last is undefined is not going to throw a error just it going to put is undefined
printName({ first: "Alice", last: "Alisson" });

//Important!
function printName(obj: { first: string; last?: string }) {
  // Error - might crash if 'obj.last' wasn't provided!
  console.log(obj.last.toUpperCase());
  //Object is possibly 'undefined'.
  if (obj.last !== undefined) {
    // OK
    console.log(obj.last.toUpperCase());
  }

  // A safe alternative using modern JavaScript syntax:
  console.log(obj.last?.toUpperCase());
}
```

- Union Types

A union type is a type formed from two or more other types, representing values that may be any one of those types. We refer to each of these types as the union’s members.

```typescript
function print(id: number | string) {
  console.log(`Your id is ${id}`);
}

// OK
printId(101);
// OK
printId("202");
// Error
printId({ myID: 22342 });
//This is going to throw an error to just number or string, if you want it to world on object just put it in the parameter.
```

- Working with Union Types

```typescript
function sum(num: number | string): number {
  let resultado;
  //Is safer to specify the return type

  return resultado.toUpperCase();
}

console.log(27); //This is going to have a error

//Fix
const sum = (num: number | string) => {
  typeof num === "string"
    ? console.log("Is a String")
    : console.log("is a Number");
};

// Other Example
function welcomePeople(x: string[] | string) {
  if (Array.isArray(x)) {
    // Here: 'x' is 'string[]'
    console.log("Hello, " + x.join(" and "));
  } else {
    // Here: 'x' is 'string'
    console.log("Welcome lone traveler " + x);
  }
}

welcomePeople(["People", "Sebastian"]);

//Other Example
interface IUser {
  name: string;
  age?: number;
}

let errorMsg: string | null = null;
/*Is better to put null in this type os cases, because when you dont do it , it put by default undefined*/
let user: IUser | null = null;
```

> You can use the union Type with the interfaces

> Sometimes you’ll have a union where all the members have something in common. For example, both arrays and strings have a method in common. If every member in a union has a property in common, you can use that property without narrowing

- Type Aliases

A type alias is exactly that - a name for any type.

```typescript
type num = {
  num1: number;
  num2: number;
};
//num alias is obj
function sum(obj: num): number {
  console.log(obj.num1 + obj.num2);
}

sum({ num1: 4, num2: 8 });

//Other Example

type num = string;

function print(str: string): num {
  return str.toLocaleUpperCase();
}

console.log(print("Pedro"));

//Other Examples (Good Practices)
type PopularTag = string;
const popularTags: PopularTag[] = ["dragon", "cofee"];

//OR
type ID = string;
interface IUser {
  id: ID;
}

// With Union Types

type Union = string | null;
let dragonTag: Union = "dragon"; //or null
```

- Interface

An interface declaration is another way to name an object type

```typescript
//This is like an anonymous object type
interface obj {
  x: number;
  y: number;
}

interface User {
  name: string;
  age?: number; //If age exist put it in
}

function print(pt: obj) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}

printCoord({ x: 100, y: 100 });

//Interfece with functions
interface IUser {
  name: string;
  age?: number;
  getMessage: () => string;
}

//Interface with Objects
interface ISuperHeroe {
  name: string;
  age: number;
  address: IAddress;
  showAddress: () => string;
}

interface IAddress {
  street: string;
  country: string;
  city: string;
}

const spider: ISuperHeroe = {
  name: "SpiderMan",
  age: 30,
  address: {
    street: "Main St",
    country: "USA",
    city: "NY",
  },
  showAddress(): string {
    return `${this.name},${this.age},${this.address.street}`;
  },
};
//Destructuring Object (address)
const { address } = spider;
//Accesing to the values
const { street, country, city } = address; //(This is a good practices)

//If the value name is equal to a variable name in the code
const { name: nombre, age } = spider; //Now name is nombre
console.log(nombre);

console.log(spider.showAddress());
```

- Diff between interfaces and type

> The interface can be re-open (can put more values in it) , the type can't , both can use it for the same cases.

- Destructuring Arrays

```typescript
const hello: string[] = ["Hello", "World"];
const [, p2] = hello;
//Here just select the second value, just put a , to value that you dont need.
console.log(p2);
```

- Destructuring Arguments

```typescript
interface IProducto {
  name: string;
  price: number;
}

const Product: IProducto = {
  name: "Phone",
  price: 200,
};

function calc(products: IProducto[]): number[] {
  let total = 0;
  //Destructuring products (object)
  products.forEach(({ price }) => {
    total += price;
  }, 0);
  return [total, total * 0.15];
}

const art: IProducto[] = [Product];

const [total, newTotal] = calc(art);
console.log("Total", total);
console.log("New Total", newTotal);
```

> When write a name to the interface put first I and after the name of the Inteface like IUser or UserInterface and so on...

> When you have to define an object in an interface you only have to make other interface (Good Practices).

- Difference between type aliases and interfaces

Type aliases and interfaces are very similar, and in many cases you can choose between them freely. Almost all features of an interface are available in type, the key distinction is that a type cannot be re-opened to add new properties vs an interface which is always extendable.

- **Interface**

```typescript
//Extending an interface

interface Animal {
  name: string;
}

interface Bear extends Animal {
  honey: boolean;
}

const bear = getBear();
bear.name;
bear.honey;

//Adding new fields to an existing interface

interface Window {
  title: string;
}

interface Window {
  ts: TypeScriptAPI;
}

const src = 'const a = "Hello World"';
window.ts.transpileModule(src, {});
```

- **Type**

```typescript
// Extending a type via intersections

type Animal = {
  name: string;
};

type Bear = Animal & {
  honey: boolean;
};

const bear = getBear();
bear.name;
bear.honey;

// A type cannot be changed aftther being created

type Window = {
  title: string;
};

type Window = {
  ts: TypeScriptAPI;
};

// Error: Duplicate identifier 'Window'.
```

> This is advance stuff but is just to know.

- Literal Types

```typescript
let changingString = "Hello World";
changingString = "Olá Mundo";
// Because `changingString` can represent any possible string, that
// is how TypeScript describes it in the type system
changingString;

let changingString: string;

const constantString = "Hello World"; //<--
// Because `constantString` can only represent 1 possible string, it
// has a literal type representation
constantString;

const constantString: "Hello World"; // <--

//Combining literals and unions

function printText(s: string, alignment: "left" | "right" | "center") {
  //aligment just have 3 values that are value
  //...
}
printText("Hello, world", "left"); //Valid
printText("G'day, mate", "centre"); //The second parameter just accept left,right and center.

// Other example with the return
function compare(a: string, b: string): -1 | 0 | 1 {
  return a === b ? 0 : a > b ? 1 : -1;
} //return just accept -1 / 0 / 1
```

> You can combine it with non-literal types (interface,types, etc....)

- Literal Inference (Search more....)

Adding type annotations to our code is extra code we need to write, which consumes a little more of our time and bloats our code. TypeScript has something called type inference, which means, in many cases, it can work out a variable's type without it having a type annotation. In this lesson, we'll learn how and when we can use type inference.

```typescript
let date = new Date();
//Type inference is Date

const name = "Sebastian";
//Type inference is Sebastian
/*TypeScript infers the type of a string constant to the value of the constant rather than the wider string type. This is because a string constant can only be that value. This is called a string literal type.*/
```

- Any / Void / Never / Unknowm

* **Void**

```typescript
const greet = (): void => console.log("Hello World");
```

> When you dont return something is Void.
> Void is a set of undefined and null

- **Any**

```typescript
let foo: any = "foo";
console.log(foo.poo());
//This have an error but typescript check are off
```

> Any type turns off Typescript checks
> Avoid use any cause can cause many error

- **Never** (Search more info)

```typescript
const do=():never=>{
  console.log('Hello')
}
```

> Function with never cant be executed to the end

- **Unknowm** (Search more info)

```typescript
let vUnkowm: unknowm = 10;
```

> We cant assign unknowm directly in other type
> Is better to user Void and unknown cause any is no usefull and never is no too popular

- Type Assertion

```typescript
const uNum1: unknowm = 25;

let num1: string = uNum1 as string;
//As covert to type to other type

//Other Example
let pageNumber: string = "1";
let numeric: number = pageNumber as unknowm as number;
//First it convert to unknown , after that it convert to number;
```

> As is also known as Type Assertion

- Working With Dom

```typescript
const $container = document.querySelector(".container");
// TypeScript define this as an element

const $input = document.querySelector(".input__text") as HTMLInputElement;
//This is the correct to define an input in TS
//Exist more in this way

console.log(`Hello ${$input.value}`);
//With this if you put input.value you dont get an error

// Ading a Listener
const $input = document.querySelector(".input__text");

$input.addEventListener("focus", (e) => {
  //You have to specify cause TS dont access to or Markup
  const target = event.target as HTMLInputElement;
  console.log("event", target.value);
});
//This by default a type Event
```

> Typescript has a lots of types for DOM out of the box

> Element is the highest class in hierarhy

> Event is the highest class in hierarhy

- Classes in TS (Search more info)

* **Normal Classes**

```typescript
//Is just like JS but with some differents
class User {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
  getAll(): string {
    return `Name:${this.name} Age:${this.age}`;
  }
}
const user = new User("Sebastian", 20);

//Better Way (Good Practices)
class User {
  constructor(public name: string, public age: number) {}
  getAll(): string {
    return `Name:${this.name} Age:${this.age}`;
  }
}
const user = new User("Sebastian", 20);
user.getAll();
```

> By default this class is public (Everything)

- Private, Public and Protected

- **Private**

```typescript
class User {
  private name: string;
  private age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
  getAll(): string {
    return `Name:${this.name} Age:${this.age}`;
  }
}
const user = new User("Sebastian", 20);
console.log(user.name /*user.age*/); //it going throw an error cause its only accesible in the User class.
```

- **Protected**

```typescript
class User {
  protected name: string;
  private age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
  getAll(): string {
    return `Name:${this.name} Age:${this.age}`;
  }
}
const user = new User("Sebastian", 20);
console.log(user.name /*user.age*/); //it going throw an error cause its only accesible in the User class and in the subclass (extends)
```

> Public, Private and Protected is just on TS in JS is just the normal prototypes cases.

> Public is by Default

- **readonly**

This is just like a const but you really you cant change it;

```typescript
class Greet {
  name: string;
  readonly unchangeName: string | null = null;

  constructor(name: string) {
    this.name = name;
    this.unchageName = name;
  }

  changeAll(): void {
    return (this.unchangeName = "Paula");
    //It going to throw an error cause you cant change it
  }
  getName(): void {
    return this.unchangeName;
  }
}
```

> Is a readonly Property.

> Void don't return.

- **Implement interfaces**

```typescript
interface IUser {
  name: string;
  getName(): string;
}

class User implements IUser {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  getName(): string {
    return `Your name is ${this.name}`;
  }
}
```

- **Static properties**

```typescript
interface IUser{
  name:string;
  getName():string;
}

class User implements IUser{
  name:string;
  static age = 50;
  constructor(name:string){
    this.name = name;
  }
  getName():string{
    return `Your name is ${this.name}`
  }
  console.log(User.age);
}
```

> This only accesible in the class no in the instance

- **Inheritance** (Herencia)

```typescript
interface IUser {
  name: string;
  getName(): string;
}

class User implements IUser {
  name: string;
  static age: number = 48;
  constructor(name: string) {
    this.name = name;
  }
  getName(): string {
    return `Your name is ${this.name}`;
  }
}

class Greet extends User {
  private greet: string;

  constructor(name: string, greet: string) {
    super(name); //In this part the super is going to need to full the arguments.
    this.greet = greet;
  }

  setGreet(greet: string) {
    this.greet = greet;
  }

  getGreet(): string {
    return this.greet;
  }
}

const user = new Greet("Sebastian", "Hello");
user.setGreet("World");
console.log(user.name);
```

- **Generics** (Search more info)

```typescript
function type<T>(value: T) {
  return typeof value;
}

console.log(type("Sebastian"));
console.log(type(24));
console.log(type(true));

interface IGreet<T> {
  //Generic Interface
  name: string;
  data: T;
}

//Using the generic Interface
const greet: IGreet<{ greet: string }> = {
  name: "Sebastian",
  data: {
    greet: "Hello World",
  },
};
```

```ts
function myName<T extends { length: number }>(str: T) {
  return str.length; // str need to have to not throw an error like the number example
  //because t extends that prop we can access to that prop
}

console.log(myName("Sebastian"));

//console.log(myName(1))

console.log([1, 12]);
```

> <T> is by Default Generic
> All Generic Types are define by this <>
> Explicit declarations are easier to read
> You can extend like classes the generics
> To make interfece generic we add <T> after name
> Generic provide different data Types
> Generic can use the extends keyword

- **Enums**

```typescript
enum Status {
  NotStarted,
  InProgress,
  Done,
  //The values are increment from zero .
}

let notStartedStatus: Status = Status.NotStarted;
notStartedStatus = "40"; //It only accept Status Values
notStartedStatus = Status.Done; //Correct Way

//Giving number values

enum Status {
  NotStarted = 5,
  InProgress,
  Done,
}

// The First value is going to be 5 (the others 6,7)

// Other ways with String
enum Status {
  NotStarted = "NotStarted",
  InProgress = "InProgress",
  Done = "Done",
}
let notStartedStatus: Status = Status.NotStarted;
```

- **Enums With Interfaces**

```typescript
enum StatusEnum {
  NotStarted = "NotStarted",
  InProgress = "InProgress",
  Done = "Done",
}

interface Task {
  id: string;
  status: StatusEnum;
}

const obj: Task = {
  id: Math.random().toString(16),
  status: StatusEnum.InProgress,
};

console.log(obj);
```

> enum a reserved word to create enumerable
> Names wiTH capital letter is a defautl code style
> enum can use as a value and data type
> Is recomendable to use enum to all const in a App
> Is a good practices after the name of the enum put Enum.
> Is better to use a type of value in the enum

# Alternative to enums

```ts
const statusEnum = {
  NotStarted: "NotStarted";
  InProgress: "InProgress";
  Done: "Done";
} as const

//Same results as enums
```

# Type && Enums

```ts
enum Color1 {
  Red = "Red",
  Green = "Green",
}

enum Color2 {
  Yellow = "Yellow",
  Blue = "Blue",
}

type Colors = Color1 | Color2;

//Get all the properties from the enums (destructuring objects)
const objColors = { ...Color1, ...Color2 };

// Can be one or another
let color: Colors = Color1.Red;
```

- Import / Export

```typescript
//Products.ts
export interface IProducto {
  name: string;
  price: number;
}
```

```typescript
//index.ts
import { IProducto } from "ruta";

const Product: IProducto = {
  name: "Phone",
  price: 200,
};
```

> Pipe simbol alt + 124;

- Decorators(Search)

> More Info https://www.typescriptlang.org/docs/handbook/decorators.html

- Optional Chaning

```typescript
const print = (passanger: string): void => {
  //? This is the Optional chaning (if you dont put it the result is undefined)
  const sons = passenger.hijos?.length || 0;
  //If sons are undefined or null is equal to 0
  console.log(sons);
};
```

# Generators/Iterables in JS/TS

```ts
//creating a generator
function* generator() {
  yield 1;
  yield 2;
  yield 3;
}
//creating a iterator
const iterator = generator();

//printing the values
console.log(iterator.next().value); //1
console.log(iterator.next().value); //2
console.log(iterator.next().value); //3
console.log(iterator.next().value); //undefined = finished (done-true)

//can use for of to print all the values
for (let i of iterator) {
  console.log(i);
}

//spread operator with generators (see all data)
console.log(...generator());
```

> Generator is type of iterator, a iterator is thing that have the next method to show the next value of the generator

> yield gave the value to the generator, and the generator is call the first value is going to be print , when the generator is call again the second is print/gave and so on...

> The done properties is going to be true when the generator dont have anything to give

> yield pause,return stop and next advances

# Abstract Class

```ts
//Creating an abstract class
abstract class getNumber {
  //Some props
  constructor(public text: string) {}
  //Abstract method to implement in the class that extend it
  abstract getNumber(): void;

  //Method to share between classes
  consoleNumber(): void {
    return console.log("Hello World");
  }
}

class number_class extends getNumber {
  //Props
  constructor(public text: string, public greet: string) {
    super(text); /*passing the value to the super*/
  }

  getNumber() {
    return 9;
  }
}

const number_instance = new number_class("Hello", "World");

number_instance.consoleNumber();

console.log(number_instance.getNumber());
```

# In operator in ts

```ts
interface greet {
  name: string;
}

interface boo {
  scream: string;
}

const fun = function (str: greet | boo) {
  if ("name" in str) {
    return console.log("Greet");
  }

  return console.log("Boo");
};

fun({ name: "Sebastian" });

fun({ scream: "Ahhhh" });
```

# Type predicates (Type Guards)

```ts
interface greet {
  name: string;
}

interface boo {
  scream: string;
}

//type Value = greet | boo;

const isGreet = (str: unknown): str is greet => {
  return (str as greet)?.name !== undefined;
};

const isBoo = (str: unknown): str is boo => {
  return (str as boo)?.scream !== undefined;
};

const fun = function (str: unknow) {
  if (isGreet(str)) {
    return console.log(`Greet: ${str.name}`);
  }

  if (isBoo(str)) {
    return console.log(`Boo: ${str.scream}`);
  }
};

fun({ name: "Sebastian" });

fun({ scream: "Ahhhh" });

/*
isGreet and isBoo return true or false

str is greet (it is treating the unknow value as greet object)
return (str as greet)?.scream !== undefined (return true or false if str have scream in it)
*/
```

# instanceof <Type>

```ts
const getDate = function (str: Date | string) {
  if (str instanceof Date) {
    // Check if the str is an instance of an defined object
    return console.log(str); // this is also a type guard
  }

  return console.log(`Hello ${str}`);
};

getDate("Sebastian");

getDate(new Date());
```
