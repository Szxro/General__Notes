# Programacion Asincronica

## Temporizadores (setTimeout & setInterval)

- setTimeout

Establece un temporizador que ejecuta una función o una porción de código después de que transcurre un tiempo establecido.

- setInterval

Usa setInterval() para hacer que una función se repita con un tiempo de retraso entre cada ejecución.

```javascript
/*
- setTimeout

setTimeout(function, millisegundos, parametro, parametro, ...);

- setInterval

setInterval(()=>{
    function.....
},time)

*/

//Se ejecuta una vez en el tiempo dado
setTimeout(() => {
  console.log("Se ejecuta una vez");
}, 1000);

//Se ejecuta en el intervalo de tiempo dado

setInterval(() => {
  console.log("Se ejecuta en el intervalo de tiempo dado");
}, 1000);

// (Se ejecuta esa funcion cada un segundo (1000))

//clearTimeout();

let temporizador = setTimeout(() => {
  console.log("Hello World");
}, 1000);

clearTimeout(temporizador);
//Con esto detiene el temporizador

//clearInterval();
let temporizador = setInterval(() => {
  console.log("Hello World");
}, 1000);

clearInterval(temporizador);
//Con esto detiene el interval

//Con funcion (timeout)

function saludos(nombre, rol) {
  console.log(`Hola, mi nombre es ${nombre}`);
  console.log(`Yo soy ${rol}`);
}

setTimeout(saludos, 3000, "Nathan" /*nombre*/, "Programador" /*rol*/);

//con funcion (interval)
let identificadorIntervaloDeTiempo;

function mandarMensaje() {
  console.log("Ha pasado 1 segundo.");
}

function repetirCadaSegundo() {
  identificadorIntervaloDeTiempo = setInterval(mandarMensaje, 1000);
}
```

## Callbacks !important

Una función callback es aquella que es pasada como argumento a otra función para que sea "llamada de nuevo" (call back) en un momento posterior.

```javascript
const cuadrado = (value, callback) => {
  setTimeout(() => {
    callback(value, value * 2);
  }, 0 || Math.round(Math.random() * 1000));
};
//Aqui se esta haciendo como si fuera una funcion asincronica

/*La funcion revise dos parametros el valor y el callback el cual tendra dos parametros el valor  el resultado*/

cuadrado(2, (value, result) => {
  console.log("Inicio Callback");
  console.log(`Callback: ${value},${result}`);
  cuadrado(3, (value, result) => {
    console.log(`Callback: ${value},${result}`);
  });
  cuadrado(4, (value, result) => {
    console.log(`Callback: ${value},${result}`);
  });
});

/*Aqui se le da el valor y con una funcion anonima se toma el valor y resultado y lo ensena en consola*/

//Otro ejemplo

function modify(arr, callback) {
  //Se hace algo
  arr.push("Pedrito");
  //Despues de hacerlo
  setTimeout(() => {
    callback(arr);
  }, 3000);
}
/*Aqui se da la impresion como si fuera una funcion asincronica y el callback se ejecuta despues de 3 seg*/

const names = ["Sebastian", "Pedro", "Juan"];

modify(names, (arr) => {
  console.log(`Se ha modificado el array ${arr.length}`);
});

//Otro ejemplo

const operation = (number1, number2, callback) => {
  return callback(number1, number2);
};

operation(1, 4, (a, b) => a + b);
operation(1, 4, (a, b) => a - b);
operation(1, 4, (a, b) => a * b);
operation(1, 4, (a, b) => a / b);

// setTimeout (asincrono)

const operation = (number1, number2, callback) => {
  return setTimeOut(() => {
    callback(number1, number2);
  }, 500);
};

operation(1, 3, (a, b) => {
  console.log(a + b);
});
operation(1, 3, (a, b) => {
  console.log(a - b);
});
```

## Notas

> Tener cuidado con el callback hell o la piramides de callbacks.

