import { Button } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import React, { useEffect } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import productApi from './api/productApi';
import Header from './components/Header';
import NotFound from './components/NotFound';
import AlbumFeature from './features/Album';
import CounterFeature from './features/Counter';
import TodoFeature from './features/Todo';

function App() {
  useEffect(() => {
    const fetchProducts = async () => {
      const params = {
        _limit: 10,
      };
      const productList = await productApi.getAll(params);
      console.log(productList);
    };
    fetchProducts();
  }, []);



  return (
    <div className="App">
      <Header />


      <p>
        <Link to="/counter">Counter</Link>
      </p>
      <Switch>
        <Route path="/todos" component={TodoFeature} />
        <Route path="/albums" component={AlbumFeature} />
        <Route path="/counter" component={CounterFeature} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
