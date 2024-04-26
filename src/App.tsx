import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import HomePage from './pages/home';
import Login from './pages/login';
import List from './pages/list';
import Order from './pages/order';
import Contract from './pages/contract';
import Header from './components/Header';
import { useEffect, useState } from 'react';
import Loading from './components/Loader';
import Footer from './components/Footer';
function App() {
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const unlisten = window.addEventListener('popstate', function (event) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    });
    return unlisten;
  }, []);
  // 监听路由变化
  return (
    <BrowserRouter>
      {isLoading ? (
        <Loading />
      ) : (
        <Switch>
          <Route exact path="/">
            <Header />
            <HomePage />
          </Route>
          <Route path="/list">
            <Header />
            <List />
          </Route>
          <Route path="/order">
            <Header />
            <Order />
          </Route>
          <Route path="/contract">
            <Header />
            <Contract />
          </Route>
          <Route path="/login" component={Login} />
        </Switch>
      )}
      <Footer />
    </BrowserRouter>
  );
}

export default App;