> Se pueden utilizar mas de una en una funcion.

> Se utiliza mas async/await que el mismo callback

## Promesas !important

Es un objeto que representa la terminación o el fracaso de una operación asíncrona.

```javascript
const cuadrado = (value) => {
  //Reject
  if (typeof value !== "number")
    return Promise.reject({
      error: `el valor ${value} ingresado no es numero`,
    });
  //Resolve
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        value,
        result: value * 2,
      });
    }, 0 || Math.round(Math.random() * 1000));
  });
};
/*Las promesas tiene dos parametros el resolve y el reject , uno es si todo esta bien y otro por si acaso pasa un error*/

cuadrado(2)
  .then((obj) => {
    console.log(obj);
    console.log(`Promise> ${obj.value} , ${obj.result}`);
    return cuadrado(3);
  })
  .then((obj) => {
    console.log(`Promise> ${obj.value} , ${obj.result}`);
    return cuadrado(4);
  })
  .then((obj) => {
    console.log(`Promise> ${obj.value} , ${obj.result}`);
    return cuadrado(5);
  })
  .then((obj) => {
    console.log(`Promise> ${obj.value} , ${obj.result}`);
    console.log("Fin de la promesa");
  })
  .cacth((err) => console.error(err));

/*Para usar la funcion con promesa se hace de esta manera , utilizando then el cual representa resolve y el cath que representa el reject*/

//Otro Ejemplo

const cuadrado = (value) => {
  if (typeof value !== "number")
    return Promise.reject({
      error: `El valor ${value} asignado es invalido`,
    });
  return Promise.resolve({
    value,
    result: value * 2,
  });
};

cuadrado(2)
  //resolve
  .then((obj) => {
    console.log(`El valor es ${obj.value},${obj.result}`);
    return cuadrado(3); // Aqui se llama de nuevo la funcion
  })
  .then((obj) => {
    //Este es el reultado de la llamada anterior
    console.log(`El valor es ${obj.value},${obj.result}`);
    return cuadrado("Puto");
  })
  .then((obj) => {
    console.log(`El valor es ${obj.value},${obj.result}`);
  })
  //reject
  .catch((err) => console.error(`${err.error}`));

//More cleaner
const cuadrado = (value) => {
  return new Promise((resolve, reject) => {
    if (typeof value !== "number") {
      reject({
        error: `El valor ${value} es invalido`,
      });
    } else {
      setTimeout(() => {
        resolve({
          value,
          result: value * 2,
        });
      }, Math.round(Math.random() * 1000));
    }
  });
};

// Multiples promesas

const record1 = new Promise((resolve, reject) => {
  resolve("Video 1");
});

const record2 = new Promise((resolve, reject) => {
  resolve("Video 2");
});

const record3 = new Promise((resolve, reject) => {
  resolve("Video 3");
});

/*Con esto se puede utilizar todas promesas mencionadas en el array o objecto*/
Promise.all([record1, record2, record3]).then((message) => {
  console.log(message);
});

/*A la primera promesa a terminar devolvera el valor y lo mostrara*/
Promise.race([record1, record2, record3]).then((message) => {
  console.log(message);
});
```

## Notas

> Esto puede ser usado como un callback , en la parte de arriba se nota que es diferente al callback hell , es mas organizado aunque es conocido tambien como el promise hell.

> Cuando obtiene un error pasara directamente al catch , las promesas son como un if/else.

> Cuando se utiliza el promise all primero se debe de ejecutar la primera , segunda y asi por el estilo hay que esperar que terminen.

## Async/Await !important

La declaración de función async define una función asíncrona, la cual devuelve un objeto AsyncFunction. **Necesita await**.

