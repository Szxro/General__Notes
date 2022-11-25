# CSS

- Vincular html con css

```html
<link rel="stylesheet" type="text/css" href="ruta" />
```

- Esqueleto de css

```
selector(propiedad){
    propiedad:valor;
}
```

- Selectores

```css
/*Selector universal*/
* {
  proiedad: valor;
}
/*Selector de tipo*/
h1 {
  propiedad: valor;
}
/*Selector de tipo de clase*/
.clase {
  propiedad: valor;
}

/*<p class="clase">Hola mundo</p>*/

/*Selector de tipo ID*/
#element {
  propiedad: valor;
}
/*<h1 id="element">Hola mundo</h1>*/

/*Selector por atributo*/
[type="text"] {
  propiedad: valor;
}
/*<input type="text">*/

/*Selector de clase por elementos dentro de esta*/
.element > div {
  /*Aplicara los estilos a los divs de la clase element*/
  propiedad: valor;
}

/*Selector descendiente*/
h2/*contenedor*/ p/*contenido*/ {
  propiedad: valor;
}
/*<h2><p>Hola mundo</p></h2>*/

/*Selector pseudo clase*/
p:hover: {
  propiedad: valor;
}

/*Selecto de mas de una clase*/
.caja1, .caja2: {
  propiedad: valor;
}
```

## Nivel de jerarquia !important

```css
/*Primera linea*/
!important
Estilos en linea
Identificadores (ID)
/*Segunda linea*/
Clases
Pseudo-clases
Atributos
/*Tercera linea*/
Elementos
Pseudo-elementos
```

- Uso de important

```css
h1{
    propiedad: valor; !important
}
```

## Propiedades del texto

```css
h1 {
  font-size: 30px; /*Tamano de la letra*/
  color: "#fff"; /*color de la letra*/
  font-family: Georgia; /*Tipo de letra*/
  font-weight: "bold"; /*Grozor de la letra*/
  line-height: 2px; /*Espaciado de las letras*/
  text-align: center; /*Como se alineara el texto*/
  text-decoration: none; /*Decoracion del texto*/
  /*
  Valores:
  overline
  line-through
  underline
  underline overline
  */
  white-space: nowrap;
  /*
  Determina cómo se maneja el espacio en blanco dentro de un elemento. 

  white-space: normal;
  white-space: pre;
  white-space: pre-wrap;
  white-space: pre-line;
  */
}
```

> Por defecto el navegador pone 16px
> Por defectos las imagenes son elementos inline
> Tambien es mejor poner una propiedad width o heigth a un imagen para que este no se estreche , ponga por defecto la otra propiedad.

# Backgrounds

```css
body {
  width: 100%;
  /*100% del ancho de la imagen*/
  height: 100vh;
  /*100% del Largo del viewport*/
  background-image: url("url-imagen");
  /*Fondo de pantalla de la imagen*/
  background-size: auto;
  /*
  Valores
  cover:rellena la pantalla con la imagen
  contain: contiene la imagen
  */
  background-position: center;
  /*Posicion en lugares x la imagen*/
  background-repeat: non-repeat;
  /*Si la imagen se va a repetir*/
  background-attachment: fixed;
  /*Determina si la posición de la imagen de fondo será fija dentro de la pantalla o se desplazará con su bloque contenedor.*/
  /*
  Valores
  scroll:la imagen de fondo se movera dentro de la pantalla junto al bloque que la contiene.
  fixed: la imagen estara fija en la pantalla y no se movera con el bloque contenedor.
  */
}
```

> Usando este metodo para poner una imagen de fondo , se debe poner un heigth y un width para evitar que se repitan.

## Medidas relativas y absolutas

**Medidas absolutas**

El tamaño se expresa en la unidad de medidad sin hacer referencia a otro elemento.

**Medidas:**

- cm
- mm
- in (inches) (96px or 2.54 cm)
- px (1/96 in)
- pt (1/72 de 1in)
- p (12pt)

**Mas usada**

- px (pixeles)

Se usa donde el tamano necesita ser el mismo.

- Ancho/Alto de contenedores
- Bordes
- Tamano de letra

**Medidas relativas**

El tamano es relativo a otro elemento (contenedor (divs),elemento raiz....).

**Medidas**

