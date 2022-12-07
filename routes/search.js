const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres@tallertbdpostgres',
  host: 'tallertbdpostgres.postgres.database.azure.com',
  database: 'postgres',
  password: 'Darkzero64',
  port: 5432,
})

const loginUser = (request, response) => {
    const user = request.params.user
    console.log(user)
  
    pool.query('SELECT * FROM usuarios u WHERE u.user = $1', [user], (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).json(results.rows)
      })
    }

    module.exports = {
        loginUser
      }