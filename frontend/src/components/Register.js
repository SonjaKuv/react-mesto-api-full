import React from 'react';
import { Link } from 'react-router-dom';

function Register({ onRegister }) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    function handleSubmit(evt) {
        evt.preventDefault();
        onRegister(email, password);
    };

    return (
        <form className='authentication' onSubmit={handleSubmit}>
            <h1 className='authentication__title'>Регистрация</h1>
            <input name="email" type="email" className='authentication__input' placeholder='Email'
                value={email} onChange={({ target: { value } }) => setEmail(value)} />
            <input name="password" type="text" className='authentication__input' placeholder='Пароль'
                value={password} onChange={({ target: { value } }) => setPassword(value)} />
            <button type="submit" className='button authentication__button'>Зарегистрироваться</button>
            <p className='authentication__text'>Уже зарегистрированы? <Link to="/sign-in" className='authentication__link'>Войти</Link></p>
        </form>
    )
}

export default Register;