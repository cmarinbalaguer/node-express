import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

import UserService from '../../services/UserService';
import { UserList } from '../userList/UserList';
import Page from '../page/Page';
import Loader from '../common/Loader';
import ErrorRequest from '../common/ErrorRequest';
import { UiState } from "../../constants/UiState";

const Home = () => {
  const history = useHistory();
  const [ uiState, setUiState ] = useState(UiState.None);
  const [ users, setUsers ] = useState([]);

  const fetchUsers = async () => {
    setUiState(UiState.Loading);
    try {
      const res = await UserService.getAll();
      setUsers(res.data.data);
      setUiState(UiState.Ready);
    } catch {
      setUiState(UiState.ErrorLoading);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Page
      title="Listado de usuarios">
      <Container>
        <Loader
          uiState={uiState}
          fetchLoading={fetchUsers}/>
        
        {users.length > 0 &&
          <UserList
            users={users}
            fetchUsers={fetchUsers}
          />
        }
        <ErrorRequest
          uiState={uiState}
          setUiState={setUiState}/>
        <Button 
          variant="contained"
          color="primary"
          onClick={() => history.replace('/create-user')}
          >
            Crear usuario
        </Button>
      </Container>
    </Page>
  );
};

export default Home;
