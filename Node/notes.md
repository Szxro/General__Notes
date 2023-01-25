# Node

- Some definitions:

1. Globals (You can access them in anywhere)

2. \_\_dirname (path to current directory)

3. \_\_filename (the file name and teh route)

4. require (function to use modules (CommonJS))

5. module (info about the current module (file))

6. process (info about env where the program is being executed).

7. CommonJs (Every file is module by default)

8. Modules (Encapsulated code)

> Node is build js for backend use.

> Normal js code , execute with node **node name-arhive**

> You can log them (Globals are variables)

> Every file in node is a module

> When you make a file , use the camelCase

# Module

```js
const name = "Sebastian";
export const greet = "Hello World"; //Exporting EcmaScript

module.exports = { name, greet }; //Exporting in a object multiple files(Common js)
```

> **module.exports={xxxx,xxxx}** is Common Js , **export default = {xxx,xxx}** is EcmaScript , to no have error , you have to put the same type (CommonJs = CommonJs)

```js
const upperCase = (name) => {
  console.log(name.toUpperCase());
};

module.exports.upperCase = upperCase; //Sending just the function
```

```js
import { name, greet } from "route/name.js"; // EcmaScript
const name = require("./route of the const"); //making a object with the name of name and using the values exported. (CommonJs)
const upper = require("./route of the function ");

upper(name.name); //Using the const and functions.

console.log(name /*upper*/); //Showing the object name or upper

//Creating a more descriptive error
console.error(new Error("Error in the line 20"));

/*
With destructuring 
cons nam = require ('./rooute of the const');

const {name,greet}=nam;

console.log(name);
*/

/*
//app.js
require('./route') This is going to execute the function

//function.js
const sum=()={
    console.log('Name');
}

sum()
*/
```

> You can use the require alone to execute functions.

> You can export it lonely, but work the same.

> When you import or export sometime js execute all the code.

> You must import it , to acccess to that variable.

> Its a good idea to use the same of the module that you are using.

# Timers

```js
//It will execute before the sync code is executed
const greet = function (msg) {
  return console.log(`Hello ${msg}`);
};

console.log("Executed"); // Sync code
setImmediate(greet, "Sebastian"); //before the sync code finished it will executed this
console.log("Finished"); //Sync code
```

> The other are the usual setInterval or setTimeOut from JS.

# OS Module

```js
const system = require("os"); //Using the module

const userName = system.userInfo(); //Taking the userInfo

const userTime = system.uptime(); //Taking the user Time in seconds

const { username } = userName; //Desctructuring the userName

const currentOS = {
  //Info about the os
  name: system.type(), //Plataform
  plataform: system.plataform(), //Plataform
  release: system.release(), //Version of the plataform
  totalMem: system.totalmem(), //Total Ram
  freeMen: system.freemem(), //Free Ram
};

console.log(currentOS);
```

> This is a module of the operating system (have info about the user and the os that are using)

# Process Module

```js
//Get the info about the process of the node
console.log(process);

//It show the enviroment process
console.log(process.env);

//return the arguments pass in the console in an array form
console.log(process.argv); // node file_name.js "args"

//return an object showing the memory usage and other usefull stuffs
console.log(process.memoryUsage());
```

# Path Module

```js
const path = require("path");

console.log(path.sep); //Just show / (separator) maybe can be different in other OS

const pathName = path.join("/containt", "subfolder", "file"); //just join route of dir and make a valid route.

const base = path.basename(pathName); //just show the final part of the pathName (string) (the base of that route)

const absolute = path.resolve(__dirname, "containt", "subfolder", "file"); //this is an absolute route , with this you make it.
//You can put strings.

const dirName = path.dirname(pathName); //Just show the route without the base of the route (file)

const parseName = path.parse(pathName);
//Show all the info of that route in a object.

const resolveName = path.resolve(pathName);
//Show a full route with the route that you put in ().
```

> You can use strings too

# FS Module (Sync)

