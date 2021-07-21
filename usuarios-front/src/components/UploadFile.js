import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom';
import UserService from '../services/UserService';

import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import IconButton from '@material-ui/core/IconButton';
import { Button } from '@material-ui/core';

export const UploadFile = () => {

  const { userId } = useParams();
  const history = useHistory();
  const [ theme, setTheme] = useState(true);

  const [image, setImage] = useState();
  const [ user, setUser ] = useState({});

  const themeApp = createTheme({
    palette: {
      type: theme ? "light" : "dark"
    }
  });

  const handleChangeImg = (event) => {
    event.preventDefault();
    setImage(event.target.files[0])
  };

  const uploadFileImg = async() => {
    const formData = new FormData()
    formData.append('file', image)
    try {
      const res = await UserService.createFile(userId, formData);
      await UserService.updateNameImage(userId, {img: res.data.data.name});
    } catch {
      console.log('error al subir imagen');
    }
  }

  const fetchUser = async () => {
    try {
      const res = await UserService.getUser(userId);
      setUser(res.data);
    } catch {
      console.log('error');
    }
  };

  useEffect(() => {
    fetchUser();
  }, [userId]);

  return (
    <ThemeProvider theme={themeApp}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={() => history.replace('/')}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6">
            Subir imagen de usuario
          </Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <div style={{marginTop: '20px', marginBottom: '20px'}}>
        <p>{user.length > 0 && user[0].img}</p>
        {user.length > 0 &&
        <img src={`http://localhost:3003/uploads/${user[0].id}/${user[0].img}`} />
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
    </ThemeProvider>
  )
}