- % (relativo al elemento padre) (used for widths)
- em (relativo al tamano de letra del elemento padre)
- rem (relativo al tamano de letra del elemento raiz(html))
- fr (1 fraccion del espacio disponible en el grid)
- vw(1% del ancho de la pantalla)
- vh (1% del alto de la pantalla)

> Esto se usa para maquetaciones (responsive) y (layouts)

**Medidas mas usadas(responsive)**

- %
  Relativo al elemento padre puede ser el viewport o hasta el contenedor.

**Usos**

1. width
2. height (No es muy usado por que las cosas se complican)

> un width de 90% se ve mejor en un contenedor.

- em

Relativo al tamano de la letra del elemento contenedor.

**Usos**

1. margenes

2. padding

- rem

Relativo al font-size del elemento raiz(html)

**Usos**

1. Modulos principales (rem) (contenedores)

2. Contenido del modulo o contenedor

3. font-size

> Se usa el rem para el font size para que al usar el em este sea proporcional al tamano de la letra, y asi se coerrente al usar padding,margin,etc...

> Font-size si no se declara en nigun lado , lo obtendra del body es decir 16px que es lo que viene por default.

**Vh and VW**

- vh (viewheigth)
  3vh va a ser 3% del viewportheigth

- vw (viewwidth)
  3vw va a ser 3% del viewportwidth

- vmin (viewport minimun)
  70vmin va a ser 70% de viewports smaller dimension (heigth or width)

- vmax (viewport maximun)
  100vmax va a ser 100% de viewport biggest dimension (heigth o width)

**max-width and min-width**
Esto se usa para que un contenedor deje de crecer, cuando solo se usa la propiedad width con porcentaje este va a crecer hasta tener todo el ancho requerido.

```css
.container {
  width: 90%;
  max-width: 620px;
  /*Tendra el 90% del contenedor padre(vp o contenedor padre , pero se detendra de crecer a los 620px)*/
  min-width: 500px;
  /*Tendra un width de 90% , dejara de crecer a los 620px , pero tambien tendra un width minimo de 500px y lo que hara sera dejar de encojerse y se quedara estatica cuando llegue a 500px*/
}
```

## Exportar tipografia

Elegir el font de google fonts , buscar la parte de import y ponerla encima de la hoja de estilos.

**Utilizarlo**

```css
h1 {
  font-family: "font", sans-serif; /*viene por defecto */
  /*Otras que vienen
    - cursive
    */
}
```

## Normalice

Se puede buscar el archivo por internet y linkearlo con el html y usar otra hoja de estilos para los estilos.

