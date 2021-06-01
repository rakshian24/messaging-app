import { Container } from 'react-bootstrap';
import './App.scss';
import { Switch, BrowserRouter } from 'react-router-dom';
import DynamicRoute from './components/DynamicRoute';
import Home from './components/Home';
import SignUp from './components/SignUp';
import Login from './components/Login';

const App = () => {
  return (
    <Container>
      <BrowserRouter>
        <Switch>
          <DynamicRoute exact path="/" component={Home} authenticated />
          <DynamicRoute exact path="/signup" component={SignUp} noAuth />
          <DynamicRoute exact path="/login" component={Login} noAuth />
        </Switch>
      </BrowserRouter>
    </Container>
  );
};

export default App;
