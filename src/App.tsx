import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './pages/home';
import AboutPage from './pages/AboutPage';
import Login from './pages/login';
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/login" component={Login} />
      </Switch>
    </Router>
  );
}

export default App;
