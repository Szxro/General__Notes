# Fetching data from an api or local json

Para esto se usa fetch el cual tiene una o formas opcionales.

## POST

```javascript
fetch('url',{
    method:'POST,
    headers:{
        'Content-Type':'application/json'
        //Headers de la api
        //Este es de tipo json , hay diferentes tipos.
    },
    body:JSON.stringify({
        //Lo que le vas a enviar al servidor
        name:'Juan',
        age:'28'
    })
}).then((response)=>response.json())
  .then((data)=>console.log(data))
```

## GET

Este viene por defecto con el fetch

```javascript
fetch("url")
  //then es un callback una promesa
  .then((response) => response.json())
  //response es otra promesa
  .then((data) => {
    console.log(data);
    //esto es una funcion comun y corriente pero se puede usar los datos entregados de la api o el json.
    // data son los datos entregados por la  api
  });
//Aqui ya me muestra los datos de la promesa
```

Tambien en la parte de la url se puede agregar un elemento que queramos

Ejemplo:

> const pokemon ="pikachu";

> fetch("https://coopdgii.com/coopvirtual/App/${pokemon}")

Se agrega a la url de la api , el valor de la constante pokemon.

## Check Reponse

Con esto se puede chequear la respuesta de la api o json.

```javascript
fetch(url)
  .then((res) => {
    if (res.ok) {
      console.log("Exito");
    } else {
      console.log("Fail");
    }
  })
  //Revisa si la promesa tuvo exito
  .then((data) => console.log(data))
  //se puede usar lo datos
  .catch((error) => console.log(error));
// muestra el error en consola
```

## setTimeout

Es una funcion nativa que recibe una funcion y un tiempo (ms) milisegundos para ejecutarla.

```javascript
setTimeOut(() => {
  getdata();
  //Funcion que va ejecutar
}, 2000 /*Tiempo en que lo va hacer*/);
```

# Async / Await (Modern Javascript)

Esto crea una funcion asincrona (async) y espera (await) la respuesta.

```javascript
async function getdata() {
  const result = await fetch("url");
  const datos = await result.json();
  //Esto es un ejemplo con una api pero se puede hacer hasta con funciones y diferentes cosas.
  // const getData=async()=>{}
}
```

# Form-data

```javascript
/*Proximamente.....*/
```
