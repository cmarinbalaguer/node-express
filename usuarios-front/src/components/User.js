import { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import Snackbar from '@material-ui/core/Snackbar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { indigo, red } from '@material-ui/core/colors';
import CssBaseline from '@material-ui/core/CssBaseline';
import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import Brightness5RoundedIcon from '@material-ui/icons/Brightness5Rounded';
import Brightness4RoundedIcon from '@material-ui/icons/Brightness4Rounded';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';

import UserForm from './UserForm';
import UserService from '../services/UserService';

const UiState = {
  None: 0,
  Ready: 1,
  Loading: 2,
  ErrorLoading: 3,
  Processing: 4,
  ErrorProcessing: 5
};

const useStyles = makeStyles(() => ({
  title: {
    flexGrow: 1,
  }
}));

const User = () => {
  const { userId } = useParams();
  const history = useHistory();
  const classes = useStyles();
  const [ uiState, setUiState ] = useState(UiState.None);
  const [ user, setUser ] = useState({
    fullName: '',
    phone: 0,
    email: '',
    activo: false
  });
  const [ theme, setTheme] = useState(true);

  const themeApp = createTheme({
    palette: {
      type: theme ? "light" : "dark",
      primary: {
        main: theme ? indigo.A200 : indigo.A100
      },
      error: {
        main: theme ? red.A200 : red.A100
      }
    }
  });

  const fetchUser = async () => {
    setUiState(UiState.Loading);
    try {
      const res = await UserService.getUser(userId);
      setUser(res.data[0]);
      setUiState(UiState.Ready);
    } catch {
      setUiState(UiState.ErrorLoading);
    }
  };

  const updateUser = async () => {
    setUiState(UiState.Loading);
    try {
      await UserService.update(userId, user);
      setUser(prevUser => prevUser);
      history.replace(`/`);
      setUiState(UiState.Ready);
    } catch {
      setUiState(UiState.ErrorProcessing);
    }
  };

  const snackbarCloseHandler = () => {
    if (uiState === UiState.ErrorProcessing) {
      setUiState(UiState.Ready);
    }
  };

  const handleTheme = () => {
    setTheme(prevTheme => !prevTheme);
  };

  const isListVisible = [
    UiState.Ready,
    UiState.Processing,
    UiState.ErrorProcessing
  ].includes(uiState);

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
          <Typography variant="h6" className={classes.title}>
            Datos de usuario
          </Typography>
          <IconButton onClick={handleTheme}>
            {theme 
            ? <Brightness5RoundedIcon style={{color: '#fff'}} />
            : <Brightness4RoundedIcon style={{color: '#323333'}} />}
          </IconButton>
        </Toolbar>
      </AppBar>
      <Container>
        {uiState === UiState.Loading &&
          <Box
            my={10}
            display="flex"
            justifyContent="center">
            <CircularProgress />
          </Box>}
          {uiState === UiState.ErrorLoading &&
          <Box my={5}>
            <Alert
              severity="error"
              action={
                <Button onClick={fetchUser}>
                  Reintentar
                </Button>
              }>
              No se pudo cargar el formulario
            </Alert>
          </Box>}
        {isListVisible &&
        <UserForm
          value={user}
          onChange={setUser}
          updateUser={updateUser}/>}
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          autoHideDuration={3000}
          open={uiState === UiState.ErrorProcessing}
          onClose={snackbarCloseHandler}>
          <Alert severity="error">
            Ocurrió un error al procesar la solicitud
          </Alert>
        </Snackbar>
      </Container>
    </ThemeProvider>
  );
};

export default User;
