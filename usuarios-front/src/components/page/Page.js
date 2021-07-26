import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const Page = ({ title, goBackLink, children }) => {

  const history = useHistory();

  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          {goBackLink &&
          <IconButton
            color="inherit"
            edge="start"
            onClick={() => history.replace('/')}>
            <ArrowBackIcon />
          </IconButton>}
          <Box flexGrow={1}>
            <Typography variant="h6">
              {title} 
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
      <Container>
        <Box my={3}>
          {children}
        </Box>
      </Container>
    </>
  );
};

Page.propTypes = {
  children: PropTypes.node.isRequired,
  goBackLink: PropTypes.bool,
  title: PropTypes.string.isRequired
};

export default Page;
