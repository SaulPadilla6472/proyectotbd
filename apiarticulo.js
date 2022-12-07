const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres@tallertbdpostgres',
  host: 'tallertbdpostgres.postgres.database.azure.com',
  database: 'postgres',
  password: 'Darkzero64',
  port: 5432,
})

const getArticulo = (request, response) => {
    const codigo = request.params.codigo
    pool.query('select a.codigo , a.nombre, a.precio_venta  from articulo a where a.codigo = $1' ,[codigo], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  module.exports = {
    getArticulo, 
  }