# Usefull Methods

# Return a object with the desired keys a values

```ts
const str: string = "Hello=Hola&World=Mundo&Number=123456";

const getText = (arr: string[]) => {
  //The given array is going to be an array of string without &
  return arr.reduce(
    (initial: { [key: string]: string }, item) => {
      //That type is for ts know that it will be a object with key and values:string
      let result = item.split("=");
      //Given an array with the item without =
      initial[result[0]] = result[1];
      //The position 0 in the object will be the result[0] and the value result[1] and so on....
      return initial;
    },
    {} /*initial = object {}*/
  );
};

console.log(getText(str.split("&")));

/*
Notes:

Split: With a pattern is going to return a array of strings without the given pattern
Reduce: Is going to return a desired value
initial:{[key:string]:string} : object{key:value}
Join: creates and returns a new string by concatenating all of the elements in an array with a pattern or without it.
*/
```
