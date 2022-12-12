const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres@tallertbdpostgres',
  host: 'tallertbdpostgres.postgres.database.azure.com',
  database: 'postgres',
  password: 'Darkzero64',
  port: 5432,
})

const getProveedores = (request, response) => {
    pool.query('SELECT * FROM proveedor', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
}

const addProveedor = (request, response) => {
  const { id_proveedor, nombre, tipo_persona, direccion, telefono,email } = request.body

  pool.query('insert into proveedor (id_proveedor, tipo_persona, nombre, dirección, telefono, email) values ($1, $2, $3, $4, $5, $6)', [id_proveedor, nombre, tipo_persona, direccion, telefono,email ], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`Proveedor agregado con exito`)
  })
}

const borrarProveedor = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM proveedor WHERE id_proveedor = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`Proveedor eliminado con exito`)
  })
}

const updateProveedor = (request, response) => {
  const id = parseInt(request.params.id)
  const { nombre, tipo_persona, direccion,telefono ,email} = request.body

  pool.query(
    'UPDATE proveedor SET nombre = $1, tipo_persona = $2 , dirección = $3 , telefono = $4 , email = $5  where id_proveedor = $6',
    [nombre, tipo_persona, direccion,telefono ,email , id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Proveedor modificado con exito`)
    }
  )
}

module.exports = {
    getProveedores,
    addProveedor,
    borrarProveedor, 
    updateProveedor,
}