### Forma alternativa

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
```

Esto se usa para resetear los estilos que vienen por defecto en el navegador.

## Teoria de cajas

Habran elementos que ocupen todo el espacio en forma de linea recta y otros elementos que ocuparan solo su contenido en forma de linea recta.

**Ejemplo**

h2 es un elemento o caja que ocupa todo el espacio en forma de linea recta

b es un elemento que solo ocupa su contenido en linea recta

## Como se puede cambiar la naturaleza de esto?

### Display

```css
h2 {
  display: inline; /*Esta de forma de linea*/
  display: block; /*Ocupa todo en linea recta como antes*/
  display: inline-block; /*Combina los dos valores inline y block*/
}
```

> A los elementos inline no se le puede dar heigth o width

## Propiedades de cajas

```css
.contact {
  background-color: "color"; /*Color de fondo*/
  width: 50px; /*Ancho*/
  height: 50px; /*Alto*/
  opacity: 0.4; /*Opacidad de la caja y sus elementos*/
  /*Esto va desde 0.1 hasta 1*/
}
```

### Padding

Es el espacio entre sus bordes y el contenido.

```css
.contact {
  padding-left: 4px; /*Izquierda*/
  padding-right: 4px; /*Derecha*/
  padding-top: 4px; /*Arriba*/
  padding-bottom: 4px; /*Abajo*/
  /*
  Top y botttom = Eje y
  Right y Left = Eje X
  */
}
```

> Si se usa solo padding esta como las otras 4.

```css
.contact: {
  padding: 40px;
  padding: 1px 2px 3px 4px;
  /*top,rigth,bottom,left*/
  padding: 1px 2px 3px;
  /*Sin el valor de left el valor sera el mismo right es decir 2px*/
}
```

## Box Sizing

Es el comportamiento css por defecto para el tamano de las cajas.

```css
h1: {
  box-sizing: border-box;
  /*Le dice al navegador que forma debe de tomar en cuenta para cualquier valor que se especifique de borde o relleno para el ancho o el alto de un elemento*/
}
```

# Margin

Es la distancia entre los elementos.

**Existen:**

```css
h1: {
  margin-top: 4px;
  margin-left: 5px;
  margin-top: 6px;
  margin-bottom: 7px;
  /*Este actua como todas las anteriores*/
  margin: 1px 2px 3px 4px;
  /*Top,Right,Bottom,Left*/
  margin: 50px auto;
  /*Centra el elemento*/
  margin: auto;
  /*Hace mismo efecto pero sin los 50px*/
  /*
  Top y botttom = Eje y
  Right y Left = Eje X
  */
}
```

> Si es solo un valor en margin actua como un valor en todos los lados.

## Propiedad Border

```css
.element: {
  border: 10px solid grey;
  /*Tamaño, estilo y color*/
  /*
  Existen
  border-bottom
  border-top
  etc...
  */

  /*Existen otros estilos:
  - dashed
  - outset
  - groove
  - inset 
  - solid (es el mas usado)
  */
}
```

- Si queremos rendondear el border de un elemento

```css
.element: {
  /*border-radius: top-left / top-right / bottom-right / bottom-left*/
  border-radius: 50%;
  /*Rendondea todo el elemento*/
}
```

# Estilos para listas

```css
nav ul {
  list-style-type: none; /*Usado para Navs*/
  /*
  Estilos
  none
  circle
  square
  upper-roman
  lower-alpha
  */
}
```

# Resetear estilos para Botones

```css
.button {
  appearance: none;
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
}
```

# Box model

Es la jerarquia de las cajas

**Jerarquia:**

1. Contenido
2. Padding
3. Border
4. Margin

## Box-Shadow

Permite dar sombra a la caja

```css
.element: {
  box-shadow: 2px 4px 15px 0 red;
  /*eje x, eje y, desenfoque, borde, color*/
}
```

## Text-Shadow

Permite dar sombra al texto

```css
p: {
  text-shadow: 2px 4px 15px red;
  /*eje x, eje y, desenfoque, borde, color*/
}
```

> Se puede duplicar el efect solo poniendo las mismas propiedad nuevamente.

## Transform

Es la transformacion del elemento x

```css
.element: {
  transform: rotate(45deg); /*Rota el elemento a x grados*/
  transform: scale(2); /*Agranda o achica el elemento por x numero*/
}
```

## Outline

Es como el border, pero en vez de ocupar espacio como el border , no ocupa. Este viene por defecto en los inputs.

```css
.element: {
  outline: 10px solid blue;
  /*Tamano,tipo y color*/
}
```

> Se pueden usar como guia al tener muchas cajas de color x

> No suma tamaño a la caja y no hay movimiento o desplazamiento de los elementos

# Position !important

Estos sirven para posicionar elementos en x posiciones

- position:fixed;

Con esta propiedad el objecto se queda fijo en la pantalla. no importa si tiene mas elementos en la pantalla este se quedara fijo.

**Propiedades:**

Tiene Top,Left,Right y Bottom

- position:relative;

Este sirve para posicionar un elemento en un determinado lugar, tambien conserva sus dimensiones y conserva su posicion inicial.

**Propiedades:**

Tiene Top,Left,Right y Bottom

-position:absolute; !important

Este sirve para posicionar un elemento de forma absoluta, si quieres posicionar un elemento en un elemento padre, se debe de poner al elemenento hijo dentro del padre y al hijo darle absolute y al padre relative;

El elemento pierde sus dimensiones y su posicion inicial.

**Propiedades:**

Tiene Top,Left,Right y Bottom

-position:absolute; !important

**Ejemplo de esto:**

```css
.div_padre: {
  width: 100%;
  height: 100vh;
  position: relative;
}

