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
    tap<number>((val) => console.log("Antes", val)), //Showing the number
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

> Important put the type of the value to no be any

### reduce() && take()

```ts
const interval$ = interval(1000).pipe(
  take(3), //Going to take the first three values that emit the observable
  tap(console.log), //Going to show the values that is emiting the observable
  reduce((acc, curr) => acc + curr, 0) //Going to wait the observable to finish to the sum
  //Is not instant like the reduce in js
);

interval$.subscribe(observer);
```

> The reduce operator do the same as the reduce in js but have to wait the observable to emit all values to do the sum.

> take unsuscribed from the observable with the n numbers put in the () and complete it.

### scan()

```ts
const interval$ = interval(1000).pipe(
  take(3), //Going to take the first three values that emit the observer
  tap(console.log), //Going to show the values
  scan((acc, curr) => acc + curr, 0)
  //When the observable is emiting values is going to emit the sum a the same time
);

interval$.subscribe(observer);
```

### first()

```ts
//Without parameters is going to return the first of all the values that the observable emit.
const range$ = range(1, 10);

const first$ = range$.pipe(first());

//With Parameters is going to return the value tha meet the condition
const firstBigger$ = range$.pipe(first((x) => x > 5));

firstBigger$.subscribe((x) => console.log("firstBigger" + x));

first$.subscribe(observer);
```

### takeWhile()

```ts
//take the numbers that meet the condition if the first value dont meet the condition is going to complete it.
const takeWhile$ = range$.pipe(
  tap<number>(console.log),
  //the true value is to print the value that break the condition
  takeWhile((x) => x <= 4, true)
);

takeWhile$.subscribe(observer);
```

### takeUntil()

```ts
//takeUntil is going to unsuscribed/complete the main observable when the other sub-observable emit its first value
const interval$ = interval(1000);
const fromEvent$ = fromEvent(document, "click");

interval$
  .pipe(
    tap((x) => console.log(`Tap :${x}`)),
    takeUntil(fromEvent$)
  )
  .subscribe(observer);
```

### skip()

```ts
//skip is just to skip a numbers of elements
const range$ = range(1, 5);

const skip$ = range$.pipe(tap<number>(console.log), skip(1));
//is going to show the numbers 2 - 5;

skip$.subscribe(observer);
```

### distinct()

```ts
const personajes: Person[] = [
  { name: "Sebastian" },
  { name: "Sebastian" },
  { name: "Sebastian" },
  { name: "Pedro" },
];

const from$ = from(personajes)
  .pipe(
    //tap<Person>(console.log),
    distinct<Person, string>((x) => x.name)
  )
  .subscribe(console.log);

//with no parameters is going to return the values diferents (===)
const of$ = of(1, 1, 1, 1, 1, 1, 4, 5, 6, 7)
  .pipe(distinct())
  .suscribe(console.log);
```

> Is going to return the values that are distinct

> If the value to take care is an object or an array of objects need to specify what value have to be distinct.

### distinctUntilChanged()

```ts
const from$ = from(personajes)
  .pipe(
    //It will show the data until the x(last), y(newer) data are diferent
    distinctUntilChanged((x, y) => x.name === y.name)
  )
  .subscribe(console.log);

//other example
const of$ = of(1, 1, 2, 1, 2, 1, 2, 1, 1)
  .pipe(distinctUntilChanged())
  .suscribe(console.log());

/*
Result:
1
2
1
2
1
2
1
1
*/
```

> The anterior value have to be diferrent from the present value to show it.

#### distinctUntilKeyChanged()

```ts
const personajes: Person[] = [
  { name: "Sebastian" },
  { name: "Sebastian" },
  { name: "Sebastian" },
  { name: "Pedro" },
];

const from$ = from(personajes)
  .pipe(
    //tap<Person>(console.log),
    distinctUntilKeyChanged("name")
  )
  .subscribe(console.log);
//Is going to throw the values that are diferent for the anterior key(object)
```
