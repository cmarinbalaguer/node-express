import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import Snackbar from '@material-ui/core/Snackbar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { indigo, red } from '@material-ui/core/colors';
import CssBaseline from '@material-ui/core/CssBaseline';
import Alert from '@material-ui/lab/Alert';
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

const CreateUser = () => {
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

  const createUser = async () => {
    setUiState(UiState.Loading);
    try {
      await UserService.create(user);
      setUser(prevUser => prevUser);
      setUiState(UiState.Ready);
      history.replace(`/`);
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
            Crear nuevo usuario
          </Typography>
          <IconButton onClick={handleTheme}>
            {theme 
            ? <Brightness5RoundedIcon style={{color: '#fff'}} />
            : <Brightness4RoundedIcon style={{color: '#323333'}} />}
          </IconButton>
        </Toolbar>
      </AppBar>
      <Container>
        <UserForm
          value={user}
          onChange={setUser}
          createUser={createUser}
          create={true}/>
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

export default CreateUser;
