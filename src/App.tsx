import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import HomePage from './pages/home';
import Login from './pages/login';
import List from './pages/list';
import ListingInfo from './pages/list/listinginfo';
import Header from './components/Header';
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Header />
          <HomePage />
        </Route>
        <Route path="/list">
          <Header />
          <List />
        </Route>
        <Route path="/login" component={Login} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
