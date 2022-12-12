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
let id_proveedor = document.getElementById('id_proveedor').value;
let nombre = document.getElementById('nombre').value;
let tipo_persona = document.getElementById('tipo_persona').value;
let direccion = document.getElementById('direccion').value;
let telefono = document.getElementById('telefono').value;
let email = document.getElementById('email').value;

let datos = {
  id_proveedor: parseInt(id_proveedor,10),
  nombre: nombre,
  tipo_persona: tipo_persona,
  direccion: direccion, 
  telefono: telefono,
  email: email
}
console.log(datos)
fetch('https://proyectotbd.azurewebsites.net/agregar_proveedor', {
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
  codigo = document.getElementById('id_proveedor').value
fetch(`https://proyectotbd.azurewebsites.net/proveedor_eliminar/${codigo}`)
    .then((response) => {
      return response.json();
    })
  })


let actualizar = document.getElementById('actualizar')
actualizar.addEventListener('click', function()
{
console.log('Presionado')
let id_proveedor = document.getElementById('id_proveedor').value;
let nombre = document.getElementById('nombre').value;
let tipo_persona = document.getElementById('tipo_persona').value;
let direccion = document.getElementById('direccion').value;
let telefono = document.getElementById('telefono').value;
let email = document.getElementById('email').value;

let datos = {
  nombre: nombre,
  tipo_persona: tipo_persona,
  direccion: direccion, 
  telefono: telefono,
  email: email
}
console.log(datos)
fetch(`https://proyectotbd.azurewebsites.net/actualizar_proveedor/${id_proveedor}`, {
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