const User = require('../models/users')

exports.createUser = async (req, res) => {
  const newUser = new User(req.body);
  newUser.save()
  .then(doc => {
    return res.json({response: 'success', data: doc});
  })
  .catch(err => {
    return res.status(500).json({response: 'faliled'});
  });
}

exports.getAllUsers = async (req, res) => {
  User.find()
  .then(doc => {
    return res.json(doc);
  })
  .catch(err => {
    return res.status(500).json({response: 'faliled'});
  });
};

exports.getUser = async (req, res) => {
  const id = req.params.id;
  User.find({_id: id})
  .then(doc => {
    return res.json(doc);
  })
  .catch(err => {
    return res.status(500).json({response: 'faliled'});
  });
}

exports.updateUser = async (req, res) => {
  const id = req.params.id;
  User.findByIdAndUpdate({_id: id}, {$set: req.body})
  .then(doc => {
    return res.json(doc);
  })
  .catch(err => {
    return res.status(500).json({response: 'faliled'});
  });
}

exports.deleteUser = async (req, res) => {
  const id = req.params.id;
  User.findByIdAndDelete({_id: id})
  .then(doc => {
    res.json(doc);
  })
  .catch(err => {
    res.status(500).json({response: 'faliled'});
    console.log(`Error: ${err.message}`);
  });
}

exports.uploadImg = async (req, res) => {
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
}