import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import UserForm from '../userForm/UserForm';
import UserService from '../../services/UserService';
import { UiState } from "../../constants/UiState";
import Page from '../page/Page';
import ErrorRequest from '../common/ErrorRequest';

import Container from '@material-ui/core/Container';

const CreateUser = () => {
  const history = useHistory();
  const [ uiState, setUiState ] = useState(UiState.None);
  const [ user, setUser ] = useState({
    fullName: '',
    phone: '',
    email: '',
    activo: false
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

  return (
    <Page
      title="Crear nuevo usuario"
      goBackLink={true}>
      <Container>
        <UserForm
          value={user}
          onChange={setUser}
          createUser={createUser}
          create={true}/>
        <ErrorRequest
          uiState={uiState}
          setUiState={setUiState}/>
      </Container>
    </Page>
  );
};

export default CreateUser;
