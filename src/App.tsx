import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import HomePage from './pages/home';
import Login from './pages/login';
import List from './pages/list';
import RentList from './pages/rentlist';
import Order from './pages/order';
import Contract from './pages/contract';
import ContractList from './pages/contract/Contractlist';
import ContractDetail from './pages/contract/ContractDetail';
import Header from './components/Header';
import { useEffect, useState } from 'react';
import Loading from './components/Loader';
import Footer from './components/Footer';
import WishList from './pages/wishlists';
import User from './pages/user';
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
          <Route path="/user">
            <Header />
            <User />
          </Route>
          <Route path="/wishlist">
            <Header />
            <WishList />
          </Route>
          <Route path="/list">
           
            <List />
          </Route>
          <Route path="/rentlist">
            <Header />
            <RentList />
          </Route>
          <Route path="/order">
            <Header />
            <Order />
          </Route>
          <Route path="/contract/:id">
            <Header />
            <ContractDetail />
          </Route>
          <Route path="/contractlist">
            <Header />
            <ContractList />
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