.div_hijo: {
  position: absolute;
  top: 0;
  left: 0;
}
```

> Con esto el div_hijo se posiciona dentro del div_padre.

> En el dom con cada caja se tiene un espacio reservado, pero con position absolute ya no esta reservado por eso la caja x se sobrepone.

- position:sticky;

Es una propiedad que mezcla fixed y relative.

cuando el elemento con position:sticky, tiene top:0, es que hace que esta en relative, despues el elemento tiene un top:0 se convierte en fixed position.

Con las propiedades no mueven al elemento sino lo toman como punto de referencia.

Tambien tiene que tener como referencia el body , pero si tiene referencia del padre este tiene que tener dimensiones , pero cuando ya sus dimensiones no se ven en el viewport pues ya no se vera.

**Propiedades:**

Tiene Top,Left,Right y Bottom

-position:absolute; !important

## Nota:

> Se le pueden dar numeros negativos a las propiedades

> Top y left son las que el navegador les da mas importancia

> Bottom y Right no le da mucha importancia , hace el efecto si no esta el top y left.

## Comportamiento de las propiedades:

```css
/*Cuando utilizas las propiedades como top ,bottom,right o left este tiene un comportamiento similiar*/

.container {
  position: relative;
  top: 50px;
  right: 50px;
}

/*El top se alejara de margen top de la caja, y igual con el right se alejara del margen right de la caja*/

/*Lo mismo con el bottom si le das numeros positivos se alejara del margen bottom y lo mismo con el left*/

/*Si se utiliza numeros negativos no se alejara*/
```

# z-index

Con esta propiedad caja x se puede sobreponer a otras cajas.

```css
.element: {
  z-index: 1;
  /*Se le puede poner tanto valores positivos como negativos*/
  /*Tambien su valor por defecto es auto*/
  /*Tiene diferentes valores*/
  /*Mas informacion*/
  /*https://developer.mozilla.org/es/docs/Web/CSS/z-index*/
}
```

# Overflow

Si el contenido sobrepasa de la caja da la posibilidad de dar scroll.

Controla lo que sucede con el contenido que es demasiado grande para caber en un area (caja).

```css
.element: {
  overflow: auto;
  overflow: scroll;
  /*Pone la barrita de scroll de manera obligatoria*/
  overflow-x: scroll;
  /*Pone la barrita en eje x de manera obligatoria*/
  overflow-y: scroll;
  /*Pone la barrita en eje y de manera obligatoria*/
  overflow-y: hidden;
  /*Si se quiere quitar la barrita en x eje*/
}
```

# Float

Es una propiedad usada para el posicionamiento y formato de contenido.

Tiene un uso de poner la imagen en x posicion con el texto

```css
p: {
  float: left;
  /*Otras propiedades:
  - rigth
  - none (default)
  - inherit
  */
}
```

> Para hacer esto primero va la imagen y despues el texto en el contenedor.

> Se le da propiedad a la imagen para que esta se mueva en x direccion.

# Pseudo-Elementos

```css
/*Los pseudo-elementos se añaden a los selectores, pero en cambio, no describen un estado especial sino que, permiten añadir estilos a una parte concreta del documento.*/

/*::after*/
/*En CSS, ::after crea un pseudo-elemento que es el último hijo del elemento seleccionado. Es comunmente usado para añadir contenido cosmético a un elemento con la propiedad content.Es en linea (inline) de forma predeterminada.*/

.dialogo::after {
  content: ""; /*Crea un elemento vacio se le puede anadir un texto o icono para agregarlo despues del elemento que esta en el dialogo.*/
  display: block; /*Crea un cuadro el cual se le puede dar la forma que prefieras para asi añadir contenido estetico*/

  /*Se le pueeden añadir atributos al content*/
  /*
  content:url('url imagen'); con esto se le puede anadir imagenes
  content:open-quote; con esto abre comillas (")
  content:close-quote; con esto cierra comillas (")
  */
}

/*::selection*/
/*Esto hace que el texto seleccionado de un contenedor cambie de color , ect....*/

/*Propiedades aceptadas de selection*/
/*color,background,background-color,text-shadow*/

.dialogo::selection {
  background-color: #5555;
}
/*Cambie el color de fondo cuando se selecciona algo del contenedor dialogo.*/

/*::before*/
/*Es lo mismo que after , pero añade el elemento esetico antes*/
.dialogo::before {
  content: "<>";
  /*Anade ese contenido antes de lo pedido*/
}

/*::placeholder*/
/*Se le puede dar estilos al texto del placeholder del input*/

