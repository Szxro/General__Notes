# RxJS

## Terminology

### Observable

- An observable can emit some data or can emit nothing.

- An observable are information

- Can emit errors

- Can be infinit or finite

### Suscribe

- suscribe to an observable and get something from it

- consume data from the observable

- can recibe events or data from the observer

- suscribe dont know what kind of data come from the data who are suscribe from

### Operators

- are use to transform the observables

- are use to filter observables

- are use to combine observables

- are use to create new observables

### Pipe

- Pipe is the join of the data.

### Observer Pattern

- Notify if something change

### Iterator Pattern

- can do secuntional operations

### Functional Programing

- have function that specify works and arguments and dont mutate the data

# Using RxJS

- First have to init npm **npm init -y**
- Then install Rxjs **npm i rxjs**

# Observable

```ts
import { Observable } from "rxjs";

const obs$ = new Observable<string>((sus) => {
  //emiting some sort of data
  sus.next("Hello World");
  sus.next("Hola Mundo");

  //stop emiting data
  sus.complete(); // is like a return

  //the data below complete is not going to emit
  sus.next("not emiting");
});

//Suscribing to the observer and seeing the data
obs$.subscribe(console.log);

/*
is the same as the above
obs$.suscribe((e)=> console.log(e));
*/

/*
Terminology:
- obs$ = observable
- sus = suscriber
*/
```

> Is a standard to use **$** with the observer name

> complete have the same functionality as the return keyword

# Documentation

> https://www.learnrxjs.io/

> https://rxjs.dev/

> https://reactivex.io/ (Oficial Documentation)
