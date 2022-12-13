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

//Se obtiene el valor del codigo
var codigo = document.getElementById('codigo').value
//Se inicializan los botones agregar y finalizar
let agregar = document.getElementById("agregar")
let finalizar = document.getElementById("finalizar")
//Se obtiene la tabla (del HTML) donde se van a mostrar los datos
let tabla = document.getElementById('tbventa')


//Conexion a la API para obtener el precio total
fetch(`https://proyectotbd.azurewebsites.net/suma`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      sumas = data
      //Funcion para agregar el precio total al HTML
      sumas.map(function(suma) {
        console.log(suma.sum)
        let suma_total = suma.sum
        if(suma_total == null){ //Si el precio es null se cambia a 0
          suma_total = 0
        }
        document.getElementById("total").innerHTML = 'Total de venta: ' + suma_total
      })
    })
    
//Funcion del boton finalizar
finalizar.addEventListener("click", function(){
  //Conexion a la API  
  fetch(`https://proyectotbd.azurewebsites.net/borrar`)
      .then((response) => {
        return response.json();
      })
      //Espera un segundo y luego recarga la pagina para actualizar la tabla
      setTimeout(location.reload(), 1000);
    })

//Funcion del boton agregar
agregar.addEventListener("click", function(){
  //Se obtiene el codigo del producto
    codigo = document.getElementById('codigo').value
    //Conexion a la API y se agrega el ID            se agrega el ID aqui
    fetch(`https://proyectotbd.azurewebsites.net/articulo/${codigo}`)
    .then((response) => {
      return response.json();
    })
    //Espera un segundo antes de recargar la pagina
    setTimeout(location.reload(), 1000);
  })

  //Conexion a la API
    fetch(`https://proyectotbd.azurewebsites.net/venta_actual`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
        let articulos = data;
        //Funcion map (for each pero con una funcion)
        articulos.map(function(producto) {
        //Se inicializan y se obtiene el valor de cada columna de la tabla de la base de datos
        let fila = document.createElement('tr');
        let col1 = document.createElement('td');
        let col2 = document.createElement('td');
        let col3 = document.createElement('td');
        let col4 = document.createElement('td');
        col1.className = "Id"
        col2.className = "Codigo"
        col3.className = "Nombre"
        col4.className = "Precio"
        //Se agrega el valor de las columnas a los elementos del HTML
        col1.innerHTML = `${producto.id}`     
        col2.innerHTML = `${producto.codigo}` 
        col3.innerHTML = `${producto.nombre}` 
        col4.innerHTML = `${producto.precioventa}` 
        //Se agregan al HTML para su visualizacion
        fila.append(col1);
        fila.append(col2);
        fila.append(col3);
        fila.append(col4);
        tabla.append(fila);
    })})

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

//Funcion del boton eliminar
let eliminar = document.getElementById('eliminar')
eliminar.addEventListener('click', function()
{
    //Se obtiene el  ID 
  codigo = document.getElementById('codigo').value
  //Conexion a la API agregando el ID                      Aqui se agrega el ID
  fetch(`https://proyectotbd.azurewebsites.net/articulo_cancelar/${codigo}`)
    .then((response) => {
      return response.json();
    })
  //Espera un segundo y actualiza la pagina
  setTimeout(location.reload(), 1000);

  })