const userService = require('../service/userService');
const upload = require('../helpers/upload');

exports.createUser = async (req, res) => {
  try {
    const response = await userService.createUser(req.body);
    return res.send(response);
  } catch (err) {
    res.status(500).send(err)
  }
}

exports.getAllUsers = async (req, res) => {
  try {
    const response = await userService.getAllUsers();
    return res.send(response);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.getUser = async (req, res) => {
  const id = req.params.id;
  try {
    const userResponse = await userService.getUser(id);
    return res.send(userResponse);
  } catch (err) {
    res.status(500).send(err);
  }
}

exports.updateUser = async (req, res) => {
  const id = req.params.id;
  try {
    const response = await userService.uploadUser(id, req.body);
    return res.send(response);
  } catch (err) {
    res.status(500).send(err)
  }
}

exports.deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    const response = await userService.deleteUser(id);
    return res.send(response);
  } catch (err) {
    res.status(500).send(err)
  }
}

exports.uploadImg = async (req, res) => {
  const id = req.params.id;
  try {
    const route = `public/uploads/img/${id}`
    const response = await upload.uploadfile(req.files, route);
    await userService.uploadUser(id, {img: `public/uploads/img/${id}/${response.data.name}`});
    return res.send(response);
  } catch (err) {
    res.status(500).send(err)
  }
}