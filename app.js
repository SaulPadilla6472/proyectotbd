//Se inicializan las dependencias (extensiones) del servidor
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser')
var cors = require('cors')

//Se inicializan las API importando los archivos .JS
var apiclientes = require('./apiclientes')
var apiproveedor = require('./apiproveedor')
var apiinventario = require('./apiinventario')
var apiarticulo = require('./apiarticulo')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

//Se inicializa la aplicacion express (Framework del server node JS)
var app = express();
app.use(cors())

//Inicializacion automatica del setup del server
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

//Se le asigna un URL a cada API para poder acceder a ellas
app.use('/', indexRouter);
app.get('/articulo/:codigo', apiarticulo.getArticulo);
app.use('/inv', apiinventario.getInventario);
app.use('/inv', apiinventario.refresh);
app.get('/articulo/:codigo', apiarticulo.getArticulo);
app.use('/borrar', apiarticulo.finalizarventa)
app.use('/suma', apiarticulo.preciototal)
app.use('/venta_actual', apiarticulo.obtenertabla)
app.use('/prov', apiproveedor.getProveedores)
app.get('/cliente', apiclientes.getClientes)
app.post('/cliente', apiclientes.addCliente)
app.get('/cliente_eliminar/:id', apiclientes.borrarCliente)
app.post('/agregar_articulo', apiinventario.addArticulo)
app.get('/articulo_eliminar/:codigo', apiinventario.borrarArticulo)
app.post('/agregar_proveedor', apiproveedor.addProveedor)
app.get('/proveedor_eliminar/:id', apiproveedor.borrarProveedor)
app.get('/articulo_cancelar/:codigo', apiarticulo.cancelarArticulo)
app.put('/actualizar_articulo/:id', apiinventario.updateArticulo)
app.put('/actualizar_proveedor/:id', apiproveedor.updateProveedor)
app.put('/actualizar_cliente/:id', apiclientes.updateCliente)
















// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
