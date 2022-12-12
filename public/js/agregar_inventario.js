window.onload = checkLogged;
  function checkLogged(){
    if(sessionStorage.getItem("logged") != 'true') {
        window.location.assign('index.html')
    } }
   
let usuario = sessionStorage.getItem("usuario")
document.getElementById("welcome").innerHTML = 'Bienvenido a su punto de venta ' + usuario
let id = sessionStorage.getItem("id")
var suma_total = 0;


let salir = document.getElementById("salir")
salir.addEventListener("click", function(){
sessionStorage.clear()
window.location.assign('index.html')
})

let inventario = document.getElementById('Inventario')
inventario.addEventListener("click", function(){
  window.location.assign('inventario.html')
})

let factura = document.getElementById('Facturas')
factura.addEventListener("click", function(){
  window.location.assign('factura.html')
})

let historial = document.getElementById('Historial')
  historial.addEventListener("click", function(){
    window.location.assign('historial.html')
})

let clientes = document.getElementById('Clientes')
  clientes.addEventListener("click", function(){
    window.location.assign('clientes.html')
})

let proveedores = document.getElementById('Proveedores')
  proveedores.addEventListener("click", function(){
    window.location.assign('proveedores.html')
})



let enviar = document.getElementById('enviar')
enviar.addEventListener('click', function()
{
console.log('Presionado')
let id_producto = document.getElementById('id_producto').value;
let id_categoria = document.getElementById('id_categoria').value;
let codigo = document.getElementById('codigo').value;
let nombre = document.getElementById('nombre').value;
let precio = document.getElementById('precio').value;
let stock = document.getElementById('stock').value;
let id_proveedor = document.getElementById('id_proveedor').value;

let datos = {
  id_articulo: parseInt(id_producto,10),
  id_categoria: parseInt(id_categoria,10),
  codigo: codigo,
  nombre: nombre, 
  precio_venta: parseInt(precio,10),
  stock: parseInt(stock,10),
  id_proveedor: parseInt(id_proveedor,10)
}
console.log(datos)
fetch('https://proyectotbd.azurewebsites.net/agregar_articulo', {
   method: 'POST',
   body: JSON.stringify(datos),
   headers: {"Content-type": "application/json; charset=UTF-8"}
})
.then(function(response) {
   if(response.ok) {
       console.log('exito')
   } else {
       console.log("Fallo");
   }
})
})

let eliminar = document.getElementById('eliminar')
eliminar.addEventListener('click', function()
{
  codigo = document.getElementById('id_producto').value
fetch(`https://proyectotbd.azurewebsites.net/articulo_eliminar/${codigo}`)
    .then((response) => {
      return response.json();
    })
  })


let actualizar = document.getElementById('actualizar')
actualizar.addEventListener('click', function()
{
console.log('Presionado')
let id_producto = document.getElementById('id_producto').value;
let id_categoria = document.getElementById('id_categoria').value;
let codigo = document.getElementById('codigo').value;
let nombre = document.getElementById('nombre').value;
let precio = document.getElementById('precio').value;
let stock = document.getElementById('stock').value;
let id_proveedor = document.getElementById('id_proveedor').value;

let datos = {
  id_categoria: parseInt(id_categoria,10),
  codigo: codigo,
  nombre: nombre, 
  precio_venta: parseInt(precio,10),
  stock: parseInt(stock,10),
  id_proveedor: parseInt(id_proveedor,10)
}
console.log(datos)
fetch(`https://proyectotbd.azurewebsites.net/actualizar_articulo/${id_producto}`, {
   method: 'PUT',
   body: JSON.stringify(datos),
   headers: {"Content-type": "application/json; charset=UTF-8"}
})
.then(function(response) {
   if(response.ok) {
       console.log('exito')
   } else {
       console.log("Fallo");
   }
})
})