```javascript
const cuadrado = (value) => {
  return new Promise((resolve, reject) => {
    if (typeof value !== "number") {
      reject({
        error: `El valor ${value} es invalido`,
      });
    } else {
      setTimeout(() => {
        resolve({
          value,
          result: value * 2,
        });
      }, Math.round(Math.random() * 1000));
    }
  });
};

/*Cuando se utiliza una funcion asincronica , cuando se ejecuta la funcion al instante dara el resultado pero si la funcion usada como este caso dura un tiempo se debera usar await para esperar los datos y mostrarlos sino se hace mostrara undefined*/
async function valores() {
  try {
    const obj = await cuadrado(8);
    console.log(`El valor es ${obj.value},${obj.result}`);

    obj = await cuadrado("he");
    console.log(`El valor es ${obj.value},${obj.result}`);
    //Utilizando el obj error y mostrandolo por consola
  } catch (obj) {
    console.error(`${obj.error}`);
  }
}
//Ejecutando la funcion
valores();

//Funcion async Expresada
const hello = async () => {
  //Doing stuff....
};
```

## Notas

> Trabajan en conjunto con las promesas.

> Para el manejo de errores en una funcion con async/await es mejor utilizar el try/catch.

> Await es solo reservado para una funcion async.

## this !important

```javascript
/*this tiene dos contexto el global y el local*/

console.log(this);
/*Al imprimir por consola esto , lo que mandara el objecto global el cual es window*/

this.nombre = "Contexto Global";

console.log(this.nombre);

const imprimir = () => {
  console.log(this.nombre); //Esta en el contexto global
};

//Contexto local

const obj = {
  nombre: "Sebastian",
  imprimir() {
    console.log(this.nombre);
  },
};

obj.imprimir();

/*En esta forma el this cambia de manera global a manera local ya que se esta referiendo al nombre que esta en el obj.*/
```

## JSON (Javascript Object Notation) !important

- Valores Aceptados en los JSON

1. Numbers

Enteros y numeros decimales son los mismo 30(entero),30.1(float).

2. Strings

Caracteres Unicode
Usa doble quotes ("Hello World")

3. Boolean

true o false

4. Arrays

Lista ordenadas , empienza desde el 0 ,[1,2,3].

5. Object

Pares de llaves/valores ({"nickname":"Szxro"})

6. null

Valores vacios.

```javascript
const obj = {
  name: "Sebastian",
  nickname: "Szxro",
  hobbies: ["Sleep", "Code", "Repeat"],
  address: {
    street: "123 Main st",
  },
};

console.log(obj); // Es un objecto de javascript

//Convirtiendolo a JSON

console.log(JSON.stringify(obj)); //Se convirtio a JSON

//Arrays en JSON

const friends = [
  { name: "Pedrito", nickname: "Juanito" },
  { name: "Pedrito", nickname: "Juanito" },
  { name: "Pedrito", nickname: "Juanito" },
];

//Conversion de un arreglo de objecto a JSON
console.log(JSON.stringify(friends));

//Convirtiendo de JSON a OBJECTO de Javascript

let obj2 = JSON.parse(`{
	"name": "Sebastian",
	"nickname": "Szxro",
	"hobbies": ["Sleep", "Code", "Repeat"],
	"address": {
		"street": "123 Main st"
	}
}`);

console.log(obj2);
```

- Creacion de json

index.json

```JSON
{
	"name": "Sebastian",
	"nickname": "Szxro",
	"hobbies": ["Sleep", "Code", "Repeat"],
	"address": {
		"street": "123 Main st"
	}
}
```

## Notas

> En un JSON puedes colocar un objecto dentro de este

**Ejemplo:**
Objecto Embeidos
{
"name":"Sebastian",
"age":20,
"address":{
"city":"Santo Domingo"
}
}

> Esto seria representado como un sub-objecto o sub-json.

> Los JSON deben de terminar en .json

> JSON.stringify lo convierte en un String y despues lo convierte en un JSON valido.

> Validador de JSON (jsonlint.com)

> Si hay un dato no valido en el objecto lo que hara es que lo obviara.

# DOM !important

