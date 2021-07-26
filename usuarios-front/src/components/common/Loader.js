import PropTypes from 'prop-types';
import { UiState } from "../../constants/UiState";

import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';

const Loader = ({uiState, fetchLoading}) => (
    <>
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
                <Button onClick={fetchLoading}>
                    Reintentar
                </Button>
                }>
                No se pudo cargar la información
            </Alert>
        </Box>}
    </>
);

Loader.propTypes = {
    uiState: PropTypes.number,
    fetchLoading: PropTypes.func
};

export default Loader;
