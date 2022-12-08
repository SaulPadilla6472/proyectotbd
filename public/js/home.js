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
let finalizar = document.getElementById("finalizar")

let tabla = document.getElementById('tbventa')



fetch(`https://proyectotbd.azurewebsites.net/suma`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      sumas = data
      sumas.map(function(suma) {
        console.log(suma.sum)
        let suma_total = suma.sum
        if(suma_total == null){
          suma_total = 0
        }
        document.getElementById("total").innerHTML = 'Total de venta: ' + suma_total

      })
    })
    
    
  
finalizar.addEventListener("click", function(){
    fetch(`https://proyectotbd.azurewebsites.net/borrar`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
       
      })
      setTimeout(location.reload(), 1000);
      
    
    })










agregar.addEventListener("click", function(){
    codigo = document.getElementById('codigo').value
  fetch(`https://proyectotbd.azurewebsites.net/articulo/${codigo}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
     
    })
    setTimeout(location.reload(), 1000);
    
  
  })



    fetch(`https://proyectotbd.azurewebsites.net/venta_actual`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
        let articulos = data;
        articulos.map(function(producto) {
        let fila = document.createElement('tr');
        let col1 = document.createElement('td');
        let col2 = document.createElement('td');
        let col3 = document.createElement('td');
        let col4 = document.createElement('td');

        col1.className = "Id"
        col2.className = "Codigo"
        col3.className = "Nombre"
        col4.className = "Precio"

        col1.innerHTML = `${producto.id}`     
        col2.innerHTML = `${producto.codigo}` 
        col3.innerHTML = `${producto.nombre}` 
        col4.innerHTML = `${producto.precioventa}` 

        fila.append(col1);
        fila.append(col2);
        fila.append(col3);
        fila.append(col4);
        tabla.append(fila);




    })})


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
