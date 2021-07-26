const userModel = require('../models/userModel');

exports.createUser = async (user) => {
  try {
    const newUser = await userModel.createUser(user);
    return { data: newUser, status: 'OK' };
  } catch (err) {
    return err;
  }
}

exports.getAllUsers = async () => {
  try {
    const users = await userModel.getAllUsers();
    return { data: users, status: 'OK' };
  } catch (err) {
    return err
  }
}

exports.getUser = async (id) => {
  try {
    const user = await userModel.getUser(id);
    return { data: user, status: 'OK' }
  } catch (err) {
    return err;
  }
}

exports.uploadUser = async (id, user) => {
  try {
    await userModel.uploadUser(id, user);
    return { data: newUser, status: 'OK' };
  } catch (err) {
    return err;
  }
}

exports.deleteUser = async (id, user) => {
  try {
    await userModel.deleteUser(id);
    return { data: newUser, status: 'OK' };
  } catch (err) {
    return err;
  }
}