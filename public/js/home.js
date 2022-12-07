window.onload = checkLogged;
  function checkLogged(){
    if(sessionStorage.getItem("logged") != 'true') {
        window.location.assign('index.html')
    } }
   
let usuario = sessionStorage.getItem("usuario")
document.getElementById("welcome").innerHTML = 'Bienvenido a su punto de venta ' + usuario
let id = sessionStorage.getItem("id")



let salir = document.getElementById("salir")
salir.addEventListener("click", function(){
sessionStorage.clear()
window.location.assign('index.html')
})

var codigo = document.getElementById('codigo').value

let agregar = document.getElementById("agregar")
let crud = document.getElementById("crud")
agregar.addEventListener("click", function(){
    codigo = document.getElementById('codigo').value
    console.log(codigo)
fetch(`https://proyectotbd.azurewebsites.net/articulo/${codigo}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
        let articulos = data;
        console.log(articulos)
        let div = document.createElement('div')
        const tpl = articulos.map((articulo) => `${articulo.codigo}  ${articulo.nombre}  ${articulo.precio_venta} <button class="eliminar">X</button>`);
        div.innerHTML = tpl
        crud.appendChild(div)
    })})

    let eliminar = document.getElementById("eliminar")
    eliminar.addEventListener("click", function(){
        console.log(this)
        this.style.display = 'none';
        })