```js
const { readFileSync, writeFileSync } = require("fs");
//One read files , and the other write Files
const read = readFileSync("route of the file", "utf8");
//utf8 (character encoding)
console.log(read); //Just show what it is in the text.
/*
console.log(read.toString()); //Transform from buffer to string.
*/
writeFileSync("route of the file", "data", { flag: "a" });
//With this the new data is not going to replace the data that is in the file (without the flag the data is going to replace the data of the document)

fs.writeFileSync(
  "route/new txt",
  "data (what is going to be in the txt or a variable)"
);
//Create a new file and write in it.
```

# FS Module (Async)

```js
const fs = require("fs");

//reading a file
fs.readFile("route of the file", "utf-8", (error, data) => {
  //without the Sync part is Async
  console.log(data.toString()); //Show the data of the file
  console.log(error); //If an error exists is going to show it
  fs.writeFile("./text2.txt", data, (err) => {
    if (err) console.log(err); //This is just going to create and write a file it dont return something.
  });
});

//renaming a file
fs.rename("route_of_the_file.extension", "new_name", (err) => {
  if (!err) {
    return console.log("Name Changed");
  }
  return console.error(new Error(err));
});

//adding data to a file
fs.appendFile("./hello.txt", "Hola Mundo", (err) => {
  if (!err) {
    return console.log("Append");
  }

  return console.error(new Error(err));

  //replacing all the data in the file
  fs.writeFile("./hello.txt", "Hello Sebastian", (err) => {
    if (err) {
      throw err;
    }

    console.log("All changed");
  });
  // unlink is going to delete the file
});
```

> Code Sync is just to wait that the first job is done to continue , with the next one, and Code async is just doing to job a the same time.

> You can put more function inside the readFile function.

# Event Module

```js
const EventEmitter = require("events");

//Creating a new instace of eventEmitter
const event = new EventEmitter();

// event.on('event_name',function)
event.on("greet", () => {
  console.log("Hello World");
});

//event.emit('event_name',arg)
event.emit("greet");
```

> Can emit more than one time

> To see a change have to emit

# HTTP Module (Response)

```js
const http = require("http");

http
  .createServer((request, response) => {
    //This create the server
    response.write("Hello Server"); //This write the response
    console.log(res.statusCode); // Status code of the response
    response.end(); //This en the response
  })
  .listen(3000, () => {
    console.log("Server is Running on Port 3000");
  }); //This is where the server is going to locate (localhost:3000)
```

> This is a example of a izi (simple) Server.

# HTTP Module (Request)

```js
const http = require("http");

http
  .createServer((request, response) => {
    console.log(request.url); //Show where the user is
    console.log(request.method); // Method of the request
    console.log(request.headers); //Headers of the request
    response.write("Hello Server");
    response.end();
  })
  .listen(3000);

console.log("Servidor ON");
/*
Some Example
http.createServer((request,response)=>{
  if(request.url!=='/'){
    response.write('Changing Routes');
    return response.end(); //You must put this to return the of this response (to not have an error)
  }
  response.write('Hello World')
  response.end()
})
*/

/*
http.createServer((request,response)=>{
    if(request.url !== '/'){
        response.write('You are Changing routes');
       return response.end()
    }
        response.write(` //Showing to the user a html response
        <h1>Hello World</h2>
        <a href='/about'>Go to the next Page</a>
        `);
        response.end()
}).listen(3000)
*/
```

> request.Url just show where the user is.

> You can put html in the part of response.write

# NPM

> package.json is where the module is install and dependencys

> package_lock.json is where the module is install and where this module is use (dependencys)

> node_modules is where the module is located and their code

> When you install a module with npm you just have to save it , in a const with require and the name of the module.

> SEMVER (Semantic Version)

# NPM INIT

> This is just to create a module of npm , is you want ot run it , you only have to put in the script part what code do you want to execute (start or dev) the name have to be diff.

> nodemon is always watching for a change on the node code. (is a usefull module)

> if you install a module like this **npm i nodemon** is a dependency , but if you install in this way **npm i nodemon -D** this module is just for Developer porpuse (devDependency).

