//Conexion a la base de datos
const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres@tallertbdpostgres',
  host: 'tallertbdpostgres.postgres.database.azure.com',
  database: 'postgres',
  password: 'Darkzero64',
  port: 5432,
})

//Funcion para insertar un articulo a la tabla auxiliar venta actual usando un select a la tabla articulo
const getArticulo = (request, response) => {
    const codigo = request.params.codigo
    pool.query('insert into venta_actual (codigo, nombre,precioventa) select a.codigo , a.nombre , a.precio_venta  from articulo a where codigo = $1',[codigo] , (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
}

//Borra todos los datos de la tabla auxiliar para finalizar la venta
const finalizarventa = (request, response) =>{
  pool.query('delete from venta_actual where id > 0', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

//Funcion que suma la columna precioventa para obtener el total de la venta
const preciototal = (request, response) =>{
  pool.query('select SUM(precioventa) from venta_actual', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

//Selecciona toda la tabla venta_actual para su visualizacion
const obtenertabla = (request, response) =>{
  pool.query('select * from venta_actual', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

//Funcion para cancelar un articulo segun su ID
const cancelarArticulo = (request, response) => {
  const codigo = parseInt(request.params.codigo)

  pool.query('DELETE FROM venta_actual WHERE id = $1', [codigo], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`Articulo eliminado con exito`)
  })
}

//Exportar las funciones para poder usarlas en app.js
module.exports = {
    getArticulo, 
    finalizarventa,
    preciototal,
    obtenertabla,
    cancelarArticulo,
  }