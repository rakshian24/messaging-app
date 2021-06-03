import { Container } from 'react-bootstrap';
import './styles/main.scss';
import { Switch, BrowserRouter } from 'react-router-dom';
import DynamicRoute from './components/DynamicRoute';
import Home from './components/Home';
import SignUp from './components/SignUp';
import Login from './components/Login';
import ApolloProvider from './ApolloProvider';

const App = () => {
  return (
    <ApolloProvider>
      <Container>
        <BrowserRouter>
          <Switch>
            <DynamicRoute exact path="/" component={Home} authenticated />
            <DynamicRoute exact path="/signup" component={SignUp} noAuth />
            <DynamicRoute exact path="/login" component={Login} noAuth />
          </Switch>
        </BrowserRouter>
      </Container>
    </ApolloProvider>
  );
};

export default App;
