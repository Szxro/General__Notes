# Basic Operators

### map()

```ts
const observer: Observer<any> = {
  next: (values) => console.log(values),
  error: (err) => console.log(err),
  complete: () => console.log("Complete"),
};

//map<enter,leave>
const range$ = range(1, 5).pipe(map<number, number>((value) => value * 10));
//with the pipe the operator map get the data
//later it change it

range$.subscribe(observer);

//Using Map to obtain just a part of the data of the request
const getData = async () => {
  const getDataUrl = await fetch("https://pokeapi.co/api/v2/pokemon/pikachu");
  const getDataJson = await getDataUrl.json();
  return getDataJson;
};

const from$ = from(getData()).pipe(
  map<HttpResponse, Ability[]>((data) => data.abilities)
);

//When its suscribe is going to pass from the full httpResponse to just show the array of abilities

from$.subscribe(observer);

//can make an sub-observable from the main one

//Main Observable
const from$ = from(getData());

//Sub-Observable
const abilities$ = from$.pipe(
  map<HttpResponse, Ability[]>((data) => data.abilities)
);

abilities$.suscribe(observer);
```

> The map is use to convert a data to another type of data.

### pluck()

```ts
//Do the same as map but its deprecated is better to use map
const pluck$ = from$.pipe(pluck("name")); //=> is going to take name
/*
pluck(...strings);
pluck('name','firstname') {name:{firstname:'Sebastian'}}
*/
```

### mapTo()

```ts
//Deprecated is better to use map
const mapTo$ = from$.pipe(mapTo("Sebastian"));
//Dont mind the response is going to return Sebastian
```

> Just returna static value

### filter()

```ts
//filter is deprecated
const range$ = range(1, 5).pipe(filter((value) => value % 2 == 0));
//Is going to return just the odds numbers

range$.subscribe(observer);

//Other example using an array of objects

interface TypeHeroe {
  type: string;
  name: string;
}

const characters: TypeHeroe[] = [
  {
    type: "Heroe",
    name: "Batman",
  },
  {
    type: "Heroe",
    name: "Robin",
  },
  {
    type: "Villain",
    name: "Joker",
  },
];

const from$ = from(characters).pipe(filter((value) => value.type == "Heroe"));

from$.subscribe(observer);
```

> Just filter data.

# Chaining Operators

```ts
const result$ = fromEvent<KeyboardEvent>(document, "keyup").pipe(
  map((value) => value.key), //map<KeyboardEvent,string>
  filter((value) => value === "Enter") //filter<string,string>
);

result$.subscribe(observer);
```

> The operators execute from above to below.

### tap()

```ts
const of$ = of(Math.round(Math.random() * 1000)) //Sending a number
  .pipe(
    tap((val) => console.log("Antes", val)), //Showing the number
    map((value) => (value > 5 ? "Hello" : "World")), //Transforming to a string
    tap({
      next: (value) => console.log("Hello", value), //Showing the change data
      complete: () => console.log("Finished"), //Completing a showing a result
    })
  )
  .subscribe(observer);
```

> The tap operator is use to debug the code.

> Is going to show the change how the data is tranforming
