import React from 'react';
import logo from '../images/logo.svg';
import { Link, Route, Routes } from 'react-router-dom';

function Header({ email, onSignOut }) {
    return (
        <header className="header">
            <img className="header__logo" alt="Место" src={logo} />
            <Routes>
                <Route exact path="/" element={
                    <nav className="header__navbar hamburger-menu">
                        <input id="menu__toggle" type="checkbox" />
                        <label className="menu__btn" htmlFor="menu__toggle">
                            <span></span>
                        </label>
                        <ul className="menu__box">
                            <li><p className="header__email menu__item">{email}</p></li>
                            <li><a className="header__link menu__item" onClick={onSignOut}>Выйти</a></li>
                        </ul>
                    </nav>
                }>
                </Route>
                <Route path="/sign-up" element={
                    <nav className="header__navigation">
                        <Link className="header__link" to={"/sign-in"}>Войти</Link>
                    </nav>
                }>
                </Route>
                <Route path="/sign-in" element={
                    <nav className="header__navigation">
                        <Link className="header__link" to={"/sign-up"}>Регистрация</Link>
                    </nav>}>
                </Route>
            </Routes>
        </header>
    )
}

export default Header;