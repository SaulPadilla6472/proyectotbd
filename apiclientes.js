const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres@tallertbdpostgres',
  host: 'tallertbdpostgres.postgres.database.azure.com',
  database: 'postgres',
  password: 'Darkzero64',
  port: 5432,
})

const addCliente = (request, response) => {
  const { id_cliente, nombre, direccion, telefono, email } = request.body

  pool.query('insert into cliente  (id_cliente, nombre, direccion, telefono, email) values ($1, $2, $3, $4, $5)', [id_cliente, nombre, direccion, telefono, email], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`Cliente agregado con exito`)
  })
}

  const getClientes = (request, response) => {
    pool.query('SELECT * FROM cliente', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
  const borrarCliente = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('DELETE FROM cliente WHERE id_cliente = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Cliente eliminado con exito`)
    })
  }

  const updateCliente = (request, response) => {
    const id = parseInt(request.params.id)
    const { nombre, direccion,telefono ,email} = request.body
  
    pool.query(
      'UPDATE cliente SET nombre = $1,  direccion = $2 , telefono = $3 , email = $4  where id_cliente = $5',
      [nombre,  direccion,telefono ,email , id],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`Cliente modificado con exito`)
      }
    )
  }
  module.exports = {
    addCliente, 
    getClientes,
    borrarCliente,
    updateCliente,
  }