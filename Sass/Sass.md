# Sass

## Instalacion de Sass en VSCODE

Se debe Instalar Live Sass Compiler y unas cuantas configuraciones en el JSON de VSCODE.

> Video de Instalacion https://www.youtube.com/watch?v=cpbN0YAW44g&t=449s

- Sass Partial

Con Sass se puede dividir en varias archivos los estilos

```scss
//_layout.scss
*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.header {
  width: 90%;
  max-width: 1000px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 2px solid rgb(100, 21, 21);
  text-align: center;
}
```

```scss
//_Typography.scss
.header__tittle {
  font-size: 3rem;
  font-family: "Segoe UI", Tahoma, Geneva, sans-serif;
  font-weight: 700;
  color: rgb(228, 17, 17);
}
```

```scss
//_index.scss
@forward "layout";
@forward "Typography";
//Con esto carga los estilos automaticamente
```

```scss
//styles.scss
@forward "carpeta"; //carpeta es la carpeta donde estan los estilo
//Aqui busca el _index.scss y lo complia a css
```

## Notas

> Es buena pratica nombrar a los arhivos de Sass \_layout.scss

> Tambien se puede gracias a Sass Parcial dividir los estilos y variables para ordenar mejor los estilos

> Al usar los estilos con el html es el mismo metodo link:css y el nombre del archivo Sass principal

- Sass Comments

```scss
// Este comentario es en linea y no saldra en el compilado del css
/*Este comentario es multilinea y si saldra en el compilado del css*/
```

- Sass Variables

```scss
//_layout.scss
$color: #000;
//Es una variable de tipo Global en el documento creada
```

```_variable.scss
$black-color: #000;
$white-color: #fff;
```

```scss
@use "variable"; //Ruta del archivo
//@use 'variable' as x (Dandole un sobrenombre a variable)
//@use 'variable' as *; (Usando solo el nombre de las variables)

.header {
  /*
  background-color:x.$black-color;
  Utilizando el sobrenombre

  background-color:$black-color;
  Solo utilizando el nombre de la variable
  */
  background-color: variable.$black-color;
  //Utilizando la variable
}
```

## Notas:

> Cuando se crea la variable se le pone $

> Al utilizar use se debe dar el nombre del archivo seguido . y despues nombre de la variable

> Es recomendable mejor usar sobrenombres o el mismo nombre del archivo

> Buen uso de ellos al usar breakpoints.

- Sass Map

```scss
// Es como un array de objecto pero en vez de esto [] es esto ().

/*_variable.scss*/
$color: (
  //"clave":valor
  "red": red,
  "blue": blue
);
```

```scss
//_typography.scss
@use "variable";

.header__title {
  color: map-get(variable.$color, red);
  //Primero es el array y despues la clave del valor
}
```

- Sass Nesting

```html
<div class="container">
  <p class="container__text">Hello World</p>
  <div />
</div>
```

```scss
.container {
  background-color: red;

  p {
    color: blue;
  }
  //De esta forma le dara estilos a todos los p de container
  .main__text {
    color: green;
  }
  //De esta forma le dara estilos a la clase main__text que esta dentro de container
  &__text {
    color: #000;

    &:hover {
      font-size: 3rem;
    }
    //esto el mismo .container__text
  }
  //& es igual al nombre del padre (.container) seria .container__text
  #{&}__text {
    color: #fff;
  }
  //Lo que hace esto es que seleciona tanto container como container__text y le da estilos
}
```

## Notas:

> Es una buena forma pero aun asi tener cuidado

> #{&}\_\_clase los estilos se les aplicara tanto al contenedor como al contenido

- Sass @import

```scss
//_resets.scss
*,
*::before,
*::after:{
  padding:0,
  margin:0,
  box-sizing:border-box;
}
```

```scss
//_layout.scss
@import "resets";
//@import 'ruta del archivo',"ruta del arhivo"; se puede mas de uno, igual con el use

$red: red;

.header {
  background: $red;
}

/*Con esto hace que los estilos importados esten de primero y luego los estilos de la pagina*/
```

## Notas:

> Lo estilos importados estan de primero y despues los de la pagina de estilos

- Sass Function

```scss
//__variable.scss

$font-weight: (
  "regular": 500,
  "medium": 600,
);

@function weight($font) {
  @return map-get($font-weight, $font);
}
//Aqui se crea la funcion nombrada que toma un parametro y retorna un map el cual devuelve un font
```

```scss
@use "variable";

.header{
  color:blue,
  font-weight:weight(regular);
  //Utilizando la funcion y dandole su parametro
}
```

## Notas:

> Si no tiene parametro dara un error

> Tambien si cambias el css manualmente , al guardar el css con sass este se actualizara como estaba antes

> Al utilizar parametros se le debe poner $nombre-variable

> En las funciones no se puede poner estilos

- Sass Mixin

```scss
//Esto se usa para no repetir estilos tantas veces

/*
Es decir

.container{
  display:flex;
  align-items:center;
  justify-content:center;
}

.main{
  display:flex;
  align-items:center;
  justify-content:center;
}
*/

//Con mixim

@mixin flexCenter($direction) {
  display: flex;
  flex-direction: $direction;
  align-items: center;
  justify-content: center;
}

.container {
  @include flexCenter(row);
}

.main {
  @include flexCenter(column);
}
// Con esto el codigo de mixin esta en los dos contenedores
// Tambien se le puede poner parametros
```

- Sass Mixin (Example 2)

```scss
//_Layout.scss

@mixin color($color: true) {
  @if $color {
    color: blue;
  }
}

.header {
  @include color(); //Viene por defecto que color es true
}

//Aqui color es true y si es true el codigo dentro del mixin existira dentro del header y si no pues lo contrario.
```

- Sass Mixin (Example 3)

```scss
@use "variable";

@mixin tablet {
  @media (min-width: $variable.$tablet) {
    @content;
  }
}

.header {
  @include tablet {
    //content
    background-color: red;
  }
}

// Con esto activara el contenido cuando se active el media querie
```

## Notas:

> Al utilizar parametros se le debe poner $nombre-variable

> Sin el parametro dara error

> Los mixin se parecen a las funciones pero las funciones se usan para hacer operaciones o retornos y los mixin para no duplicar tanto codigo.

## Diferencias entre mixin y function

> Las funciones son útiles específicamente porque devuelven valores. Los mixins no se parecen en nada a las funciones; por lo general, solo proporcionan valiosos bloques de código.

- Sass Herencia

```scss
.header {
  &__text {
    font-size: 3rem;
    color: blue;
  }
  &__title {
    @extend .main__text;
    //Con esto hereda las propiedades de .main__text;
    font-size: 5rem;
    //Sobre-escribiendo las propiedades
  }
}
```

- Sass Operations

```scss
//_layout.scss

/*
En el css tradicional
.header{
  width:calc(80%-400px);
}
*/
//Sass
.header {
  width: 80%-40%;
}
```

## Notas:

> Esto solo tiene una desventaja deben de ser del mismo tipo , no puede ser diferente.
