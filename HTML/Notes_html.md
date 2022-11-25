# HTML

- Indice del archivo html

```
index.html
```

- Abreviacion en vscode

```
html:5 (Estructura basica de html)
```

- Titulo y subtitulos

```html
<h1>Titulo</h1>
<!--Existen hasta h6--!>
<!--El h2 se usa para subtitulos--!>
```

- Etiquetas de texto

```html
<p>Parrafo</p>

<b>Negrita</b>

<i>Italica</i>

<strike>Tachada</strike>

<small>small letter</small>

<spam>Hello World</spam>
```

- Salto de linea

```html
</br>
```

- Enlaces

```html
<a href="#">Enlace a ruta x</a>
<!--atributo target="_BLANK"--!>
<!--Va a la ruta en una nueva pestaña--!>
```

- Listas desordenas

```html
<ul>
  <li>Numero 1</li>
  <li>Numero 2</li>
</ul>
```

- Lista ordenadas

```html
<ol>
  <li>Numero 1</li>
  <li>Numero 2</li>
</ol>
```

> Varias listas vscode lista\*numero

- Imagen

```html
<img src="ruta local/internet" />
```

- Video

```html
<video src="ruta" controls></video>
```

- Audio

```html
<audio src="ruta" controls></audio>
```

- Divs (Cajas)

```html
<div></div>
```

- Formularios

```html
<form></form>
```

- Inputs
  > Mayormente se usan en formularios

```html
<input type="text">
<!--types--!>
<!--
password
number
email
color
range
date
time
button
submit (se usar para enviar datos)
range
--!>
```

- Inputs mas usados

```html
<!--
text
password
number
email
button
submit
-!>
```

- Botones

```html
<button>Press Me</button>
<input type="button" value="Press me" />
<input type="submit" value="Send me" />
```

- Required (requerido)

```html
<input type="text" required />
```

- Metodos form

```html
//Get
<form method="Get"></form>
//Post
<form method="Post"></form>
```

- Textarea

```html
<textarea></textarea>
```

> Se puede readonly para solo textura

- Placeholder

```html
<input type="text" placeholder="Hello John" />
```

- Metadatos

```html
<meta charset="utf-8" />
```

> Se usa despues del title
> Con esto se puede utilizar acentos

- Tablas

```html
<table>
  <tr>
    <!--Principio de la fila-->
    <th>Celda cabezera</th>
    <td>Nombre</td>
    <!--primera celda-->
  </tr>
  <!--....Resto de las filas-->
</table>
```

- alt (Imagenes) !important

```html
<img src="ruta" alt="descripcion imagen" />
```

- ID (Identificador)

```html
<p id="Hello">Hello World</p>
```

- Ir a identificador x

```html
<a href="#Hello">Click Aqui</a>
<!--Nos lleva al elemento del id-->
```

- Comentarios

```html
<!--Comentario-->
```

- Labels (inputs)
  > Se usa para dar al lado un valor

```html
<input id="indoor" type="text" />
<label for="indoor">Indoor</label>
<!--OR-->
<!--Considerado buena practica-->
<label for="indoor">
  <input id="indoor" type="text" />
  Indoor
</label>
```

- Radio buttons

```html
<input id="indoor" type="radio" name="indoor" />
<label for="indoor">Indoor</label>
```

- Checkboxes

```html
<label for="loving">
  <input id="loving" type="checkbox" name="personality" value="personality" />
  Loving
</label>
<!--name y value es importante para el backend y debe describir el checkbox o el radio value-->
```

- Check by default (Checkboxes)

```html
<input type="checkbox" checked />
```

- Select (form)
  > Se usa con formularios mayormente

```html
<form action="/page.php">
  <label for="cars">Cars:</label>
  <select name="cars" id="cars">
    <option value="Coool">Cool</option>
    <option value="Dog">Dog</option>
  </select>
</form>
<!--action toma accion en x formulario-->
```

# HTML Semantico

> Es considerado buena practica y se evita el problema de divsoup

```html
<!--Cabezera-->
<header>
    <nav>
    </nav>
</header>
<!--Contenido principal-->
<main>
    <section>
        <article></article>
        <article></article>
    <section>
        <aside>
        </aside>
</main>
<!--Footer-->
<footer></footer>
<!--Estos se comportan como los divs-->
<!--Obviamente esto va dentro del body-->
```

- Imagen (Semantico)

```html
<figure>
  <img src="ruta" alt="descripcion" />
  <figcaption>Hello World</figcaption>
</figure>
```

- Radio Buttons (Semantico)

```html
<form>
  <fieldset>
    <!--RADIO BUTTONS-->
  </fieldset>
</form>
```

# Bloque de citas

```html
<blockquote
  cite="http://news.rediff.com/report/2009/sep/14/pm-pays-tribute-to-father-of-green-revolution-borlaug.htm"
>
  <p>
    "Borlaug's life and achievement are testimony to the far-reaching
    contribution that one man's towering intellect, persistence and scientific
    vision can make to human peace and progress."
  </p>
  <cite>-- Indian Prime Minister Manmohan Singh</cite>
</blockquote>
```

## Otros

- Barra de navegacion (skeleton)

```html
<header>
  <h1>Nav Skeleton</h1>
  <nav>
    <ul>
      <li><a href="#">Home</a></li>
      <li><a href="#">Products</a></li>
    </ul>
  </nav>
</header>
```

## Details

Esto es una etiqueta nueva que permite crear un acordeon donde puedes poner informacion.

```html
<details>
  <summary>Titulo del Acordeon<summary>
    <article>
      <h3>Hello wordl</h3>
      <p>lorem</p>
      <!--Mas informacion-->
    <article>
</details>
```
