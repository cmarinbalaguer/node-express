import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom';
import UserService from '../../services/UserService';
import Page from '../page/Page';

import Container from '@material-ui/core/Container';
import { Button } from '@material-ui/core';

export const UploadFile = () => {

  const { userId } = useParams();
  const history = useHistory();
  const [image, setImage] = useState();
  const [ user, setUser ] = useState({});

  const handleChangeImg = (event) => {
    event.preventDefault();
    setImage(event.target.files[0])
  };

  const uploadFileImg = async() => {
    const formData = new FormData()
    formData.append('file', image)
    try {
      await UserService.createFile(userId, formData);
      history.replace(`/`);
    } catch {
      console.log('error al subir imagen');
    }
  }

  const fetchUser = async () => {
    try {
      const res = await UserService.getUser(userId);
      setUser(res.data.data);
    } catch {
      console.log('error');
    }
  };

  useEffect(() => {
    fetchUser();
  }, [userId]);

  console.log(user);

  return (
    <Page
      title="Subir imagen de usuario"
      goBackLink={true}>
      <Container>
        <div style={{marginTop: '20px', marginBottom: '20px'}}>
        <p>{user.length > 0 && user[0].img}</p>
        {user.length > 0 &&
          <img src={`http://localhost:3000/public/uploads/img/${user[0]._id}/${user[0].img}`} alt={user[0].img}/>
        }
          <input type="file" name="file" accept="image/*" multiple={false} onChange={handleChangeImg} />
        </div>
        <Button 
          variant="contained"
          color="primary"
          onClick={uploadFileImg}>
            GUARDAR
        </Button>
      </Container>
    </Page>
  )
}
