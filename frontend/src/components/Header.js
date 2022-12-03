import React from 'react';
import logo from '../images/Logo.svg';
import { Link, Route } from "react-router-dom";

function Header(props) {
  return (
    <header className="header">
      <img className="logo" src={logo} alt="логотип" />

      <Route exact path="/">
        <ul className='header__links'>
          <li className='header__auth'>{props.email}</li>
          <li><Link to="/signin" className="header__link" onClick={props.onLogout}>Выйти</Link></li>
        </ul>
      </Route>

      <Route path="/signup">
        <Link to="/signin" className="header__link">Войти</Link>
      </Route>

      <Route path="/signin">
        <Link to="/signup" className="header__link">Регистрация</Link>
      </Route>

    </header>
  );
}

export default Header;