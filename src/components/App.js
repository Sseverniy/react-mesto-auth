import React from "react";
import { Route, Switch, Redirect} from 'react-router-dom';
import Header from "./Header.js";


function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);

  return (
      <div className="App page">
        <Header />
        <Switch>
          <Route path="/sign-up">
            <Register/>
          </Route>
          <Route path="/sign-in">
            <Login/>
          </Route>
          <Route path="/">
            {loggedIn ? <Redirect to="/mesto-react" /> : <Redirect to="/sign-in" />}
          </Route>          
        </Switch>
      </div>
  );
}

export default App;
