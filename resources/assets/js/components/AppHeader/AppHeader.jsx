import React from 'react';
import { Logo, Menu, UserCard } from 'components';

export const AppHeader = props => (
    <header className="header">
        <div className="container">
            <Logo />
            <Menu />
            <UserCard className="ml-auto" colorTheme="light" />
        </div>
    </header>
);
