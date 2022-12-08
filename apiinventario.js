const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres@tallertbdpostgres',
  host: 'tallertbdpostgres.postgres.database.azure.com',
  database: 'postgres',
  password: 'Darkzero64',
  port: 5432,
})

const refresh = (request, response) => {
    pool.query('create or replace view INVENTARIO AS select a.id_articulo , a.codigo , a.nombre, c.nombre as categoria , a.precio_venta , a.stock , p.nombre as proveedor  from articulo a , categoria c , proveedor p where a.id_categoria  = c.id_categoria and p.id_proveedor =a.id_proveedor' , (error, results) => {
      if (error) {
        throw error
      }
      response.status(200)
    })
  }

  const getInventario = (request, response) => {
    pool.query('SELECT * FROM INVENTARIO', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  module.exports = {
    refresh, 
    getInventario,
  }