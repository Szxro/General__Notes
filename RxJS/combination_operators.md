# Combination Operators

### startWith() / endWith()

```ts
// startsWith()
// When the observable begin to emit data if going to start/end with the given value
const of$ = of(1, 2, 3, 4, 5).pipe(startWith("Hello"));
//const of$ = of(1, 2, 3, 4, 5).pipe(endWith("Hello"));

of$.subscribe(console.log);
```

> startWith can be use to make a loading screen first put the startWith in true and when the value is emit put and endWith false

### loading screen example

```ts
const url = "https://reqres.in/api/users/2?delay=3";

const click$ = fromEvent($button, "click").pipe(
  exhaustMap(() => ajax.getJSON(url).pipe(startWith(true), endWith(false)))
);

const resp = (value) => {
  if (value) {
    $body.append($loadingDiv);
  }

  if (!value) {
    document.querySelector(".loading").remove();
  }

  console.log(value);
};

click$.subscribe(resp);
```
