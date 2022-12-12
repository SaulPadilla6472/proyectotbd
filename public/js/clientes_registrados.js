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


let tabla = document.getElementById('client')

fetch(`https://proyectotbd.azurewebsites.net/cliente`)
    .then((response) => {
      return response.json();
    })
    .then((inv) => {
      inv.map(function(producto) {
        let fila = document.createElement('tr');
        let col1 = document.createElement('td');
        let col2 = document.createElement('td');
        let col3 = document.createElement('td');
        let col4 = document.createElement('td');
        let col5 = document.createElement('td');
        col1.className = "Id"
        col2.className = "Nombre"
        col3.className = "Direcccion"
        col4.className = "Telefono"
        col5.className = "Email"
    
        col1.innerHTML = `${producto.id_cliente}`     
        col2.innerHTML = `${producto.nombre}` 
        col3.innerHTML = `${producto.direccion}` 
        col4.innerHTML = `${producto.telefono}`    
        col5.innerHTML = `${producto.email}` 

    
        fila.append(col1);
        fila.append(col2);
        fila.append(col3);
        fila.append(col4);
        fila.append(col5);
        tabla.append(fila);
    })})