> **npm remove 'module name'** remove from the project , with -g it remove globally.

> **npm i nodemon -g** install gloabally , you can execute code globally , like **nodemon 'file.js'** it will run it.

> **npm init -y** create a package.json with the default values.

# NPX

> CLI (Common Line Interface)

> You can execute some module that you install in the terminal like this **./node_modules/.bin/nodemon file.js**

> In the package.json you can put a script part to run a module.

> npx is just to execute module (**It dont install it**).

> Is a izi way to execute module with npx (**npx nodemon file.js**)

> npx cowsay Hello World , it execute it and dont install it.

> serve module is like a GoLive Server is just a static server.

# Event Loop

> Node is a Single Threat

> Blocking code is the code that is blocking the main threat of node.

# Promises

```js
const { readFile } = require("fs");

const getText = (path) => {
  return new Promise((resolve, reject) => {
    readFile(path, "utf-8", (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
};

getText("./index.txt")
  .then((result) => console.log(result))
  .then(() => getText("./index2.txt"))
  .then((result) => console.log(result))
  .catch((err) => console.log(err));
```

> Just the normal promises.

# Async / Await

```js
const { readFile } = require("fs");

const getText = (path) => {
  return new Promise((resolve, reject) => {
    readFile(path, "utf-8", (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
};
const read = async () => {
  try {
    const result = await getText("./index.txt"); //The same top example but with less code
    console.log(result);
    const result2 = await getText("./index2.txt");
    console.log(result2);
  } catch (err) {
    console.error(err);
  }
};

read();
```

> Just the normal async and await , when yo put async is an asyncronous code and you must put await.

# Promisify

```js
const { readFile } = require("fs");
const { promisify } = require("util"); //You must import it to use it.

const getText = promisify(readFile); //This convert into a Promise

const read = async () => {
  try {
    const result = await getText("./index.txt", "utf8");
    console.log(result);
    const result2 = await getText("./index2.txt", "latin1");
    console.log(result2);
  } catch (err) {
    console.error(err);
  }
};

read();
```

> With this it convert into a promise , is more legible and more izi to understand the code.

# FS Promises

```js
const { readFile } = require("fs/promises"); //With this the fs function are Promise

const read = async () => {
  try {
    const result = await readFile("./index.txt", "utf8");
    console.log(result);
    const result2 = await readFile("./index2.txt", "latin1");
    console.log(result2);
  } catch (err) {
    console.error(err);
  }
};

read();
```

> Less Code, Same work.

# Events

```js
const eventEmitter = require("events"); //Must import

const emitter = new eventEmitter(); //Creating the event

emitter.on("response", (data) => {
  //the response part is the name of the emitter you can name it the way you want , data is those parameters of the function
  //You can put more than one paramater
  console.log(data);
});

emitter.emit("response", "Hello World"); //Here are emiting and sendind the data
emitter.emit("response", [1, 2, 3, 4, 5, 6]);
```

> Is like the addEventListener but different that you are no touching or using the Dom.

# Streams

```js
const { createReadStream } = require("fs"); //Must import it

const read = createReadStream("./index.txt", "utf-8"); //Create the event read file

read.on("data", (chunk) => {
  //The data
  console.log(chunk);
});

read.on("end", () => {
  //When it end show that log
  console.log("Finished");
});

read.on("error", (error) => console.log(error)); //If exist an error show the error
```

> Streams read the info a showing by parts (chunks).

# Streams && Http

```js
const http = require("http");
const { createReadStream } = require("fs");

const server = http.createServer((req, res) => {
  const readStream = createReadStream("./index.txt", {
    encoding: "utf-8",
  });
  readStream.on("data", (chunk) => {
    res.write(chunk);
    readStream.pipe(res);
    return res.end();
  });
  readStream.on("error", (err) => {
    console.log(err);
  });
});

server.listen(3000);

console.log("Server on port 3000");
```

> This is just an example, how the server is getting the info by part thank to the streams.
