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

//Funcion del boton agregar inventario
let agregar_inventario = document.getElementById('agregar_inventario')
agregar_inventario.addEventListener("click", function(){
    window.location.assign('agregar_inventario.html')
})
//Se inicializa la tabla (del HTML) donde se van a visualizar los datos
let tabla = document.getElementById('inv')

//Conexion a la API
fetch(`https://proyectotbd.azurewebsites.net/inv`)
    .then((response) => {
      return response.json();
    })
    .then((inv) => {
      //Funcion map (for each pero con una funcion)
      inv.map(function(producto) {
        //Se inicializan y se obtiene el valor de cada columna de la tabla de la base de datos
        let fila = document.createElement('tr');
        let col1 = document.createElement('td');
        let col2 = document.createElement('td');
        let col3 = document.createElement('td');
        let col4 = document.createElement('td');
        let col5 = document.createElement('td');
        let col6 = document.createElement('td');
        let col7 = document.createElement('td');
        col1.className = "Id"
        col2.className = "Codigo"
        col3.className = "Nombre"
        col4.className = "Categoria"
        col5.className = "Precio"
        col6.className = "Stock"
        col7.className = "Proveedor"
    
        //Se agrega el valor de las columnas a los elementos del HTML
        col1.innerHTML = `${producto.id_articulo}`     
        col2.innerHTML = `${producto.codigo}` 
        col3.innerHTML = `${producto.nombre}` 
        col4.innerHTML = `${producto.categoria}`    
        col5.innerHTML = `${producto.precio_venta}` 
        col6.innerHTML = `${producto.stock}` 
        col7.innerHTML = `${producto.proveedor}` 
    
        //Se agregan al HTML para su visualizacion
        fila.append(col1);
        fila.append(col2);
        fila.append(col3);
        fila.append(col4);
        fila.append(col5);
        fila.append(col6);
        fila.append(col7);
        tabla.append(fila);
    })})




