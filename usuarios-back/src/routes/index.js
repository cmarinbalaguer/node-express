const express = require('express');
const router = express.Router();

const User = require('../models/users')

router.post('/add', (req, res) => {
  const newUser = new User({
    fullName: req.body.fullName,
    phone: req.body.phone,
    email: req.body.email,
    activo: req.body.activo
  });
  newUser.save()
  .then(doc => {
    console.log('Dato insertado', doc);
    res.json({response: 'success', data: doc});
  })
  .catch(err => {
    res.status(500).json({response: 'faliled'});
    console.log(err.message);
  });
});

router.get('/getAll', (req, res) => {
  User.find()
  .then(doc => {
    res.json(doc);
  })
  .catch(err => {
    res.status(500).json({response: 'faliled'});
    console.log(err.message);
  });
});

router.get('/user/:id', (req, res) => {
  const id = req.params.id;
  User.find({_id: id})
  .then(doc => {
    res.json(doc);
  })
  .catch(err => {
    res.status(500).json({response: 'faliled'});
    console.log(err.message);
  });
});

router.put('/update/:id', (req, res) => {
  const id = req.params.id;
  User.findByIdAndUpdate({_id: id}, {$set: req.body})
  .then(doc => {
    res.json(doc);
  })
  .catch(err => {
    res.status(500).json({response: 'faliled'});
    console.log(`Error: ${err.message}`);
  });
});

router.delete('/delete/:id', (req, res) => {
  const id = req.params.id;
  User.findByIdAndDelete({_id: id})
  .then(doc => {
    res.json(doc);
  })
  .catch(err => {
    res.status(500).json({response: 'faliled'});
    console.log(`Error: ${err.message}`);
  });
});

router.post('/uploadimg/:id', async (req, res) => {
  const id = req.params.id;
  try {
      if(!req.files) {
          res.send({
              status: false,
              message: 'No file uploaded'
          });
      } else {
          let avatar = req.files.file;
          avatar.mv(`./uploads/${id}/${avatar.name}`);
          res.send({
              status: true,
              message: 'File is uploaded',
              data: {
                  name: avatar.name,
                  mimetype: avatar.mimetype,
                  size: avatar.size
              }
          });
      }
  } catch (err) {
      res.status(500).send(err);
  }
});

router.put('/update-name-img/:id', (req, res) => {
  const id = req.params.id;
  User.findByIdAndUpdate({_id: id}, {$set: req.body})
  .then(doc => {
    res.json(doc);
  })
  .catch(err => {
    res.status(500).json({response: 'faliled'});
    console.log(`Error: ${err.message}`);
  });
});

module.exports = router;