import {userTypes} from '../types/userTypes'

const User = require('../schema/user.schema');

exports.createUser = (user: userTypes) => {
  const newUser = new User(user);
  return newUser.save()
  .then(doc => {
    return doc;
  })
  .catch(err => {
    return err;
  });
}

exports.getAllUsers = () => {
   return User.find()
   .then(doc => {
      return doc;
    })
    .catch(err => {
      return err;
    });
}

exports.getUser = (id: string) => {
  return User.find({_id: id}, 'fullName email phone activo img')
    .then(doc => {
      return doc;
    })
    .catch(err => {
      return err;
    });
}

exports.uploadUser = (id: string, user: userTypes) => {
  return User.findByIdAndUpdate({_id: id}, {$set: user})
  .then(doc => {
    return doc;
  })
  .catch(err => {
    return err;
  });
}

exports.deleteUser = (id: string) => {
  return User.findByIdAndDelete({_id: id})
  .then(doc => {
    return doc;
  })
  .catch(err => {
    return err;
  });
}