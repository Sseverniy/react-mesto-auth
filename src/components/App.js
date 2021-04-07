import React from "react";
import { Route, Switch, Redirect, BrowserRouter } from "react-router-dom";
import Header from "./Header.js";
import Login from "./Login.js";
import Register from "./Register.js";
import ProtectedRoute from "./ProtectedRoute.js";

function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);

  return (
    <div className="App page">
      <Header />
      <BrowserRouter>
        <Switch>
          <Route path="/sign-up">
            <Register />
          </Route>
          <Route path="/sign-in">
            <Login />
          </Route>
          <ProtectedRoute
            exact
            path="/"
            loggedIn={loggedIn}
            // component={}
          />
          <Route path="/">
            {loggedIn ? (
              <Redirect to="/mesto-react" />
            ) : (
              <Redirect to="/sign-in" />
            )}
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