DOM son las siglas de Document Object Model y es una interfaz de programación que nos permite crear, cambiar o remover elementos del documento.

- Nodos,Elementos y Selectores

```html
<h3 id="H3">DOM Begining</h3>
<ul>
  <li>Hello</li>
  <li>World</li>
</ul>
<section class="card">
  <div>Hello World</div>
</section>
<input type="text" name="nombre" placeholder="Nombre" />
```

```javascript
let list = document.getElementByTagName("li");
//Traeme los elementos que tenga la etiqueta li o x etiqueta.

let clas = document.getElementByClassName("card");
//Traeme los elementos que tenga la clase card o x clase

let name = document.getElementByName("nombre");
//Traeme los elementos que tengan el name nombre

let id = document.getElementByid("H3");
//Traeme los elementos con el id H3 o x id

//querySelector

//Por ID (se utiliza mas el ID)
console.log(document.querySelector("#H3"));
//Utilizando id , se le debe ponder # si es por ID.

// Por TagName
console.log(document.querySelector("li"));
//Utilizando tagname ,trae el primer elemento con li.

console.log(document.querySelectorAll("li"));
//Utilizando tagname , los trae todos,  este devuelve NodeList

console.log(document.querySelectorAll("li").length);
// Tiene parte de los metodos de los arrays, aqui da la longitud del los elementos.

document.querySelectorAll("li").forEach((a) => console.log(a));
//Aqui esta utilizando el metodo forEach para imprimir el codigo html de cada li.

//Por clases
console.log(document.querySelector(".card"));
//Aqui me trae el elemento que tenga la clase card, solo la primera me trae

console.log(document.querySelectorAll(".card"));
//Aqui me trae todos los elementos con la clase card, en una Nodelist

console.log(document.querySelectorAll(".card")[2]);
//Como es como un array se puede acceder a x posicion.

//Selector descendente
console.log(document.querySelectorAll("#menu li"));
//Aqui me mostrara las li que esten menu
```

## Notas

> Al traer los elementos por Name estos son tipo NodeList esto es una parte del don , los conocidos nodos.

> getELementByid se sigue usando por que es mas rapido que querySelector.

> Con querySelector si se se quiere solo el primer elemento se utiliza **querySelector()** , pero si se quiere todos los elementos **querySelectorAll()**.

> Se utiliza mas para id getElementByid y para lo demas querySelector y querySelectorAll.

- Atributos y Data-Attributes

```html
<a class="link" href="#" data-descripcion="Document Object Model">DOM</a>
```

```javascript
//Atributos
console.log(document.querySelector(".link").href);
//Aqui me trae el atributo href y me lo ensena

console.log(document.querySelector(".link").getAttribute("href"));
//Aqui me trae el atributo y es la forma correcta.

//Estableciendo un nuevo valor
document.querySelector(".link").setAttribute("href", "google.com");
//setAttribute toma dos valores el primero el valor a cambiar y el segundo el valor.

//Guardando en un const un elemento
const $link = document.querySelector(".link");

$link.setAttribute("href", "https://www.google.com/?hl=es");

//Conciderado buena practica al abrir una nueva pestana de la pagina origen.
$link.setAttribute("rel", "noopener");

//Tiene el atributo?
console.log($link.hasAttribute("href"));
//Devuelve true o false segun sea el caso

//Eliminando un atributo
$link.removeAttribute("href");
f;

//Data Atributes

console.log($link.getAttribute("data-descripcion"));
//Devuelve el atributo data-descripcion

console.log($link.dataset);
//Devuelve un Dommap

console.log($link.dataset.descripcion);
//Devuelve el atributo data-descripcion

$link.setAttribute("data-descripcion", "Hello World");
//Cambia el atributo de data-descripcion a Hello World

//Tambien se puede utilizar en estos el hasAttribute y el removeAttribute
```

## Notas

> Se utiliza const para guardar elementos del dom, tambien se puede utilizar para guardar arrays y objectos.

