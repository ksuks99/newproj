import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Axios from '../api/axios.js';
import AuthContext from '../context/AuthProvider';

const loginUrl = '/auth/login';

export default function LoginPage() {
  const { setAuth } = React.useContext(AuthContext);

  const userRef = React.useRef();
  const errRef = React.useRef();

  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errMsg, setErrMsg] = React.useState('');
  const [success, setSuccess] = React.useState(false);

  React.useEffect(() => {
    userRef.current.focus();
  }, []);

  React.useEffect(() => {
    setErrMsg('');
  }, [username, password]);

  const afterSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await Axios.post(loginUrl, { username, password });
        //{ withCredentials: true });
      console.log(response?.data);

      if (response.data.statusCode === 400) {
        setErrMsg('Неверный логин или пароль');
        return;
      }
      const accessToken = response?.data?.accessToken;

      // save all info in global context
      console.log({ username, password, accessToken });
      setAuth({ username, password, accessToken });
      setErrMsg('login');
      setUsername("");
      setPassword("");
      setSuccess(true);
    } catch (err) {
      if (!err?.response) {
        setErrMsg('Сервер не отвечает');
      } else if (err.response?.status === 400) {
        setErrMsg('Неверный логин или пароль');
      } else if (err.response?.status === 401) {
        setErrMsg('Ошибка авторизации 401');
      } else {
        setErrMsg('Не удалось войти в аккаунт');
      }
      errRef.current.focus();
    };
  }

  const renderForm = () => {
    return (
      <div>
      <h1> Вход в аккаунт </h1>
      <Form onSubmit={afterSubmit}>
        <Form.Group className="mb-3" controlId="formBasicLogin">
          <Form.Label >Имя пользователя</Form.Label>
          <Form.Control autoComplete="off" ref={userRef} type="text" placeholder="Введите логин" onChange={e => setUsername(e.target.value)} value={username} required></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Пароль</Form.Label>
          <Form.Control type="password" placeholder="Введите пароль" onChange={e => setPassword(e.target.value)} value={password} required></Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit">Войти</Button>
        <div ref={errRef} style={{ color: "red" }}>{errMsg}</div>
      </Form>
    </div>
    )
  }

  return (<>
      {success ?
      (<div>
        <div>Вы вошли в аккаунт</div>
        <Link to="/">Вернуться на домашнюю страницу</Link>
      </div>
      )
        : renderForm()
      }
    </>)
}