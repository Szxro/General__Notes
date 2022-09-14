# Angular

## Create Angular Project

- Just create the folder or go with cmd to the route where you are going to build the project and put **ng new name-of-the-projects**.

- Initialize the project with **ng serve --open / ng serve --o / ng serve**

> ng serve if you have open the app.

## Generate a component in angular

- ng generate component (name of the component)
- ng g c 'route of the component/name component' // ng g c heroes/list

## Angular Parts

1. selector (css selector, who rule the name of the component)
2. template (html code) (You can use html tags in the template)
3. templateUrl (html url)
4. styles (css/sass styles)
5. component.ts (core part, when you build the actions of your app and define the differents things of the app)

> When you create a component you must import it in the app.module and define in the @Ngmodule.

- You can use properties from classes.

```typescript
//This is a main class
export class AppComponent {
  title: string = "Hello World";
}
/*
Html Template
<h1>{{title}}</h1> //Using the title property
*/
```

> In html template you can use js expresions.

# Click Event

```typescript
//Main class
export class AppComponent {
  num: number = 0;

  increment(): void {
    this.num++;
  }
  incrementF(numero: number): void {
    this.num += numero;
    //num=num+numero;
  }

  getName(): string {
    return `Hello World`;
  }
}

/*(JS Expression)
Main (HTML Template)
<h1>{{num}}</h1> //Using the property num
<button type="button" (click)="num=num+1;">Press Me</button>
*/

/*(function class)
<h1>{{num}}</h1> //Using the property num
<button type="button" (click)="increment()">Press Me</button>
*/

/*(function with a parameter)
<h1>{{num}}</h1> //Using the property num
<button type="button" (click)="incrementF(+1/-1)">Press Me</button> //Increment with one / Decrement with one
*/

/*(function in a tag)
<h1>{{getName()}}</h1> 
*/
```

> You can use in the click event expresion of js or a function that you create in the class.
> Beware of the type of the function

# Manual Component Creation

```typescript
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "name-of-the-component",
  templateUrl: "Url HTML",
  stylesUrl: "Url Css",
})
export class CounterComponent implements OnInit {
  constructor() {}
  ngOnInit(): void {}
}

/*
With the html and css just creates the files.
*/
```

```typescript
//app.module.ts
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from "./app.component"; //Is important to declare it
import { CounterComponent } from "./counter/counter.component";

@NgModule({
  declarations: [AppComponent, CounterComponent], //Declarations
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

```html
<!--app.component.html-->
<name-of-the-component></name-of-the-component>
<!--
If you want to appear the page , you have to declare it in the root page or in the html (index.html)
-->
```

> the .component.ts is necessary cause is a directy.

# get Angular

```typescript
export class Capitalize {
  constructor(public name: string) {}
  get CapitalizeName() {
    return this.name.toUpperCase();
  }
}

//Use of the get
/*
//Capitalize.component.html
<h1>{{CapitalizeName}}<h1>
*/
```

> The get is use as a property no as a method.

> The part of get always return a value.

# ngOnInit Angular

```typescript
export class TestComponent implements ngOnInit {
  constructor() {
    //The constructor is called first , after that ngOnInit is called.
  }

  ngOninit(): void {
    //This is an interface that is utilize to call stuff
  }
}
```

# Directive \*ngFor

```typescript
export class HeroComponent implements ngOnInit {
  heroes: string[] = ["Hola", "Mundo", "Hello", "Mundo"];

  constructor() {}

  ngOnInit(): void {}
}

/*
hero.component.html;

<h1>List of Heroes:</h1>
<ul>
//Here is recorring the array and this is a izi way to use the dom
<li *ngFor='let hero of heroes; let i=index'>
//i is the index the position of the element in the array

{{i + 1}} - {{hero}} //This is just to organize the array
</li>
</ul>

*/
```

> This is a normal for but different in some ways.

# Directive \*ngIf

```typescript
export class HeroComponent {
  heroes: string[] = ["Thor", "IronMan", "SpiderMan", "Black Panther"];
  popHero: string = "";

  deleteHero(): void {
    this.popHero = this.heroes.pop() || "";
  }
}

