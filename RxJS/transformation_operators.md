# Transformation Operators

### mergeAll()

```ts
const pokeUrl = "https://pokeapi.co/api/v2/pokemon/";

const $body = document.querySelector("body");
const $input = document.createElement("input");
const $ol = document.createElement("ol");
$body.append($input, $ol);

//Streams(Observables)

const error = (err: AjaxError) => {
  console.log(err);
  return of([{}]);
};

const source$ = fromEvent<KeyboardEvent>($input, "keyup").pipe(
  debounceTime(500),
  map((x: any) => x.target.value),
  distinctUntilChanged((x, y) => x === y),
  map((x) => ajax.getJSON(`${pokeUrl}${x}`).pipe(catchError(error))),
  mergeAll() //mergeAll the operators in one and emit all the data that the operators gave to him
);

source$.subscribe(observer);
/*
without the mergeAll

source$.suscribe(response=> responser.suscribe(observer))

This is because the las map is returning an observable / stream
*/
```

### mergeMap()

```ts

```
