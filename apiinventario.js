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

  const addArticulo = (request, response) => {
    const { id_articulo, id_categoria, codigo, nombre, precio_venta,stock , id_proveedor} = request.body
  
    pool.query('insert into articulo  (id_articulo, id_categoria, codigo, nombre, precio_venta, stock, id_proveedor) values ($1, $2, $3, $4, $5, $6, $7)', [id_articulo, id_categoria, codigo, nombre, precio_venta,stock , id_proveedor], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`Articulo agregado con exito`)
    })
  }

  const borrarArticulo = (request, response) => {
    const codigo = parseInt(request.params.codigo)
  
    pool.query('DELETE FROM articulo WHERE id_articulo = $1', [codigo], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Articulo eliminado con exito`)
    })
  }
  const updateArticulo = (request, response) => {
    const id = parseInt(request.params.id)
    const { id_categoria, codigo, nombre,precio_venta ,stock ,id_proveedor} = request.body
  
    pool.query(
      'UPDATE articulo SET id_categoria = $1, codigo = $2 , nombre = $3 , precio_venta = $4 , stock = $5 , id_proveedor = $6 where id_articulo = $7',
      [id_categoria, codigo, nombre,precio_venta ,stock ,id_proveedor, id],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`Articulo modificado con exito`)
      }
    )
  }
  module.exports = {
    refresh, 
    getInventario,
    addArticulo,
    borrarArticulo,
    updateArticulo,
  }