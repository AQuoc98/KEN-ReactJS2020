//lib
import React, { useEffect } from "react";
import { Router } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import NProgress from "nprogress";
import 'nprogress/nprogress.css'
import { useBeforeunload } from 'react-beforeunload';


//components
import { Div } from "@Common/TagAntdNotSupport/TagAntdNotSupport";
import AppRouter from "@Utils/AppRoute/AppRoute";
//config
import i18next from "@Configs/i18n/i18n";
import history from "@Configs/history"

//style
import "./app.scss";
import "@StyleSheets/nprogress.scss"
//const
//store
import { Provider } from 'react-redux';
import storeConfig from './reduxs/store';
import { PersistGate } from 'redux-persist/integration/react'
import DefaultThemeProvider from './theme';
const { store, persistor } = storeConfig()
export default function App() {
  useEffect(() => {

  }, [])
  // useBeforeunload((event:any) => event.preventDefault());
  return (
    <Div className="app">
      <DefaultThemeProvider>
      <I18nextProvider i18n={i18next}>
        <Router history={history}>
          <React.Suspense fallback={<div className="fallback" />}>
            <Provider store={store}>
              <PersistGate loading={null} persistor={persistor}>
                <AppRouter />
              </PersistGate>
            </Provider>
          </React.Suspense>
        </Router>
      </I18nextProvider>
      </DefaultThemeProvider>
    </Div>
  );
}
