import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { PersistGate } from "redux-persist/lib/integration/react";
import AdminScreen from "../containers/Layout/AdminScreen";
import MainAdminScreen from "../containers/Layout/MainAdminScreen";
import UserScreen from "../containers/Layout/UserScreen";
import LoginScreen from "../containers/LoginScreen/LoginScreen";
import Notfound from "../containers/NotFoundScreen/NotFoundScreen";
import configStore from "../redux/configStore";

const { store, persistor } = configStore();

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter>
          <Switch>
            <Redirect
              exact
              from="/"
              to="/login"
              key={window.location.pathname}
            />
            <Route
              exact
              path="/login"
              component={LoginScreen}
              key={window.location.pathname}
            />
            <Route
              path="/admin"
              render={(props) => <AdminScreen {...props} />}
            />
            <Route path="/user" render={(props) => <UserScreen {...props} />} />
            <Route
              path="/MAdmin"
              render={(props) => <MainAdminScreen {...props} />}
            />
            <Route component={Notfound} />
          </Switch>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}