.input::placeholder {
  color: red;
  font-size: 20px;
}
/*::marker*/
/*Con esta pseudoelemento puedes cambiar el color de las listas o hasta el icono*/
::marker {
  color: red;
  /*Con esto busca las listas que hay en el documento html y las cambia a rojo*/
  font-size: 0.5em; /*Se le puede cambiar*/
  font-weight: 900; /*Se puede usar esta propiedad en ellos*/
  content: ""; /*Es un pseudoelemento tiene propiedad*/

  transition: color 1s;
}

li:hover::marker {
  color: blue;
  /*Con esto se esta haciendo que cuando pase el cursor por la li el marker cambiara de color*/
}

/*Usando Font-Awesome con css*/
::marker {
  color:/*color*/ ;
  font-size:/*Tamano del elemento*/ ;
  content: "\f00c"; /*Unicode del elemento*/
  font-family: "Font Awesome 5 Free";
  font-weight: 700;
}
```

> Mas informacion https://developer.mozilla.org/es/docs/Web/CSS/Pseudo-elements

> los mas usados son after y before

## Ejemplos con atributos

```html
<p>
  Here we have some
  <span tabindex="0" data-descr="collection of words and punctuation"
    >text</span
  >
  with a few
  <span tabindex="0" data-descr="small popups that appear when hovering"
    >tooltips</span
  >.
</p>
<!--Atributos (data-descr)-->
<!--Esto crea un tipo popout notification cuando crusas el cursor por los span-->
```

```css
span[data-descr] {
  position: relative;
  text-decoration: underline;
  color: #00f;
  cursor: help;
}

span[data-descr]:hover::after, /*anadiendo otra pseudo-elemeto/clase*/
span[data-descr]:focus::after {
  content: attr(data-descr);
  position: absolute;
  left: 0;
  top: 24px;
  min-width: 200px;
  border: 1px #aaaaaa solid;
  border-radius: 10px;
  background-color: #ffffcc;
  padding: 12px;
  color: #000000;
  font-size: 14px;
  z-index: 1;
}
```

> before y after no funciona en imagenes

> Video Explicativo por Kevin Powell de estos atributos https://www.youtube.com/watch?v=zGiirUiWslI&t

# Pseudo-Clases de Seleccion

```css
/*Las Pseudo-clases son estados que pueden tener nuestra pagina*/

/*:active*/
/*Representa un elemento (como un botón) que el usuario está activando.*/
.enlace:active {
  color: red; /*El enlace activo es de color rojo*/
  background-color: blue; /*Cuando el usuario lo pulsa cambia a ese color*/
}

/*:link/
/*Cambia el estado del enlace al cual no se ha entrado*/
.enlace:link {
  color: blue; /*Pone de color azul el enlace no visitado*/
  background-color: red; /*El fondo del enlace sera rojo*/
}

/*:visited*/
/*Da estilos a los enlances visitados*/
.enlace:visited {
  color: red; /*Pone el color asignado al enlace visitado*/
  background-color: blue; /*El fondo del enlace visitado*/
}

/*:hover !important*/
/*Coincide cuando el usuario interactúa con un elemento con un dispositivo señalador*/
.enlace:hover {
  background-color: yellow;
  cursor: pointer;
  /*Cuando pasa el cursor por el enalce cambiara de color el fondo del enlace y el cursor cambiara*/

  /*Nota*/
  /*Se le puede dar muchos estilos a los botones ,divs,enlaces etc...*/
}

/*Acceder al primer o ultimo elemento de un div */
/*:first-child / :last-child*/

.elemento p:first-child/*:last-child*/ {
  color: blue;
  background: white;
  /*Con esto se puede estilizar los elementos primarios o ultimos de un contenedor , puede ser un p , li etc...*/

  /*Es lo mismo con last-child pero este toma el ultimo elemento del padre*/
}

