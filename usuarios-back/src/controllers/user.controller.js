const userService = require('../service/user.service');

exports.createUser = async (req, res) => {
  try {
    const response = await userService.createUser(req.body);
    res.send(response);
  } catch (err) {
    res.status(500).send(err)
  }
}

exports.getAllUsers = async (req, res) => {
  try {
    const response = await userService.getAllUsers();
    res.send(response);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.getUser = async (req, res) => {
  const id = req.params.id;
  try {
    const userResponse = await userService.getUser(id);
    res.send(userResponse);
  } catch (err) {
    res.status(500).send(err);
  }
}

exports.updateUser = async (req, res) => {
  const id = req.params.id;
  try {
    const response = await userService.uploadUser(id, req.body);
    res.send(response);
  } catch (err) {
    res.status(500).send(err)
  }
}

exports.deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    const response = await userService.deleteUser(id);
    res.send(response);
  } catch (err) {
    res.status(500).send(err)
  }
}