> Se utiliza este signo $ para distinguir entre variables del dom y variables de la logica de la pagina.(buena practica)

- Estilos y Variables CSS

```html
<a
  class="link"
  href="#"
  style="color:#000"
  data-descripcion="Document Object Model"
  >DOM</a
>
```

```css
:root {
  --color-white: #fff;
}
```

```javascript
const $link = querySelector(".link");
console.log($link.style);
//Me devuelve un CSSStyleDeclaration con todas las propiedas validas del elemento.

console.log($link.getAttribute("style"));
//Me devuelve el estilo

console.log($link.style.color);
//Me devuelve el color

console.log(window.getComputedStyle($link));
//Me devuelve el estilo computado

$link.style.setProperty("text-decoration", "none");
//Poniendo x estilos a x elementos , en la primera parte el estilo y en la segunda el valor del estilo.

$link.style.width = "50%";
$link.style.textAlign = "center";
//Accediendo con las notacion del punto

//Accediendo a variables css
const $html = document.documentElement,
  $body = document.body;

let global = getComputedStyle($html).getPropertyValue("--color-white");
/*Primero se accede al html , despues al body y luego se accede al html y con a la variable de css --color-white*/

console.log(global);
//Imprime el valor de la variable de css

$body.style.backgroundColor = global;
//Dandole el color de la variable a body

//Cambiando valor de las variables css
$html.setProperty("--color-white", "pink");
let global = getComputedStyle($html).getPropertyValue("--color-white"); //Cambio a pink
$body.style.setProperty("background-color", global);
```

## Notas

> Se puede anadir de dos formas estilos con la notacion del punto o setProperty.

> Al obtener los estilos de la variable global de css, no se le pone sino de $ sino nombre normal por que no hace referencia al dom.

> Al cambiar los estilos de las variables css primero se le dan las propiedades al html despues se usa una variable para obtener el valor actualizado y despues se le da al body o a el elemento la propiedad.

- Clases Css

```html
<section class="card">
  <div class='card__text'>Hello World<div>
</section>
```

```css
:root {
  --color-dark: #000;
  --color-white: #fff;
}

.card {
  display: block;
  background-color: var(--color-dark);
  color: var(--color-white);
}
```

```javascript
const $card = document.querySelector(".card");
console.log($card.className);
//Devuelve el nombre de la clase

console.log($card.classList);
//Devuelve un DomTokenList (Es como un array)

console.log($card.classList.contains("color"));
//Devuelve un true o false segun se el caso, aqui pregunta si card contiene alguna clase con el elemento colorr.

//Anadiendo x clase
$card.classList.add("rotate-45");
//Cuando se anade de esta forma se le anade a nombre de clase y classList

//Quitando clase
$card.classList.remove("rotate-45");

//Metodo Toggle
$card.classList.toggle("rotate-45");
/*Si no tiene esa clase se la agrega (Esto se usa en el dark-mode)*/

//Metodo replace
$card.cardList.replace("rotate-45", "card-135");
//Remplaza una clase en especifico la primera parte la clase a remplazar y la segunda la clase deseada
```

## Notas

> Esto es anadiendo clases a elemento card.

- Texto y html

```html
<p id="text">loremdasdasdasdsadas</p>
```

```javascript
const $text = document.getElementByid("text");

let text = `
Hello World
`;

let p = `
<p>
Lorem sdadasddasdasdasdadadad
</p>
`;
//Cambiando el texto de text por la variable text
$text.innerText = text;
//Esto fue creado para internet Explorer pero no es parte del estandar.

$text.textContent = text;
//Este es parte del estandar

$text.innerHTML = p;
//Todas las etiquetas html se rederizan.

$text.outerHTML = p;
//Remplaza los elementos html con los elementos de la variable p
```

## Notas

> Con esto podemos cambiar o anadir texto a un p o cualquier elemento que necesite

