# Express

```js
import express from "express"; //npm i express

const app = express();

app.get("/", (req, res) => {
  //This a route
  res.send(`<h1>Hello World</h1>`); //If the user enter in this route is going to show this h1
  /*
  Send Errors
  res.status('error code (int)').json({message:'Error Code'});
                                .send(Hello World)
  //Send a Json
  res.json({message:'Error Code'})

  //Download a file
  res.download('path of the file')
  */
});

app.get("/about", (req, res) => {
  //Another route
  res.send(`<h1>About Page</h1>`); //Another response
});

app.listen(3000); //Where the server is located
```

> **npm init -y** Just to init the project

> If you want to use that import in the package.json have to add a type:'module'

> You can use nodemon to catch anychange

# Express (Views)

```js
import express from "express";
import { dirname, join } from "path"; //This modules to make the path to the views
import { fileURLToPath } from "url";

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url)); //Making an absolute path to the view module

app.set("views", join(__dirname, "views")); //Settings of the views and where it can find it
app.set("view engine", "ejs"); //view engine is ejs who is showing functional html

app.get("/", (req, res) => {
  res.render("index"); //the res is going to render the view index.ejs
});

app.listen(3000);
console.log("Server on port 3000");
```

> You need ejs to render functional html and you need an absolute route to the view module , and set the settings to show the views.

# Express Routes

```js
//routes.js
import { Router } from "express";

const router = Router();

router.get("/", (req, res) => res.render("index")); //its the same as app.get

router.get(
  "/about",
  (req, res) => res.render("about", { about: "Hello World" }) //You can pass more data {about:xxxx,x:'Hello World'}
);
//Sending like props to the html (about.ejs) (sending an js object)

export default router;

/*
//Using the props (reciving the values from the backend)
<h1><%= locals.about || 'Default'%></h1> //Using the object and if it is define ist going to show
*/

//index.js
import express from "express";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import router from "./routes/routes.js"; //importing the routes

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

//Server Settings
app.set("views", join(__dirname, "views"));
app.set("view engine", "ejs");
//Routes
app.use(router); //Using the routes (by default)
//app.use('/users',users) If the user enter in /users is going to use those routes.

app.listen(3000);
console.log("Server on port 3000");
```

> Its a better idea to make a folder with routes to make modular code.

> **Be Aware of the spaces in the view part** index .ejs (is going to show an error).

# Express Routes (Params)

```js
import { Router } from "express";

const routerUser = Router();

routerUser.get("/", (req, res) => res.send("Users Main Page"));

routerUser.get("/new", (req, res) => res.json({ message: "New User Page" }));

routerUser.get("/:id", (req, res) => {
  //id is the params (the user have to put /users/1(param))
  const params = req.params.id; //Getting the value (params)
  res.json({ message: `User page ${params}` });
});

/*
You can use get,post,delete and put in one way

routerUser.route('/:id')//This is the route that is going to use thos methods
          .get("/", (req, res) => res.send("Users Main Page"))
          .post("/", (req, res) => res.send("Users Main Page"))
          .delete("/", (req, res) => res.send("Users Main Page"))
          .put("/", (req, res) => res.send("Users Main Page"))
*/

export default routerUser;
```

> You have to put first the static routes and below that the dinamics routes

> Be careful with the params , because you have to pass a param to access to that route.

# Express Params (Method)

```js
import { Router } from "express";

const routerUser = Router();

routerUser.get("/", (req, res) => res.send("Users Main Page"));

routerUser.get("/new", (req, res) => res.json({ message: "New User Page" }));

routerUser.get("/:id", (req, res) => {
  const params = req.params.id;
  res.json(req.user); //Showing in the screen the answer
});

const user = [{ name: "Sebastian" }, { name: "Juanito" }];
routerUser.param("id", (req, res, next, id) => {
  //Using the param to do an action
  req.user = user[id]; //using the request to show the user by the param pass
  next(); //to continue to the next line of code
});
export default routerUser;
```

# Navigation between pages (Ejs)

```js
/*
//index.js
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><%= title %></title>
</head>
<body>
    <%- include('./partials/navigation')%> //Using navigation.ejs
    <h1>Home View</h1>
    <%- include('./partials/footer')%> //Using footer.ejs
</body>
</html>
*/
```

> <%- %> You can use some functionality of ejs (include is going to put that part of code (html))

> Create a partials folder and put all the code that is going to reuse.

# Styling (Node JS)

```js
//Using the styles
import express from "express";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import router from "./routes/routes.js";

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

app.set("views", join(__dirname, "views"));
app.set("view engine", "ejs");
//Routes
app.use(router);
//Styling
app.use(express.static(join(__dirname, "public")));

//Using Static HTML
app.use(express.static("index"));

app.listen(process.env.PORT || 3000); //Using the port gave it or using the port 3000
console.log("Server on port", process.env.PORT || 3000);

/*
Using the styles (ejs)
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel='stylesheet' href='/main.css'/>
    <title><%= title %></title>
</head>
<body>
    <%- include('./partials/navigation')%> //Using navigation.ejs
    <h1>Home View</h1>
    <%- include('./partials/footer')%> //Using footer.ejs
</body>
</html>
*/
```

> Creating a public folder (in express is common to use this folder to save the styles).

> You can access to the styles just writing in this way (**localhost:3000/styles.css**)

> You can use a partial to not repeat all the time link rel.

# BootStrap

> Just link it with link rel (is the same as using the styling)

# Express Middleware

```js
import express from "express";
import router from "./router/routes.js";
import routerUser from "./router/users.js";

const app = express();

app.use(logger()); //This is Global middleware
app.use(router);
app.use("/users", routerUser);

app.get("/", auth, (req, res) => {
  //Using the auth function (middleware)
  res.send("Hello World");
});

app.get("/about", (req, res) => {
  res.send("Hello World");
});

app.listen(process.env.PORT || 3000);

function logger(req, res, next) {
  console.log("Logger");
  next(); //Have to put next to continue the code
}

function auth(req, res, next) {
  req.admin = true; //value by default (others functions can access to that value)
  console.log(req.originalUrl); //Gave to you the url
  next();
  return; //To avoid a problem with the next
}

console.log("Servidor on PORT", process.env.PORT || 3000);
```

> The middleware is going execute first when you enter a route and later the route events.

> If you want a global middleware you have to put it at the top.

> The next is going to run two times and if a function who have if dont have return without else is going to throw an error.
