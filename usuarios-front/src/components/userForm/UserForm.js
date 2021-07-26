import PropTypes from 'prop-types';

import Box from '@material-ui/core/Box';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';

const UserForm = ({ value, onChange, updateUser, createUser, create }) => {
  const fullNameChangeHandler = (event) => {
    onChange({
      ...value,
      fullName: event.target.value
    });
  };

  const phoneChangeHandler = (event) => {
    onChange({
      ...value,
      phone: +event.target.value
    });
  };

  const receiveAdsChangeHandler = (event) => {
    onChange({
      ...value,
      activo: event.target.checked
    });
  };

  const fieldChangeHandler = (fieldName) => {
    return (event) => {
      onChange({
        ...value,
        [fieldName]: event.target.value
      });
    };
  };

  /*const getValidationErrors = () => {
    const fullName = value.fullName.length
      ? ''
      : 'Requerido';

    const email = value.email.match(/^[\d\w\-_]+?@[\d\w\-_]+?\.[\w]+$/)
      ? ''
      : 'Debe ser un email';

    return {
      fullName,
      email
    };
  };

  const errors = getValidationErrors();*/

  return (
    <Box
      maxWidth={350}
      mx="auto"
      my={2}>
      <FormControl
        fullWidth
        margin="normal">
        <TextField
          label="Nombre y apellidos"
          value={value.fullName}
          onChange={fullNameChangeHandler}
          // error={!!errors.fullName}
          // helperText={errors.fullName}
          />
      </FormControl>

      <FormControl
        fullWidth
        margin="normal">
        <TextField
          label="Teléfono"
          value={value.phone}
          onChange={phoneChangeHandler}/>
      </FormControl>
      <FormControl
        fullWidth
        margin="normal">
        <TextField
          type="email"
          label="Email"
          value={value.email}
          onChange={fieldChangeHandler('email')}
          // error={!!errors.email}
          // helperText={errors.email}
          />
      </FormControl>
      <FormControl
        fullWidth
        margin="normal">
        <FormControlLabel
          label="Activo"
          control={
            <Checkbox
              color="primary"
              checked={value.activo}
              onChange={receiveAdsChangeHandler}/>
          }/>
      </FormControl>
      <Box
        display="flex"
        justifyContent="flex-end">
          <Button 
            variant="contained"
            color="primary"
            // disabled={errors.fullName === '' && errors.email === '' ? false : true}
            onClick={create ? createUser : updateUser}>
              {create ? "GUARDAR" : "ACTUALIZAR" }
          </Button>
        </Box>
    </Box>
  );
};

UserForm.defaultProps = {
  onChange: () => {},
  updateUser: () => {},
  createUser: () => {},
  create: false
};

UserForm.propTypes = {
  value: PropTypes.shape({
    fullName: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    activo: PropTypes.bool.isRequired
  }).isRequired,
  onChange: PropTypes.func,
  updateUser: PropTypes.func,
  createUser: PropTypes.func,
  create: PropTypes.bool
};

export default UserForm;