> Se usa innerHTML cuando se valla a rederizar html en el elemento y la otra parte textContent cuando solo se necesite texto.

- DOM Travesing (Recorriendo el DOM)

```html
<section class="card">
  <figure class="card__img__container">
    <img src="#" class="card__img" alt="image" />
    <figcaption>Imagen</figcaption>
  </figure>
</section>
```

```css
:root {
  --dark-color: #000;
  --white-color: #fff;
}

.card {
  border: 2px solid var(--dark-color);
  padding: 1em;
}
```

```javascript
const $card = document.querySelector(".card");

console.log($card.children);
//Devuelve los hijos de card en una HTMLCollection.

console.log($card.children[2]);
//Accediendo al segundo hijo, utiliza las posiciones de los arrays

console.log($card.parentElement);
//Devuelve el padre del elemento card

console.log($card.firstChild);
//Devuelve el primer nodo hijo.

console.log($card.firstElementChild);
//Devuelve el primer elemento hijo de card

console.log($card.previousSibling);
//Devuelve el hermano previo del nodo

console.log($card.previousElementSibling);
//Devuelve el elemento hermano previo de card

console.log($card.childNode);
//Devuelve los hijos nodos

console.log($card.closest("img"));
//Devuelve el elemento x mas cercano

console.log($card.children[2].closest("section"));
//Devuelve el elemento x en la posicion 2 y devuelve el elemento section mas cercano
```

## Notas

> Esto es enfocado a las etiquetas html.

> Tambien existen lastChild y lastElementChild

- Creando Elementos y Fragmentos

```javascript
//Creando ELementos Dinamicamente
const $figure = document.createElement("figure"),
  $img = document.createElement("img"),
  $figcaption = document.createElement("figcaption"),
  $figcaptionText = document.createTextNode("Animals"),
  $card = document.querySelector(".card");

//Anadiendo elementos al dom
$figcaption.appendChild($figcaptionText);
$figure.appendChild($img);
$figure.appendChild($figcaption);
//Anadiendo elementos a figure

//Anadiendo etiquetas
$img.setAttribute("src", "https://placeimg.com/200/200/animals");
$img.setAttribute("alt", "Animals");

//Anadiendo Clase
$figure.classList.add(".card");

$card.appendChild($figure); //Anadiendo la figure a card

//Anadiendo elementos desde un array

const estaciones = ["Primavera", "Verano", "Otono", "Invierno"];

const $ul = document.createElement("ul");
const $h3 = document.createElement("h3");
const $h3Text = document.createTextNode("Estaciones del ano");
$h3.appendChild($h3Text);
/*
Se puede lograr lo mismo con $h3.textContent="Estaciones del ano"
*/
document.body.appendChild($h3);
document.body.appendChild($ul);
//Anadiendo elementos al body

estaciones.forEach((x) => {
  const $li = document.createElement("li");
  $li.textContent = x;
  $ul.appendChild($li);
});

//Otra manera de hacerlo pero con el innerHTML
const estaciones = ["Primavera", "Verano", "Otono", "Invierno"];
const $ul = document.createElement("ul"),
  $h3 = document.createElement("h3");

$h3.textContent = "Estaciones del ano";
$ul.innerHTML = "";

estaciones.forEach(function (x) {
  $ul.innerHTML += `<li>${x}</li>`;
  //Importante += por que si no solo ensenara el ultimo elemento del array
});

//No es considerado buena practica pero aun lo hacen.

//Manera optima con fragmentos
const estaciones = ["Primavera", "Verano", "Otono", "Invierno"];
const $ul = document.createElement("ul"),
  $fragment = document.createDocumentFragment(),
  $h3 = document.createElement("h3");

$h3.textContent = "Estaciones del ano";

estaciones.forEach((x) => {
  const $li = document.createElement("li");
  $li.textContent = li;
  $fragment.appendChild($li);
});

document.body.appendChild($h3);
$ul.appendChild($fragment);
document.body.appendChild($ul);
```

