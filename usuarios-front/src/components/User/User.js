import { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom'

import UserForm from '../userForm/UserForm';
import UserService from '../../services/UserService';
import Page from '../page/Page';
import { UiState } from "../../constants/UiState";

import Container from '@material-ui/core/Container';
import ErrorRequest from '../common/ErrorRequest';
import Loader from '../common/Loader';

const User = () => {
  const { userId } = useParams();
  const history = useHistory();
  const [ uiState, setUiState ] = useState(UiState.None);
  const [ user, setUser ] = useState({
    fullName: '',
    phone: '',
    email: '',
    activo: false
  });

  const fetchUser = async () => {
    setUiState(UiState.Loading);
    try {
      const res = await UserService.getUser(userId);
      setUser(res.data.data[0]);
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

  const isVisible = [
    UiState.Ready,
    UiState.Processing,
    UiState.ErrorProcessing
  ].includes(uiState);

  useEffect(() => {
    fetchUser();
  }, [userId]);

  return (
    <Page
      title="Modificar usuario"
      goBackLink={true}>
      <Container>
      <Loader
        uiState={uiState}
        fetchLoading={fetchUser}/>
        {isVisible &&
        <UserForm
          value={user}
          onChange={setUser}
          updateUser={updateUser}/>}
        <ErrorRequest
          uiState={uiState}
          setUiState={setUiState}/>
      </Container>
    </Page>
  );
};

export default User;
