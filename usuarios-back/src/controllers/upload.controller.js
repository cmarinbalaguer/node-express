const upload = require('../service/upload.service');
const userService = require('../service/user.service');

exports.uploadImg = async (req, res) => {
  const id = req.params.id;
  try {
    const route = `public/uploads/img/${id}`
    const response = await upload.uploadfile(req.files, route);
    await userService.uploadUser(id, {img: `${route}/${response.data.name}`});
    res.send(response);
  } catch (err) {
    res.status(500).send(err)
  }
}