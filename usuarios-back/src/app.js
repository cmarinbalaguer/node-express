const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const _ = require('lodash');
const app = express();

app.use(fileUpload({
  createParentPath: true
}));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));

mongoose.connect('mongodb://localhost/users')
  .then(db => console.log('Conectado correctamente'))
  .catch(err => {
    console.log(`Error en la conexion db ${err.message}`);
  })

const indexRoutes = require('./routes/index');

app.set('port', process.env.PORT || 3003)


// app.use(express.json())
// app.use(express.urlencoded({ extended: true }));

app.use('/', indexRoutes);

app.listen(3003, () => {
  console.log(`Conectado servidor en el puerto ${app.get('port')}`);
});