/*Selecciona el primer elemento del tipo seleccionado*/
/*:first-of-type / :last-of-type*/
.elemento p:first-of-type/*last-of-type*/ {
  color: blue;
  font-size: 30px;
  /*Esto selecciona el primer elemento del tipo seleccionado en este ejemplo fue p pero se puede seleccionar otros*/

  /*Es lo mismo con last-of-type pero selecciona el ultimo elemento*/
}
/*:nth-child() (Es una funcion)*/
/*Coincide con uno o más elementos en función de su posición entre un grupo de hermanos.*/
.elemento :nth-child(2)/*(n)*/ {
  /*Estilos.....*/
  /*Estiliza al elemento en la posicion n,en este ejemplo es el segundo elemento.*/

  /*Tambien se le puede dar "odd" para que seleccione los elementos impares,even para los elementos pares*/

  /*Ademas se le puede poner que a cada x elementos los estilice , ejemplo con"3n", estiliza cada tres elementos*/
}

/*:nth-last-child()*/
/*Selecciona uno o más elementos en función de su posición entre un grupo de hermanos, contando desde el final.*/
.elemento :nth-last-child(4)/*(n)*/ {
  /*Estilos....*/
  /*Se puede usar lo mismo que nth-child*/
}

/*:nth-of-type()*/
/*Selecciona uno o más elementos de un tipo dado, en función de su posición entre un grupo de hermanos.*/
.lista li :nth-of-type(2)/*(n)*/ {
  /*Estilos...*/
  /*Se puede usar lo mismo que nth-child , esto es por que es una liga entre este y :first-of-type*/
}
/*nth-last-of-type()*/
/*coincide con uno o más elementos de un tipo dado, en función de su posición entre un grupo de hermanos, contando desde el final.*/
.lista li:nth-last-of-type(3)/*(n)*/ {
  /*Estilos....*/
  /*Se puede usar lo mismo que nth-last-child , esto es por que es una liga entre este y :last-of-type*/
}

/*:only-child*/
/*Representa un elemento sin hermanos, solo le dara estilos a un unico elemento si se encuentra otro elemento (hermano) no tendra estilos */
.elemento p:only-child {
  /*Estilos....*/
}

/*:only-of-type()*/
/*Este aplicara estilos a solo un elemento de un tipo en especifico, si hay otros elementos del mismo tipo no tendra estilos*/
.elemento div:only-of-type {
  /*Estilos....*/
}
```

> Es una buena practica utiliza la pseudo clase focus con hover

```css
/*Ejemplo*/
.button:hover,
.button:focus {
  /*Styles*/
}
```

# Pseudo-Clases para formularios

```css
/*:focus*/
/*Cuando el usuario le hace focus o le hace click en el input este cambiara de estado*/
.form .nombre:focus {
  border: 2px solid red;
}
/*:disabled*/
/*Permite acceder a los elementos con el atributo disabled*/
.form .disabled:disabled {
  /*Estilos...*/
}
/*:valid / :invalid*/
/*Permite darle estilos a los elementos si son validos o invalidos (la validacion es mejor hacerlo con js o con un lenguaje del lado del servidor)*/
.form .email:valid/*:invalid*/: {
  /*Estilos....*/
}

/*:required*/
/*Permite darle estilos a los elemento si tiene el atributo required*/
.form .email:required {
  /*Estilos...*/
}

/*:checked*/
/*Permite dar estilos a los elementos el cual tenga el atributo checked o se le dio este atributo (radiobuttons/checkboxes)*/
.form .check:checked {
  /*Estilos...*/
}

/*:default*/
/*Representa cualquier elemento de formulario que sea el predeterminado entre un grupo de elementos relacionados.(readiobuttos/checkboxes)*/
.form .radio:default {
  box-shadow: 0 0 2px 1px coral;
}

/*:in-range*/
/*Representa un elemento <input> cuyo valor actual se encuentra dentro de los límites de rango especificados por los atributos min y max.*/
input:in-range {
  background-color: rgba(0, 255, 0, 0.25);
}

