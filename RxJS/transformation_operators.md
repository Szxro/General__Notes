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
const of$ = of("1", "2", 3).pipe(
  mergeMap(
    (
      value //is going to merge the above observable with the observable created below
    ) =>
      interval(1000).pipe(
        map((x) => `${value} + ${x}`), //getting the value of the sub-observable and the main observable
        take(5)
      )
  )
);

of$.subscribe(observer);
//returning the values of the observables in one

/*
Notes:
- If the sub-observable is not finish , the main one is going to repeat till the sub-observable finish.
*/

//Other Example

const mouseDown$ = fromEvent(document, "mousedown");
const mouseUp$ = fromEvent(document, "mouseup");
const interval$ = interval(0);

mouseDown$
  .pipe(
    mergeMap(() =>
      interval$.pipe(
        /*is going to return values until the mouseUp emit a value*/
        takeUntil(mouseUp$)
      )
    )
  )
  .subscribe(observer);
//Emit values when the mouse is press and when you leave it it complete the observables
```

> **mergeMap** can do a second observable and can do a second call with the same suscribe
