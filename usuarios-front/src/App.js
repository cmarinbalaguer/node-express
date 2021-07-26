import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import Home from "./components/home/Home";
import User from './components/User/User';
import CreateUser from './components/CreateUser/CreateUser';
import { UploadFile } from './components/uploadFile/UploadFile';

const routes = [
  {path: '/home', component: Home},
  {path:'/user/:userId', component: User},
  {path:'/create-user', component: CreateUser},
  {path:'/upload-file/:userId', component: UploadFile}
];

const App = () => (
  <Router>
    <Switch>
      {routes.map(r =>
        <Route key={r.path} {...r} />
      )}
      <Redirect
        exact
        path="/"
        to="/home" />
      </Switch>
  </Router>
)

export default App;
