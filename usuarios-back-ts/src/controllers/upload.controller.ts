import { Request, Response } from 'express'
import { MulterFile } from '../types/multeFile'

const upload = require('../service/upload.service');
const userServices = require('../service/user.service');

exports.uploadImg = async (req: Request & { files: MulterFile[] }, res: Response) => {
  const id = req.params.id;
  try {
    const route = `public/uploads/img/${id}`
    console.log(req.files);
    const response = await upload.uploadfile(req.files, route);
    await userServices.uploadUser(id, {img: `${route}/${response.data.name}`});
    res.send(response);
  } catch (err) {
    res.status(500).send(err)
  }
}