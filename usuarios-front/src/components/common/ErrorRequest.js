import PropTypes from 'prop-types';
import { UiState } from "../../constants/UiState";

import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

const ErrorRequest = ({uiState, setUiState}) => {

    const snackbarCloseHandler = () => {
        if (uiState === UiState.ErrorProcessing) {
            setUiState(UiState.Ready);
        }
    };

    return(
        <>
            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                autoHideDuration={3000}
                open={uiState === UiState.ErrorProcessing}
                onClose={snackbarCloseHandler}>
                <Alert severity="error">
                  Ocurrió un error al procesar la solicitud
                </Alert>
            </Snackbar>
        </>
    );
}

ErrorRequest.propTypes = {
    uiState: PropTypes.number,
    setUiState: PropTypes.func
};

export default ErrorRequest;
