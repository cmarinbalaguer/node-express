import {userTypes} from '../types/userTypes'

const userModel = require('../models/user.model');

exports.createUser = async (user: userTypes) => {
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

exports.getUser = async (id: string) => {
  try {
    const user = await userModel.getUser(id);
    return { data: user, status: 'OK' }
  } catch (err) {
    return err;
  }
}

exports.uploadUser = async (id: string, user: userTypes) => {
  try {
    await userModel.uploadUser(id, user);
    return { status: 'OK' };
  } catch (err) {
    return err;
  }
}

exports.deleteUser = async (id: string) => {
  try {
    await userModel.deleteUser(id);
    return { status: 'OK' };
  } catch (err) {
    return err;
  }
}