## Notas

> Esta es la forma correcta de crear elementos dinamicamente.

> Con el document.write se puede crear un elemento de html pero no es muy buena practica.

> Importante cuando se valla a trabajar con innerHTML este debe estar vacio.

> Con los fragmentos es mas optimo por que pide menos recursos al navegador del usuario.

- Templates HTML

```html
<template id="template-card">
  <figure class="card">
    <img />
    <figcaption></figcaption>
  </figure>
</template>
```

```javascript
const $card = document.querySelector(".card"),
  $template = document.getElementByid("template-card").content, //Se accede al contenido del template
  $fragment = document.createDocumentFragment(),
  cardContent = [
    {
      title: "Tecnologia",
      img: "https://placeimg.com/640/480/tech",
    },
    {
      title: "Tecnologia",
      img: "https://placeimg.com/640/480/tech",
    },
    {
      title: "Tecnologia",
      img: "https://placeimg.com/640/480/tech",
    },
    {
      title: "Tecnologia",
      img: "https://placeimg.com/640/480/tech",
    },
  ];

cardContent.forEach((x) => {
  $template.querySelector("img").setAttribute("src", x.img);
  $template.querySelector("img").setAttribute("alt", x.title);
  $template.querySelector("figcaption").textContent = x.title;

  let $clone = document.importNode($template, true);
  //Aqui lo que esta haciendo es copiando la estructura de template
  $fragment.appendChild($clone);
});

$card.appendChild($fragment);
```

## Notas

> Template es una etiqueta nueva que vino con HTML5

> en importNode si se pone false en vez de true solo copiara el inicio y fin de la etiqueta x.

> Las etiquetas template no se rederizan en el DOM.

> Con template es considerado buena practica.

- DOM : Modificacion de elementos

1. Old Style (Old Javascript)

```javascript
const $card = document.querySelector(".card"),
  $newcard = document.querySelector("figure"),
  $cloneCards = $card.cloneNode(true); //clona el card en esa variable funciona como importNode

$newcard.innerHTML = `
  <img src ="#" alt="Any"/>
  <figcaption>Any</figcaption>
  `;
//Anadiendo la clase card
$newcard.classList.add("card");

$card.replaceChild($newcard, $card.children[3]);
/*
replaceChild lo que hace es que remplaza un elemento del selector objectivo
en la primera parte va el nuevo elemento y el segundo elemento lo que va es el elemento viejo a remplazar.
*/

// Remplaza en x nodo
$card.insertBefore($newcard, $card.firstELementChild);
/*
insertBefore lo que hace es que inserta antes de x elemento , en la primera parte el nuevo elemento y en la segunda parte el elemento a remplazar
*/

//ELiminar x elemento
$card.removeChild($card.lastELementChild);

document.body.appendChild($cloneCards);
//Agrega al final la clonacion
```

2. New Style (Modern JavaScript)

```javascript
/*
insertAdjacent

.insertAdjacentElement(position,element)
 (insertBefore,appendChild)

.insertAdjacentHTML(position,html)
(Agrega contenido HTML)

.insertAdjacentText(position.text)
(textContent)
*/

/*
Positions

beforebegin(hermano anterior)
afterbegin(primer hijo)
beforeend(ultimo hijo)
afterened(hermano siguiente)
- Se agrega despues del nodo de referencia
*/

const $card = document.querySelector(".card"),
  $newcard = document.querySelector("figure"),

const $content = `
  <img src ="#" alt="Any"/>
  <figcaption></figcaption>
  `;

$newcard.querySelector('figcaption').insertAdjacentText("afterbegin","Any");

//Anadiendo $content a newcard
$newcard.insertAdjacentHTML('afterbegin',$content);

//Anadiendo la clase card
$newcard.classList.add("card");

//Cambiando orden
$card.insertAdjacentElement('beforebegin',$newcard);
//Se inserta antes del nodo de referencia
```