/*
hero.component.html;

<h1>List of Heroes:</h1>
<ul>
//Here is recorring the array and this is a izi way to use the dom
<li *ngFor='let hero of heroes; let i=index'>
//i is the index the position of the element in the array

{{i + 1}} - {{hero}} //This is just to organize the array
</li>
</ul>

<button (click)="deleteHero()">Delete</button>

<div *ngIf='popHero'> //with this the condition is only going to appear is popHero is true
<h2>Hero Delete</h2>
<p>{{popHero}}</p>
</div>

//Other Way 
<div *ngIf="popHero !== '' ">
<h2>Hero Delete</h2>
<p>{{popHero}}</p>
</div>

*/
```

> The div is only going to appear if the condition is true.

> This is a normal if but with some differents.

> The second way is just with this '' , with the other is going to throw an error.

# ng-template and \*ngElse

```typescript
/*
list.component.html

<h1>List of Heroes:</h1>
    <ul>
        <li *ngFor="let hero of heroes; let i= index;">
            {{i + 1 }} - {{hero}}
        </li>
    </ul>
    <button (click)="deleteHero()">
        Delete
    </button>


<div *ngIf="popHero; else noDelete">
  <h2>Delete Hero:</h2>
  <p>{{popHero}}</p>
</div>

//This is only is going to show when the else condition is true
<ng-template #noDelete>
//noDelete is the name of the condition

    <h1>No Data</h1> //This is going to show instead of the main div

    //You can put here more html code
</ng-template>
*/
```

> The ng-template is a resource of Angular

> The name of the else is important in the ng-template

# Creating a module (manual)

```typescript
//hero.module.ts
import { NgModule } from "@angular/core";
import { HeroComponent } from "./hero.component"; //Here you are importing the components
import { ListComponent } from "../list/list.component";
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [
    HeroComponent,
    ListComponent /*This is the components that you are going to use*/,
  ],
  exports: [
    //This is going to be a public component
    ListComponent,
    HeroComponent,
  ],
  imports: [
    //This Place is for importing Modules
    CommonModule, //This module is importang because with it you can use the directies
  ],
})
export class HeroModule {}
```

```typescript
//app.module.ts (main module)
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from "./app.component";
import { CounterComponent } from "./counter/counter.component";
import { HeroModule } from "./hero/hero.module";

