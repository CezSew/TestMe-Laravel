import React from 'react';
import { Link } from 'react-router-dom';
// import { NeutralButton } from 'components'
// import { ModalConsumer } from 'contexts'
import SideMenu from '../../components/Menu/SideMenu';

const OverviewComponent = (props) => {
    console.log(props.state.options)
    console.log(props.generateNewTest)
    return (
        <main className="main">
            <SideMenu changeAppStep = {props.changeAppStep} state = {props.state} handleChoosetest = {props.generateNewTest} />
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
            </div>
        </main>
    );
};

export default OverviewComponent;
