import React from "react";
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div>
      <h1>Домашняя страница</h1>
        <div className="container">
          <ul>
            <li className="nav-item">
              <Link to="/login">Войти</Link>
            </li>
            {/* <li className="nav-item">
              <Link to="/register">Создать аккаунт</Link>
            </li> */}
            <li className="nav-item">
              <Link to="/notes">Редактировать заметки</Link>
            </li>
          </ul>
        </div>
    </div>
  )
}
