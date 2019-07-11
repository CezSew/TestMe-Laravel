import React from 'react'

export const Menu = () => (
  <nav className="header__nav">
    <ul className="header__menu">
        <li className="header__list-item">
          <a href="/login">zaloguj się</a>
        </li>
        <li className="header__list-item">
          <a href="/signup">zarejestruj się</a>
        </li>
    </ul>
  </nav>
)