/*:out-of-range*/
/*Representa un elemento <input> cuyo valor actual está fuera de los límites de rango especificados por los atributos min y max.*/
input:out-of-range {
  background-color: rgba(255, 0, 0, 0.25);
}
```

> Mas informacion https://developer.mozilla.org/es/docs/Web/CSS/Pseudo-classes

# Object Position y Object-fit

```css
/*Object-fit*/
/*Indica cómo el contenido de un elemento reemplazado, por ejemplo un <img> o <video>, debería redimensionarse para ajustarse a su contenedor.*/
.img {
  object-fit: fill;
  /*Modifica el tamaño del elemento remplazado para llenar el cuadro de contenido. */
  object-fit: contain;
  /*aumenta o disminuye el tamano de la imagen vertical o horizontalmente para llenar el cuadrado conservando su relacion de aspecto*/

  object-fit: cover;
  /*El contenido reemplazado se dimensiona para mantener su relación de aspecto (calidad) mientras llena el cuadro de contenido completo del elemento.Mayormente cortara la imagen*/
  object-fit: none;
  /*El contenido no se redimensiona*/
  object-fit: scale-down;
  /*La imagen comparara el tamano entre el valor none y el contain y mostrara el que tenga valor mas pequeno*/

  /*Los valores que mas se usan son contain y cover*/
}
/*Object Position*/
/*La propiedad object-position determina el alineamiento del elemento dentro de la caja.*/
/*object-position admite top,center,bottom,left,right px %*/
/*left y rigth eje x*/
/*top y bottom eje y*/
/*center funciona tanto para el eje x como el eje y*/

.img {
  object-position: right /*top,left,etc..*/;
  /*Muestra la parte derecha de la imagen y asi con las demas valores*/

  /*Se le puede anadir otros valores*/

  /*Con cover solo se puede mover en el eje x */

  /*Con el none se puede mover en los cuatro puntos*/
}

/*Hover usando object fit y position*/
/*Esto fue hecho con la metodologia Bem*/

.elemento {
  display: flex;
  justify-content: space-around;
}

.elemento_img {
  width: 250px;
  height: 450px;
  border: 1px solid red;
}

.elemento__img--cover: {
  object-fit: cover;
  object-position: left;
  transition: object-position 0.3s;
}

.elemento__img--cover:hover: {
  object-position: center;
}

/*Se presentara primero en la parte izquierda la imagen pero cuando se le pase el mouse esta hara una animacion donde se va al centro*/
```

> Mas informacion https://developer.mozilla.org/es/docs/Web/CSS/object-position

> Mas informacion https://developer.mozilla.org/es/docs/Web/CSS/object-fit

# Metodologia Bem

```css
/*
Significado de BEM:
BLOCK
ELEMENT
MODIFIER

- Block
Es una entidad independiente, no necesita de nadie mas para existir.(Header,Nav,Form,Footer,Contenedor(Divs),etc...).

- Como se nombra a los bloques?
A los bloques se les nombre con la funcionalidad del bloque.
Ejemplos:
<nav class="nav"></nav>
<section class="container"></section>
<header class="header"></header>

- Elemento
Un elemento en Bem, depende directamente de un bloque , por lo que este debe estar dentro de un bloque.(es depediente a un  bloque y esta ligado a el.).

- Como se nombre a los elementos?
A los elementos se les nombra con el nombre de us bloque contenedor , dos guiones bajos y la descripcion del elemento.
Ejemplo:
<form class="form">
<input type="text" class="form__input">
<input type="submit" class="form__send">
</form>

<nav class="nav">
<a href="#" class="nav__item">Inicio</a>
</nav>

- Moficador
Puede ser un bloque o un elemento , estos indican una modificacion a dicho elemento o bloque.

- Como se le nombra a los modificadores?
A los modificacdores se les nombra con el nombre que tenian anteriormente (bloque o elemento) se le agrega dos guiones medios y la descripcion de la modificacion.

<nav class="nav">
<a href="#" class="nav__link">Incio</a>
<a href="#" class="nav__link nav__link--disabled">Final</a>
</nav>
*/
```

> Cada elemento necesita una clase
> Se pueden poner mas de un modificador

## Que no hacer usando la metodogia BEM?

```html
<main class="container">
  <div class="card">
    <img src="ruta" alt="Logo" />
    <!--class="car__img"-->
  </div>
  <div class="card__texts">
    <p class="card__parragraph">Hello World</p>
  </div>
</main>
```

> Ejemplo de como usar BEM correctamente, esta ubicado en la carpeta practices.

```css
.container{
  width:90%;
  max-width:1200px;
  margin 0 auto;
}

.card img{
 /*Como regla basica del bem a cada elemento se le debe
 dar un clase , no acceder por su contenedor*/
}

.card__img{
  /*Forma correcta*/
}