## Notas :

> appendChild() lo pone al final del selecto objectivo.

> No tiene importancia si usas afterbegin o beforeend en la parte de insertAdjacentHTML()

- Manejador de Eventos

```html
<button type="button" id="button">Press Me</button>
<!--Esta mal visto-->
<button onclick="HelloWorld()">Press me</button>

<!--Evento Multipe-->
<button type="button" id="buttonmultiple">Press Me</button>
```

```javascript
//Evento con manejador semantico (Es la manera correcta)
const $button = document.getElementByid("button");
//De esta manera se le puede dar x evento
$button.onclick = HelloWord;

$button.onclick = function (e) {
  alert("Hola Mundo");
  //e representa el evento
  console.log(e);
};
//Manejador Multiple
const $buttonmultiple = document.getElementByid("buttonmultiple");

$buttonmultiple.addEventListener("click", HelloWorld);

$buttonmultiple.addEventListener("click", (e) => {
  console.log("Mas de un evento");
  console.log(e.type); //Tipo evento
  console.log(e.target); //Su origen (html)
});
/*
$buttonmultiple.addEventListener("tipo evento", funcion)
funcion = listener;
*/

const HelloWorld = () => {
  alert("Hello World");
  //Da un objecto que describe el evento
  console.log(event);
};
```

## Notas

> Documentacion:https://developer.mozilla.org/es/docs/Web/Events

> Esta mal visto aplicar eventos como atributos

> Una funcion con los paratensis significa que al momento que cargue el navegador se va a ejecutar

> La limitante que tiene los manejadores semanticos es que solo podra ejecutar una sola funcion.

> Un manejador de eventos no puede recibir parametros solo el evento.

> Con addEventListener se le puede asignar varias funciones.

- Eventos con Parametros y Remover Eventos

```html
<button type="button" id="buttonmultiple">Press Me</button>

<button type="button" id="remove">Remove me</button>
```

```javascript
const saludar = (nombre) => {
  nombre = nombre || "Desconocido";
  alert(`Hola ${nombre}`);
};

const $buttonmultiple = document.getElementByid("buttonmultiple");

$buttonmultiple.addEventListener("click", () => {
  saludar();
  saludar("Sebastian");
});
//Con esto si se puede utilizar parametros en manejadores de eventos
//Esto se puede hacer con arrow function o funcion anonima

//Remover eventos
const $remove = document.getElementByid("remove");

const remover = (e) => {
  alert(`Removiendo Evento ${e.type}`);
  console.log(e);
  $remove.removeEventListener("dbclik", remover);
  /*
  $remove.removeListener('tipo de evento',funcion);
  funcion = listener
  */
  $remove.disabled = true;
  //Se desabilitda el boton, le agrega el atributo disabled
};

$remove.addEventListener("dbclick", remover);
```

## Notas

> Un manejador de eventos no puede recibir parametros solo el evento.

> Al remover un evento se necesita una funcion nombrada o expresada (arrow function)

> Cuando se ejecuta el removeEventListener primero se ejecuta la funcion y luego se remueve

# Array.At()

```js
const arr = [1, 2, 3, 4, 5, 6, 7];
const obj = {
  name: "Sebastian",
  lastname: "Vargas",
};

/*
Array.at(index);
.at(index) just return the value of the position given
*/
console.log(`Last value ${arr.at(-1)}`); //Last value of the array

//Desctruturing(Array)
const { 0: first, 4: fourth } = arr;
/*
Desctructuring a array with positions
const {position:Alias} = array;
Must put an alias 
If the position dont exist is going to return undefined
*/
console.log(`First Value: ${first} - Fourth Value: ${fourth}`);

//Desctructuring(Object)
const { name: nombre, lastname: apellido } = obj;
//nombre and apellidos are the alias of that value
console.log(`Values of the obj: ${nombre} - ${apellido}`);
```
