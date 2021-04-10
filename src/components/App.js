import React from "react";
import {Route, Switch, Redirect, BrowserRouter, useHistory} from "react-router-dom";
import Header from "./Header.js";
import Login from "./Login.js";
import Page from "./Page.js";
import Register from "./Register.js";
import ProtectedRoute from "./ProtectedRoute.js";
import * as userAuth from "../utils/userAuth.js";

function App() {
  const [loggedIn, setLoggedIn] = React.useState({
    loggedIn: false
  });

  const [userData, setUserData] = React.useState({
    email:''
  });
  // const history = useHistory();

  function tokenCheck() {
    if (localStorage.getItem('jwt')) {
      let jwt = localStorage.getItem('jwt');
      console.log(jwt);

      userAuth.getData(jwt)
        .then((res) => {
          if(res) {
            setLoggedIn(true);
            setUserData(res.data.email);
          }
          // history.push('/mesto-react');
          
        }
        
      )
      .catch((err) => console.log(err));
      
    }
  }

  function handlelogin() {
    setLoggedIn(true);
  }

  function handleSignOut() {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
  }

  React.useEffect(() => {
    tokenCheck();
  }, []);

  React.useEffect(() => {
    console.log(userData)
  }, [userData])

  return (
    <div className="App page">
      <Header
        loggedIn={loggedIn}
        userData={userData}
        onSignOut={handleSignOut}
      />
      <BrowserRouter>
        <Switch>
          <Route path="/sign-up">
            <Register />
          </Route>
          <Route path="/sign-in">
            <Login onLogin={handlelogin} loggedIn={loggedIn}/>
          </Route>
          <ProtectedRoute
            exact
            path="/mesto-react"
            loggedIn={loggedIn}
            component={Page}
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
