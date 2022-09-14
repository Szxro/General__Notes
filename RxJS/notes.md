# RxJS

- Terminology

> An observable emit some sort of data.

> An operator get the sort of data.

> Pipe is the join of the data.

> And observer is responsable for the errors and what to do with the data.

# Using RxJS

- First have to init npm **npm init -y**
- Then install Rxjs **npm i rxjs**

```js
const { Observable } = require("rxjs");

const observable = new Observable((suscriber) => {
  suscriber.next("Hello World"); //Here is emiting data
  //You can put more than one
  suscriber.next("Hola mundo");
});

const observer = {
  next: (value) => {
    //In this part is going to receive the data and use it
    console.log(`Observer got a value ${value}`);
  },
  err: (error) => {
    //In case something happen the error is going to show up
    console.log(`Observer got an error ${error}`);
  },
  complete: () => {
    //IDKN
    console.log("Observer is complete");
  },
};

observable.suscribe(observer); //this is going to suscribe the observable to the observer
//suscribe(observer only) this only is going to recive observer
```

> value is the data emit of the Observable.

> To see if it work node (archive name). (!console)

> An Observable can emit multiple data.

# Pipes and Operators

```js
const { Observable } = require("rxjs");
const { map } = require("rxjs/operators");

const data = {
  user: [
    { name: "Sebastian", age: 20 },
    { name: "Pedro", age: 22 },
    { name: "Juan", age: 22 },
    { name: "Madelyn", age: 23 },
    { name: "Melany", age: 24 },
    { name: "Manuel", age: 25 },
    { name: "Alfonso", age: 26 },
    { name: "Angel", age: 30 },
  ],
};

const observable = new Observable((suscriber) => {
  suscriber.next(data);
  suscriber.next("Hello");
}).pipe(
  map((value) => {
    console.log(`1) Getting data from the observable ${value}`);
    return value.user;
  }),
  map((arg) => {
    console.log(`2) Got data from the first operator ${arg}`);
    return arg; //sending value to the observer
  })
);

const observer = {
  next: (value) => {
    if (typeof value === "object") {
      console.log(value.map((s) => console.log(s)));
    } else {
      console.log(`Is not an Object`);
    }
  },
  err: (error) => {
    console.log(`Observer got an error ${error}`);
  },
  complete: () => {
    console.log("Observer is complete");
  },
};

observable.subscribe(observer);
```

> When you use a pipe the data is not going to emit to the obsever cause is going to flow to the operators of the pipes and **the last operator is going to emit the data to the observer**.

> The first operator is going to send the data a the second operator and this operator is going to send the data to the next operator and so on.

# Handling Errors & Completions

```js
const { Observable } = require("rxjs");
const { map } = require("rxjs/operators");

const data = {
  user: [
    { name: "Sebastian", age: 20 },
    { name: "Pedro", age: 22 },
    { name: "Juan", age: 22 },
    { name: "Madelyn", age: 23 },
    { name: "Melany", age: 24 },
    { name: "Manuel", age: 25 },
    { name: "Alfonso", age: 26 },
    { name: "Angel", age: 30 },
  ],
};

const observable = new Observable((suscriber) => {
  suscriber.next(data);
  suscriber.complete(); //When this method is call is not going to execute the others.
  suscriber.next("Hello World");
}).pipe(
  map((value) => {
    console.log(`1) Using the value from the observable ${value}`);
    if (typeof value === "object") return value.user; //Handling the error
    else throw new Error("Is not an Object");
  }),
  map((value) => {
    console.log(`2) Got data from the first operator,${value}`);
    return value.filter((user) => user.age > 10);
  }),
  map((value) => {
    console.log(`3) Got data from the third operator, ${value}`);
    return value.reduce((sum, user) => sum + user.age, 0);
  })
);

const observer = {
  next: (value) => {
    if (typeof value === "object") {
      console.log(value);
    } else {
      console.log(`The result is ${value}`);
    }
  },
  err: (error) => {
    console.error(`Observer got an error ${error}`);
  },
  complete: () => {
    console.log("Observer is complete");
  },
};

observable.subscribe(observer);
```

> If the error is throw is going to execute in the observer the err part.

> The error parameter is the new error that was created.

> When an error is detected is going to shutdoen completely.

# Of Operator

```js
const { of } = require("rxjs");
```

# More Operators (Star more popular operators)

> https://www.learnrxjs.io/learn-rxjs/operators
