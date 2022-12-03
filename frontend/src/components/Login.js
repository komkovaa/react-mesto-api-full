import React, { useState } from "react";

function Login({ onLogin }) {
    const [state, setState] = useState({
        email: '',
        password: '',
    });

    function handleChange(e) {
        const { name, value } = e.target;
        setState({
            ...state,
            [name]: value
        })
    }

   
    function handleSubmit(e) {
        e.preventDefault();
        const { email, password } = state;

        if (!email || !password) return;

        onLogin(email, password)
        .catch((err) => console.log(err));
    };

    return (
        <form className="login" onSubmit={handleSubmit}>
            <h1 className="login__title">Вход</h1>
            <input
                className="login__input"
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
                className="login__input"
                placeholder="Пароль"
                type="password"
                name="password"
                value={state.password}
                onChange={handleChange}
                minLength="2"
                maxLength="20"
                required>
            </input>
            <button className="login__link" type="submit" >Войти</button>
        </form>
    )
}

export default Login;