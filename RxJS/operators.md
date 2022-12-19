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
```

> The map is use to convert a data to another type of data.
