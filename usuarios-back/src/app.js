const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const fileUpload = require('express-fileupload');
const morgan = require('morgan');
const db = require('./config');
const indexRoutes = require('./routes/index');

mongoose.connect(db, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true
}).then(() => {
const app = express();
  app.use(fileUpload({
    createParentPath: true
  }));
  app.use(cors());
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }));
  app.use(morgan('dev'));
  app.set('port', process.env.PORT || 3003)
  app.use('/', indexRoutes);
  app.listen(3003, () => {
    console.log(`Conectado servidor en el puerto ${app.get('port')}`);
  });
});

mongoose.connection.on('error', err => {
  console.error(err);
  console.log(`MongoDB connection failed: ${db}`);
  process.exit();
});
