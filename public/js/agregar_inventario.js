//Funcion para comprobar si ya se inicio sesion
window.onload = checkLogged;
  function checkLogged(){
    if(sessionStorage.getItem("logged") != 'true') {
        window.location.assign('index.html')
    } }
   
//Funcion para mensaje personalizado    
let usuario = sessionStorage.getItem("usuario")
document.getElementById("welcome").innerHTML = 'Bienvenido a su punto de venta ' + usuario
let id = sessionStorage.getItem("id")
var suma_total = 0;

//Funcion del boton salir
let salir = document.getElementById("salir")
salir.addEventListener("click", function(){
sessionStorage.clear()
window.location.assign('index.html')
})

//Funcion del boton inventario
let inventario = document.getElementById('Inventario')
inventario.addEventListener("click", function(){
  window.location.assign('inventario.html')
})

//Funcion del boton factura
let factura = document.getElementById('Facturas')
factura.addEventListener("click", function(){
  window.location.assign('factura.html')
})

//Funcion del boton histortial
let historial = document.getElementById('Historial')
  historial.addEventListener("click", function(){
    window.location.assign('historial.html')
})

//Funcion del boton clientes
let clientes = document.getElementById('Clientes')
  clientes.addEventListener("click", function(){
    window.location.assign('clientes.html')
})

//Funcion del boton proveedores
let proveedores = document.getElementById('Proveedores')
  proveedores.addEventListener("click", function(){
    window.location.assign('proveedores.html')
})


//Funcion del boton enviar
let enviar = document.getElementById('enviar')
enviar.addEventListener('click', function()
{
//Se obtiene el valor de todos los elementos del formulario
let id_producto = document.getElementById('id_producto').value;
let id_categoria = document.getElementById('id_categoria').value;
let codigo = document.getElementById('codigo').value;
let nombre = document.getElementById('nombre').value;
let precio = document.getElementById('precio').value;
let stock = document.getElementById('stock').value;
let id_proveedor = document.getElementById('id_proveedor').value;

//Se agrupan todos los datos en una sola variable
let datos = {
  id_articulo: parseInt(id_producto,10),
  id_categoria: parseInt(id_categoria,10),
  codigo: codigo,
  nombre: nombre, 
  precio_venta: parseInt(precio,10),
  stock: parseInt(stock,10),
  id_proveedor: parseInt(id_proveedor,10)
}
//Conexion a la API
fetch('https://proyectotbd.azurewebsites.net/agregar_articulo', {
   method: 'POST', //Se indica que va a ser un http request del tipo POST (va a mandar datos a la API)
   body: JSON.stringify(datos), //Los datos que se van a mandar
   headers: {"Content-type": "application/json; charset=UTF-8"} //Se indica el tipo de datos
})
.then(function(response) {
   if(response.ok) {
       console.log('exito')
   } else {
       console.log("Fallo");
   }
})
})

//Funcion del boton eliminar
let eliminar = document.getElementById('eliminar')
eliminar.addEventListener('click', function()
{
  //Se obtiene el  ID 
  codigo = document.getElementById('id_producto').value
  //Conexion a la API agregando el ID                      Aqui se agrega el ID
fetch(`https://proyectotbd.azurewebsites.net/articulo_eliminar/${codigo}`) 
    .then((response) => {
      return response.json();
    })
  })

//Funcion del boton actualizar
let actualizar = document.getElementById('actualizar')
actualizar.addEventListener('click', function()
{
//Se obtiene el valor de los datos  
let id_producto = document.getElementById('id_producto').value;
let id_categoria = document.getElementById('id_categoria').value;
let codigo = document.getElementById('codigo').value;
let nombre = document.getElementById('nombre').value;
let precio = document.getElementById('precio').value;
let stock = document.getElementById('stock').value;
let id_proveedor = document.getElementById('id_proveedor').value;

//Se agrupan los datos en una sola variable
let datos = {
  id_categoria: parseInt(id_categoria,10),
  codigo: codigo,
  nombre: nombre, 
  precio_venta: parseInt(precio,10),
  stock: parseInt(stock,10),
  id_proveedor: parseInt(id_proveedor,10)
}

//Conexion a la API con el ID                                      ID aqui
fetch(`https://proyectotbd.azurewebsites.net/actualizar_articulo/${id_producto}`, {
   method: 'PUT',//Se especifica que va a ser un http reques del metodo PUT (Se va a actualizar algo con los datos que enviemos)
   body: JSON.stringify(datos), //Se agregan los datos
   headers: {"Content-type": "application/json; charset=UTF-8"} //Se especifica el tipo de datos
})
.then(function(response) {
   if(response.ok) {
       console.log('exito')
   } else {
       console.log("Fallo");
   }
})
})