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

### Observer

- An Observer is a consumer of values delivered by an Observable

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

# next , error and complete

```ts
const obs$ = new Observable<string>((sus) => {
  sus.next("Hello world");
  //Forcing an error
  let a: any;
  sus.next(a.hello);
  sus.complete();
});

obs$.suscribe(
  //next(geting the data)
  (value) => console.log(value),
  //catching the error (izi way)
  (error) => console.error(error),
  //what to do after complete (the sus.complete() have to be in the observable)
  () => console.log("Complete")
);
```

# Observer

```ts
import { Observable, Observer } from "rxjs";

//Observer is a interface (generic)
const observer: Observer<string> = {
  next: (value) => console.log("value:" + value),
  error: (error) => console.error("error:" + error),
  complete: () => console.info("Complete"),
};

const obs$ = new Observable<string>((sus) => {
  sus.next("Hello World");
  let a: any;
  sus.next(a.hello);
  sus.complete();
});

obs$.subscribe(observer);
```

> To use the observer create have to deliver to the suscribe

> are diferents way to suscribe to a observable

# Suscription and Unsuscribed

```ts
import { Observable, Observer } from "rxjs";

const observer: Observer<number> = {
  next: (value) => console.log("value:" + value),
  error: (error) => console.error("error:" + error),
  complete: () => console.info("Complete"),
};

const interval$ = new Observable<number>((sus) => {
  let number: number = 0;
  const interval = setInterval(() => {
    number++;
    sus.next(number);
  }, 1000);

  //When you unsubscribe this return is going to execute
  return () => {
    clearInterval(interval);
    console.log("Finished");
  };
});

const suscription = interval$.subscribe(observer);
//When you suscribe is going to execute the observable no matter what

setTimeout(() => {
  //To stop the suscription have to unsubscribe
  suscription.unsubscribe();
}, 3000);
```

> to make a suscription you have to save the suscribe in a variable

> to make something when you unsuscribed have to put the return

> The complete is diferrent from unsuscribed.

# Add (unsuscribed child suscriptions)

```ts
const subs = interval$.subscribe(observer);
const subs2 = interval$.subscribe(observer);
const subs3 = interval$.subscribe(observer);

subs.add(subs2);
subs2.add(subs3);
//Adding a children for subs - subs2 and sub2 - subs3

setTimeout(() => {
  //When subs unsubscribe susbs2 do the same and subs3 the same as subs2
  subs.unsubscribe();
}, 3000);
```

> one use of add is to unsuscribed in a string.

# Subject

```ts
const interval$ = new Observable<number>((sus) => {
  const interval = setInterval(() => sus.next(Math.random()), 3000);
  return () => clearInterval(interval);
});

//Creating the subject
const subject$ = new Subject<number>();
//subscribing the observable to the subject
cosnt suscriptionSubject = interval$.subscribe(subject);

//making suscription suscribe to the subject
const subs1 = subject$.subscribe(observer);
const subs2 = subject$.subscribe(observer);

setTimeout(() => {
  //sending data from subject (hot observable)
  subject$.next(10);
  subject$.complete();
  //Finishing the interval
  suscriptionSubject.unsuscribed();
}, 3500);
/*
Notes:

- With the subject the value dont change , the values are the same for the suscription that are suscribe in it.
- The subject is an observer
- have to next, continue and error
- is use for multiple casts
*/
```

> To use the subject have to import it

> When the data is produced by the observable itself its called **Cold Observable** but when the data is produced outside of the observable its called **Hot Observable**

> The Subject transform a **Cold Observable** in a **Hot Observable**

# Documentation

> https://www.learnrxjs.io/

> https://rxjs.dev/

> https://reactivex.io/ (Oficial Documentation)
