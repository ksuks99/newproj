import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function LoginPage() {

  const afterSubmit = (event) => {
    event.preventDefault();
    console.log("Submit login form");
  }

  return (
    <Form onSubmit={afterSubmit}>
      <Form.Group className="mb-3" controlId="formBasicLogin">
        <Form.Label>Имя пользователя</Form.Label>
        <Form.Control type="text" placeholder="Введите логин"></Form.Control>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Пароль</Form.Label>
        <Form.Control type="password" placeholder="Введите пароль"></Form.Control>
      </Form.Group>
      <Button variant="primary" type="submit">Войти</Button>
    </Form>
  )
}