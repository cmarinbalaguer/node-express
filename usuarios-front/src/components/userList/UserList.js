import React from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import UserService from '../../services/UserService';

import { List, ListItem } from '@material-ui/core'
import Delete from '@material-ui/icons/Delete'
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

export const UserList = ({ users, fetchUsers }) => {
  const history = useHistory();
  const deleteUser = async (id) => {
    try {
      await UserService.delete(id);
      fetchUsers();
    } catch {
      console.log('error al eliminar');
    }
  };

  return (
    <List>
      {users.map((us) => {
        return (
          <ListItem
            key={us._id}
            alignItems="flex-start" 
            button
          >
            <Delete
              className="buttonsListUsers"
              onClick={() => deleteUser(us._id)} />
            <CloudUploadIcon
              className="buttonsListUsers"
              onClick={() => history.replace(`/upload-file/${us._id}`)} />
            <Link to={`user/${us._id}`} style={{marginLeft: '20px', textDecoration: 'none'}}>{us.fullName}</Link>
          </ListItem> 
        )
      })}
    </List>
  )
}

UserList.propTypes = {
  users: PropTypes.array.isRequired,
  fetchUsers: PropTypes.func
};