@NgModule({
  declarations: [AppComponent, CounterComponent],
  imports: [
    BrowserModule,
    HeroModule, //With this you can use the components you put on exports
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

> Is important .module part.

> With creating a module is more organized and is a better way to do it.

> All in Angular are Class (Typescript).

# Creating a module (automatic)

- ng generate module 'route/module name'
- ng g m 'name module'

> Example: ng g m Heroes or ng g m Heroes/HeroesModule

> When you create a module it create a folder , if you create a component in the module folder is going to update just the module folder no the main module.

# FormsModule

## (Submit) Event

```typescript
//Without FormsModule

import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-dbz-component",
  templateUrl: "./dbz-component.component.html",
  styleUrls: ["./dbz-component.component.css"],
})
export class DbzComponentComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  preventDefault(event: any): void {
    //This is a method for the form.
    event.preventDefault();
  }
}

/*
//Dbz.component.html
<h1>Dragon Ball Characters</h1>
<hr>
<div class="row">
    <div class="col">
        <h1>Characters</h1>
        <hr>
        <ul>
            <li>Goku - 5000</li>
            <li>Vegeta - 5000</li>
            <li>Gohan - 2500</li>
        </ul>
    </div>
    <div class="col">
        <h1>Add Section</h1>
        <hr>
        <form action="#" (submit)="preventDefault($event)"> //the submit part is the event 
            <input type="text" class="form__input" placeholder="Character"/>
            <input type="text" class="form__input" placeholder="Power Level"/>
            <button type="submit">Add</button>
        </form>
    </div>
</div>
*/
```

> The $event is you want to use it you have to put $ and after that event.

- FormsModule

```typescript
//DbzModule
//A more izi way
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DbzComponentComponent } from "./dbz-component/dbz-component.component";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [DbzComponentComponent],
  exports: [DbzComponentComponent],
  imports: [CommonModule, FormsModule],
})
export class DbzModuleModule {}

//Dbz.component.ts
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-dbz-component",
  templateUrl: "./dbz-component.component.html",
  styleUrls: ["./dbz-component.component.css"],
})
export class DbzComponentComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  addConsole(): void {
    //This is a method for the form.
    console.log("It works");
  }
}

/*
//Dbz.component.html
<h1>Dragon Ball Characters</h1>
<hr>
<div class="row">
    <div class="col">
        <h1>Characters</h1>
        <hr>
        <ul>
            <li>Goku - 5000</li>
            <li>Vegeta - 5000</li>
            <li>Gohan - 2500</li>
        </ul>
    </div>
    <div class="col">
        <h1>Add Section</h1>
        <hr>
        <form action="#" (ngSubmit)='addConsole()'> //the submit part is the module
            <input type="text" class="form__input" placeholder="Character"/>
            <input type="text" class="form__input" placeholder="Power Level"/>
            <button type="submit">Add</button>
        </form>
    </div>
</div>
*/
```

> If you want to use the FormsModule , you have to import that from angular and put it in the module that need it.

## [value] property

```typescript
import { Component, OnInit } from "@angular/core";

interface Character {
  name: string;
  power: number;
}

@Component({
  selector: "app-dbz-component",
  templateUrl: "./dbz-component.component.html",
  styleUrls: ["./dbz-component.component.css"],
})
export class DbzComponentComponent implements OnInit {
  newCharacter: Character = {
    name: "Trunks",
    power: 20000,
  };

  constructor() {}

  ngOnInit(): void {}

  addConsole(): void {
    console.log("It works!!!");
  }
}

/*
//Dbz.component.html
<h1>Dragon Ball Characters</h1>
<hr>
<div class="row">
    <div class="col">
        <h1>Characters</h1>
        <hr>
        <ul>
            <li>Goku - 5000</li>
            <li>Vegeta - 5000</li>
            <li>Gohan - 2500</li>
        </ul>
    </div>
    <div class="col">
        <h1>Add Section</h1>
        <hr>
        <form action="#" (ngSubmit)="addConsole()">
            <input
             type="text" 
             class="form__input"
              placeholder="Character"
              [value]="newCharacter.name" //This is the value property who is accesing to name in the obj newCharacter
              />
            <input 
            type="text" 
            class="form__input" 
            placeholder="Power Level"
            [value]="newCharacter.power"
            />
            <button type="submit">Add</button>
        </form>
    </div>
</div>
*/
```

> This is just to put a value to input etc..
> When you use interface is not inside the class y out of the class (obviosly)
> A good practice is to first the modules, second third party components and third your components in your modules.
> This () is just for methods and this way [] is jut to put a value in the html object

# Capturing data from an input

- (input) event

```typescript
//in the class that you are using

//Old Way
export class DbzComponent {
  getData(event: any): void {
    //is not a good practice utilice any but i dont know the value type
    console.log(event.target.value);
  }

  /*
  Dbz.component.html
  <form>
  <input type='text' (input)='getData($event)' placeholder='Text'/>
  </form>
  */
}
```

> With this you can obtain the value of the input.

- [(ngModel)]

```typescript
//More izi way
newCharacter: Character = {
  name: "Default",
  power: "0",
};

export class DbzComponent {}

/*
Dbz.component.html
<form>
  <input 
  type='text' 
  name='name'
  [(ngModel)]='newCharacter.name' //You are saving the data in the obj
  placeholder='Text'
  />
  </form>
*/
```

> With this you are obtaining the value and changing it in the obj.

> Is important the name using ngModel.

> This is the two-way-data binding

> You are capturing the data but you are saving it in the newCharacter.name

# Pipe Number

```typescript
/*
//Dbz.component.html;
  <ul *ngFor="let char of characters">
            <li>{{char.name}} - {{char.power | number}}</li> //This is pipe for number to modify it visually
  </ul>
*/
```

> This is just a demostration with a pipe but exist more and are so helpeful.

# Export Interface

```typescript
export interface Character {
  name: string;
  power: number;
}
```

# @Input (reuse component)

```typescript
//mainComponent
import { Character } from "route interface";
export class MainComponent {
  character: Character[] = [{ name: "Hello", power: 45000 }];
}
//Other component (reuse component)
import { xxxx, Input } from "angular@/core";
import { Character } from "route interface";

export class reuseComponent {
  @Input("alias of the input") "name and type of the component";
  @Input("data") character: Character[] = [];
}

/*
Main.component.hml
<div>
<app-reuse [name of the input]='character'><app-reuse>
</div>
*/
```

> This is like sending data from the father to the son.

> You have to pass the data you need to [name of the input] (is like a prop).

> Is a good practice to have reusable components and to use data from the father just use @Input().

> To create reusable component is just create component in the father and dont make them public to use just the main part.

# @Outputs and EventEmitter

```typescript
//dbz-form.component.ts
import { Input, Output } from "angular@/core";
import { Character } from "route interface";

export class dbzFormComponent{
  //@Output('alias'):EventEmitter<Generic>= new EventEmitter();
  @Output('alias'):EventEmitter<Character>= new EventEmitter();

  addConsole():void{
    if(this.newCharacter.name.trim().length === 0) return;
    console.log(this.newCharacter);
    this.onNewCharacter.emit(this.newCharacter);//In this part is sending the info to the father (emiting the info)
    this.newCharacter={
      name:'',
      power:0
    }
  }
}
//dbz.component.ts
import { Component, OnInit } from '@angular/core';
import { Character } from '../interfaces/dbz.interface';

@Component({
  selector: 'app-dbz-component',
  templateUrl: './dbz-component.component.html',
  styleUrls: ['./dbz-component.component.css']
})
export class DbzComponentComponent implements OnInit {
  newCharacter:Character={
    name:'',
    power:0
  }

  characters:Character[]=[
    {name:"Goku",power:12000},
    {name:'Vegeta',power:11500},
    {name:'Gohan',power:9500}
  ]

  constructor() { }

  ngOnInit(): void {
  }

  addCharacter(arg:Character):void{ //In this part is recibing the info and using it
    this.characters.push(arg); //The type of the value is equal to the generic part
    console.log(this.characters);
  }
}

/*
//dbz.component.html
<h1>Dragon Ball Characters</h1>
<hr>
<div class="row">
    <div class="col">
        <app-characters [data]="characters"></app-characters>
    </div>
    <div class="col">
      <app-dbz-form
      [data-new]="newCharacter"
       (onNewCharacter)="addCharacter($event)" //In this part is recibing info and using it.
       ></app-dbz-form>
    </div>
</div>
*/
```

> This is sending data or an event from the son to the father.

> Is important the part of the generic in the ouput decorator and the $event part to use the data.

> This is use to emit an event , is important to specify the type (generic).

> The emit part is important because with that whe can emit an event.

# Debugging the code

1. The first method is just using console.log() and after the console.log the line that chrome say it.

2. Other option is just put **debugger** on the code you want to debug.

3. A more efficient part is just F5 , take the option Chrome is going to open a new window (special) put the breakpoint and just see on chrome or vs code what you want to debug.

# Services (1er Part) Creating a Service

```typescript
//dbz.service.ts (You have to create the service)

import { Injectable } from "angular@/core";

export class DbzService {
  constructor() {
    console.log("Services are online");
  }
}

//dbz.module.ts
import {DbzService} from 'route';
//In the NgModule

@NgModule({
  //...The others sutffs
  providers:[
    DbzService //In this part is just for the service part
  ]
})

//dbz.component.ts
import {DbzService} from 'route';

export class DbzComponent{
  constructor(private dbzService:DbzService /*Using the services*/){}
}
```

> Services are important part of Angular

> The .service is good practice.

> Is important to put on the providers part to evade errors.

## Services (2nd Part) Sharing Variables

```typescript
//dbz.service.ts
import { Injectable } from "@angular/core";
import { Character } from "../interfaces/dbz.interface";

@Injectable()
export class DbzService {
  constructor() {
    console.log("Services are online");
  }

  private _characters: Character[] = [
    { name: "Goku", power: 12000 },
    { name: "Vegeta", power: 11500 },
    { name: "Gohan", power: 9500 },
  ];

  get Character(): Character[] {
    return [...this._characters]; //This is to use it as an array not as an object.
  }
}

//dbz-character.component.ts
import { Component, Input } from "@angular/core";
import { Character } from "../interfaces/dbz.interface";
import { DbzService } from "../services/dbz.service";

@Component({
  selector: "app-characters",
  templateUrl: "./characters.component.html",
  styleUrls: ["./characters.component.css"],
})
export class CharactersComponent {
  constructor(public dbzService: DbzService) {} //Using the service

  get characters(): Character[] {
    //Using a get to use it as a property
    return this.dbzService.Character; // Getting the Character[];
  }
}
```

> private var are name with an under score \_HelloWorld

> With the get you are using it as a property

> With this you can use data without use @Input or methods @Outputs (Good Practice)

# Services (3er Part) Sharing Methods

```typescript
//dbz.service.ts
import { Injectable } from "@angular/core";
import { Character } from "../interfaces/dbz.interface";

@Injectable()
export class DbzService {
  private _characters: Character[] = [
    { name: "Goku", power: 12000 },
    { name: "Vegeta", power: 11500 },
    { name: "Gohan", power: 9500 },
  ];

  get Character(): Character[] {
    return [...this._characters];
  }

  private _newCharacter: Character = {
    name: "",
    power: 0,
  };

  get newCharacter() {
    return this._newCharacter;
  }

  constructor() {
    console.log("Services are online");
  }

  addCharacter(arg: Character): void {
    //Creating the method
    this._characters.push(arg);
  }
}

//dbz-form.component.ts
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Character } from "../interfaces/dbz.interface";
import { DbzService } from "../services/dbz.service";

@Component({
  selector: "app-dbz-form",
  templateUrl: "./dbz-form.component.html",
  styleUrls: ["./dbz-form.component.css"],
})
export class DbzFormComponent {
  // @Input('data-new') newCharacter:Character={name:'',power:0};
  // @Output()onNewCharacter:EventEmitter<Character>=new EventEmitter();

  get newCharacter() {
    return this.dbzService.newCharacter;
  }

  constructor(public dbzService: DbzService) {}

  addConsole(): void {
    if (this.newCharacter.name.trim().length === 0) return;
    console.log(this.newCharacter);
    // this.onNewCharacter.emit(this.newCharacter);
    this.dbzService.addCharacter(this.newCharacter); //Using the method
  }
}
```

> With services are more izi to work

> We can work the logic of the app in the services.

> The get is just for read-only

# Distribution Mode

- **ng build** this a comand to production mode.

> This will create dist folder where you can find the files that you want to put on Netlify or other similar services.
