import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import AuthLayout from "layouts/Auth.js";
import AdminLayout from "layouts/Admin.js";
import { useSelector, useDispatch } from "react-redux";
import { reAuth } from "reduce/authReduce";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem("token") !== "") {
      dispatch(reAuth());
    }
  }, []);

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return (
    <>
      <Switch>
        <Route
          path="/admin"
          render={(props) =>
            isAuthenticated ? (
              <AdminLayout {...props} />
            ) : (
              <Redirect to="/auth/login" />
            )
          }
        />
        <Route
          path="/auth"
          render={(props) =>
            !isAuthenticated ? (
              <AuthLayout {...props} />
            ) : (
              <Redirect to="/admin/dashboard" />
            )
          }
        />
        <Redirect from="/" to="/auth/login" />
      </Switch>
    </>
  );
}

export default App;
