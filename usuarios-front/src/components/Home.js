import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

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
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';

import UserService from '../services/UserService';
import { UserList } from './UserList';

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

const Home = () => {
  const history = useHistory();
  const classes = useStyles();
  const [ uiState, setUiState ] = useState(UiState.None);
  const [ users, setUsers ] = useState([]);
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

  const fetchUsers = async () => {
    setUiState(UiState.Loading);
    try {
      const res = await UserService.getAll();
      setUsers(res.data);
      setUiState(UiState.Ready);
    } catch {
      setUiState(UiState.ErrorLoading);
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

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <ThemeProvider theme={themeApp}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Listado de usuario
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
                <Button onClick={fetchUsers}>
                  Reintentar
                </Button>
              }>
              No se pudo cargar el formulario
            </Alert>
          </Box>}
        
        {users.length > 0 &&
          <UserList
            users={users}
            fetchUsers={fetchUsers}
          />
        }
        <Button 
          variant="contained"
          color="primary"
          onClick={() => history.replace('/create-user')}
          >
            Crear usuario
        </Button>
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

export default Home;