```

# Variables de css

Con esto se puede cambiar el color o x valor a un elemento, esto es considerado buena practica por que asi no debe ir uno a uno a cambiar colores o fonts.

```css
/*Es una pseudoclase*/
:root {
  /*Con esto es tipo global*/
  --red-color: red;
  /*Variable creada con el color red*/
}

.penguin: {
  --red-color: blue;
  /*Se le cambio el color a la variable*/
  background-color: var(--red-color, white);
  /*Uso de variable y color por si acaso falla*/
}
```

> Esto se puede crear de manera local.

## Ejemplo em and rem

```html
<div class="container">
  <section class="container__section">
    <p>Hello World</p>
  </section>
</div>
```

```css
/*Ejemplo 1*/
.container {
  font-size: 18px;
}

.container__section {
  font-size: 1.5em;
}

/*Si el contenedor padre no tiene font-size, este buscara hasta allar un font-size, como el container tiene font-size este lo tendra de referencia , y sera 1.5*18=27px o este sera 150% de 18px*/

/*Ejemplo 2*/
.container {
  font-size: 18px;
}

.container__section {
  font-size: 20px;
}

.container__section p {
  font-size: 1.5em;
}

/*Ahora tendra como referencia el font-size de su contenedor padre que es container__section*/
```

**!important**

> Las unidades em son muy convenientes para algunas cosas pero al usar font-size en los contenedores padres este puede tornase en un efecto cascada que puede poner mas grande cosas alli y alla.

**La solucion: Rems**
La unida Rem es un abreviado de **Root Em**, esto significa que siempre es relativo a nuestro documento es decir a su font-size.

```html
<div class="container">
  <section class="container__section">
    <p>Hello World</p>
  </section>
</div>
```

```css
.container {
  font-size: 18px;
}

.container__section {
  font-size: 20px;
}

.container__section p {
  font-size: 1.5rem;
}

/*Aunque el font-size de los diferentes contenedores este puesto este solo sera relativo al font-size que viene por defecto en el documento html.*/

/*
se le puede cambiar pero no es muy recomendable
html{
  font-size:20px;(16px default)
}
*/
```

> This is use for nice scaling.

**Como decidir que unidad usar?**

- En cuanto a los pixeles son unidades absolutas no cambian, este se puede cuando en el diseno alla un elemento que no cambie que sea estatico.

- En cuanto a los rem , em y %
- Font-size: rem
- Padding y Margin : em
- Widths: em o %

# calc()

Puede realizar cálculos para determinar valores de propiedades CSS. Utiliza cualquier medida puede ser relativa o absoluta , tambien puede utilizar variables.

Esta puede utilizar:

1. Suma
2. Resta
3. Multiplicacion
4. Division

Ejemplo:

```html
<div class="container"></div>
```

```css
.container {
  --width-size: 100px;

  width: calc(100px + 200px);
  /*Resultado 300px de ancho*/
  width: calc(400px - calc(100px + 200px));
  /*Tambien se pueden poner una dentro de la otra*/
  width: calc(100% - 30px);
  /*Medidas relativas - absolutas*/

  width: calc(var(--width-size) * 2);
  /*Utilizando la variables y multiplicandola x 2*/
}
```

# min() & max() & clamp()

min():

La función CSS min() permite establecer el valor mas pequeño (mas negativo) de una lista de expresiones separadas por coma como el valor de una propiedad CSS.

max():

La función CSS le permite establecer el valor más grande (más positivo) de una lista de expresiones separadas por comas como el valor de un valor de propiedad CSS.

clamp():

La función CSS fija un valor entre un límite superior e inferior. permite seleccionar un valor medio dentro de un rango de valores entre un mínimo y un máximo definidos. Toma tres parámetros: un valor mínimo, un valor preferido y un valor máximo permitido.

```css
.container {
  /*
  min : permite crear esto pero en una linea de codigo.

  width:70%;
  max-width:600px;
  */

  width: min(600px, 70%);
  /*Buscara el valor mas pequeno*/
  width: max(600px, 70%);
  /*Buscara el valor mas grande*/
}

.container__text {
  /*
  font-size: clamp(min,ideal,max);
  */
  font-size: clamp(2rem, 5vw, 5rem);
}
```

## Notas:

> Se le puede agregar mas de dos valores.

> Se le pueden anidar un valor max o min, tambien se le puede agregar calculos sin usar calc.
