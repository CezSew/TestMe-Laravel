import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const SideMenu = ({changeAppStep, state, handleChoosetest}) => {
    const handleButtonClick = (e) => {
        const step = e.target.dataset.step;
        changeAppStep(step);
    };
    return (
        <nav className="menu">
            <ul>
                <li className="menu__item">
                    <a href="/" onClick={handleButtonClick} data-step="start" className="menu__button">
                        Default
                    </a>
                </li>
                <li className="menu__item">
                    <Link className="menu__button" onClick={handleButtonClick} data-step="load"
                        to={{
                            pathname: '/load-questions'
                        }}>
                            Load questions
                    </Link>
                </li>
                <li className="menu__item">
                    <Link
                        to={{
                            pathname: '/choose-test',
                            availableTests: {...state.options},
                            handleChoosetest: handleChoosetest
                        }}>
                          Wybierz test
                    </Link>
                </li>
                <li className="menu__item">
                    <button className="menu__button">Mode: Explorer</button>
                </li>
                <li className="menu__item">
                    <a href="/about" onClick={handleButtonClick} data-step="about" className="menu__button">
                        About
                    </a>
                </li>
            </ul>
        </nav>
    );
};

SideMenu.propTypes = {
    changeAppStep: PropTypes.func.isRequired
};

export default SideMenu;
