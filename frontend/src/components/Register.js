import React, { useState } from "react";
import { Link } from "react-router-dom";


function Register({ onRegister }) {
    const [state, setState] = useState({
        email: '',
        password: ''
    });

    function handleChange(e) {
        const { name, value } = e.target;
        setState({
            ...state,
            [name]: value
        });
    };

    function handleSubmit(e) {
        e.preventDefault();
        const { email, password } = state;
        if (!email || !password) return;

        onRegister(email, password)
            .catch((err) => console.log(err));
    };

    return (
        <>
            <form className="register" onSubmit={handleSubmit}>
                <h1 className="register__title">Регистрация</h1>
                <input
                    className="register__input"
                    placeholder="Email"
                    type="email"
                    name="email"
                    value={state.email}
                    onChange={handleChange}
                    minLength="2"
                    maxLength="40"
                    required>
                </input>
                <input
                    className="register__input"
                    placeholder="Пароль"
                    type="password"
                    name="password"
                    value={state.password}
                    onChange={handleChange}
                    minLength="2"
                    maxLength="20"
                    required>
                </input>
                <button className="register__link" type="submit" >Зарегистрироваться</button>
            </form>
            <Link to="/signin" className="register__signin">Уже зарегистрированы? Войти</Link>

        </>
    )
}

export default Register;