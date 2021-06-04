import { Button } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import React, { useEffect } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import productApi from './api/productApi';
import Header from './components/Header';
import HomePage from './components/HomePage';
import NotFound from './components/NotFound';
import AlbumFeature from './features/Album';
import CounterFeature from './features/Counter';
import ProductFeature from './features/Product';
import TodoFeature from './features/Todo';

function App() {

  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path="/todos" component={TodoFeature} />
        <Route path="/albums" component={AlbumFeature} />
        <Route path="/counter" component={CounterFeature} />
        <Route path="/products" component={ProductFeature} />
        <Route path="/" component={HomePage} exact />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
