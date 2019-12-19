import React from 'react';
import { Link } from 'react-router-dom';
// import { NeutralButton } from 'components';
// import { ModalConsumer } from 'contexts';
// import SideMenu from '../../components/Menu/SideMenu';

const OverviewComponent = (props) => {
    return (
        <main className="main">
            <div className="container">
                <div className="app">
                  That's the main <br/><br/>
                    <p>Sprawdź nasze quizy!</p>
                    <Link
                        to={{
                            pathname: '/tests'
                        }}>
                    Wybierz test
                    </Link>
                </div>
            </div>
            {/* <SideMenu changeAppStep = {props.changeAppStep} state = {props.state} handleChoosetest = {props.generateNewTest} />
            <div className="container">
                <div className="app">
                    <Link
                        to={{
                            pathname: '/question',
                            utils: {...props.utils},
                            handleAnswer: props.handleAnswer,
                            state: {...props.state}
                        }}>
                            Zobacz pytanie
                    </Link>
                    <br/>
                    <Link
                        to={{
                            pathname: '/choose-test',
                            availableTests: {...props.state.options},
                            handleChoosetest: props.generateNewTest
                        }}>
                        Wybierz test
                    </Link>
                </div>
            </div> */}
        </main>
    );
};

export default OverviewComponent;
