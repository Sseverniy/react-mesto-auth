import React from 'react';
import logo from '../images/logo.svg';
import {Route, Link, Switch, Redirect} from 'react-router-dom';

function Header({userData, loggedIn, onSignOut}){
  // const [buttonText, setButtonText] = React.useState('');

  // function setButtonName() {
  //   if(pathName === '/mesto-react' ){
  //     setButtonText('Выйти');
  //   } else if(pathName === '/sign-in'){
  //     setButtonText('Регистрация');
  //   } else {
  //     setButtonText('Войти');
  //   }
  // }
  // const history= useHistory();

  // React.useEffect(() => {
  //   if(loggedIn) {
  //     history.push("/mesto-react");
  //   }
  // }, [loggedIn])


  return (
    <header className="header">
      <img className="logo" src={logo} alt="Логотип Место" />
      <div className="header__auth">
          <Switch>
            <Route path="/mesto-react">
              <p className="header__user-email">{userData.email}</p>
              <Link to="/sign-in" className="header__auth-button" onClick={onSignOut}>
                  Выйти
              </Link>
            </Route>
            <Route path="/sign-in">
              <Link to="/sign-up" className="header__auth-button">
                Регистрация
              </Link>
            </Route>
            <Route path="/sign-up">
              <Link to="/sign-in" className="header__auth-button">
                Авторизация
              </Link>
            </Route>
            <Route path="/">
              {loggedIn ? (
                <Redirect to="/mesto-react" />
              ) : (
                <Redirect to="/sign-in" />
              )}
            </Route>
          </Switch>
      </div>
    </header>
  );
  // return (
  //   <header className="header">
  //     <img className="logo" src={logo} alt="Логотип Место"/>
  //     <div className="header__auth">
  //       { loggedIn ? <p className="header__user-email">{userData.email}</p> : ''}
  //       <button className="header__auth-button" onClick={onSignOut}>{buttonText}</button>
  //     </div>
  //   </header>
  // )
}

export default Header;