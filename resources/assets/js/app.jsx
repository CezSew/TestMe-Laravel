import React, { lazy, Suspense } from 'react';
import { Provider } from 'react-redux';
import { Route, Switch, withRouter, Link } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';

import { DashboardLayout, FormPageLayout } from 'layouts';
import { store, browserHistory } from 'store/create-store';

import Question from './components/Question/Question';
import Choose from './components/Choose/Choose';
import Load from './components/Load/Load';

import TestsHub from './components/TestsHub/TestsHub';

import * as utils from 'utils/index';

import {
    AuthGuard,
    FlashMessageRoot,
    ModalProviderWrapper,
    ModalRoot
} from 'components';

const LogIn = lazy(() => import('pages/LogIn/LogIn'));
const SignUp = lazy(() => import('pages/SignUp/SignUp'));
const Overview = lazy(() => import('pages/Overview/Overview'));
const PasswordReset = lazy(() => import('pages/PasswordReset/PasswordReset'));
const ForgotPassword = lazy(() => import('pages/ForgotPassword/ForgotPassword'));
const NotFound = lazy(() => import('pages/NotFound/NotFound'));
const SettingsRoutes = lazy(() => import('pages/Settings/SettingsRoutes'));

const withDashboard = ContentComponent => {
    return props => (
        <AuthGuard>
            <DashboardLayout>
                <ContentComponent {...props} />
            </DashboardLayout>
        </AuthGuard>
    );
};

const Loading = () => (
    <div className="loader flex h-screen items-center">
        <div className="loader__text w-screen text-3xl text-center text-grey">Wczytywanie...</div>
    </div>
);

const OverviewWithDashboard = withDashboard(Overview);
const SettingsWithDashboard = withDashboard(SettingsRoutes);
const TestsHubWithDashboard = withDashboard(TestsHub);

class App extends React.Component {
    constructor(props) {
        super(props);

        // const ModalExample = props => <div>{props.message}</div>
        const options = utils.getOptions();
        this.generateNewTest = this.generateNewTest.bind(this);

        this.state = {
            step: 'start',
            questionIndex: 0,
            question: {
                data: {},
                correctIndex: '',
                currentQuestionNumber: '',
                isTheAnswerCorrect: false
            },
            stats: [],
            randomModeStats: [],
            questionsCount: '',
            questionTimeout: 1500,
            options: options
        };
    }

    /**
      * Sets state values dependant on question
      */
    prepareQuestion () {
        let question = {...utils.getQuestions(this.state.question.data, this.state.chosenTest)};
        let currentQuestionNumber = this.state.question.currentQuestionNumber;
        let questionsCount = utils.getQuestionsCount(question);
        let questionNum = utils.setQuestionNumber(currentQuestionNumber, questionsCount);
        let step = utils.setStep(questionNum, currentQuestionNumber, questionsCount, this.state.stats);
        let repeat = false;

        if (this.state.repeat || (utils.areSomeAnswersIncorrect(this.state.stats) && utils.isLastQuestion(currentQuestionNumber, questionsCount))) {
            step = 'question';
            repeat = true;
            questionNum = utils.getRandomQuestionNumber(this.state.question.data, questionsCount, this.state.stats, currentQuestionNumber);
        }
        this.setState({
            step: step,
            question: { data: question, currentQuestionNumber: questionNum, correctIndex: question[questionNum].correct },
            questionsCount: questionsCount,
            chosenTest: 'test_test',
            repeat: repeat
        }, function() {
            step === 'finish'
                ? this.props.history.push('/summary')
                : this.props.history.push('/question');
        });
    }

    /**
     * Sets new state of application step
     * @param {string}
     */
    changeAppStep(step) {
        this.setState({step: step});
    }

    /**
     * Sets new state values regarding question
     * @param {string} testName
     */
    generateNewTest(testName) {
        let question = utils.loadQuestion(testName);
        let questionsCount = Object.keys(question).length;

        this.setState({
            step: 'question',
            question: { data: question, currentQuestionNumber: 1, correctIndex: question[1].correct },
            questionsCount: questionsCount,
            chosenTest: testName,
            stats: [],
            repeat: false
        }, function() {
            browserHistory.push('/question');
        });
    }

    /**
     * Sets a new state. After new state has been set, trigger new question render, after timeout.
     * @param {boolean} isCorrect
     */
    handleAnswer(isCorrect) {
        let currentNumber = this.state.question.currentQuestionNumber;
        let correctAnswersCount = utils.getCorrectAnswersCountOfQuestion(currentNumber - 1, this.state.stats);
        this.setState({
            stats: [...this.state.stats, [currentNumber, isCorrect, utils.setCorrectAnswersCountOfQuestion(correctAnswersCount, isCorrect)]]
        }, () => {
            setTimeout(() => {
                this.prepareQuestion();
            }, this.state.questionTimeout);
        });
    }

    /**
     * Handle click of the main button, displaying on the first view
     */
    handleButtonClick () {
        this.prepareQuestion();
    }
    render() {
        return (
            <Provider store={store}>
                <Suspense fallback={<Loading />}>
                    <FlashMessageRoot />
                    <ConnectedRouter history={browserHistory}>
                        <ModalProviderWrapper>
                            <ModalRoot />
                            <Switch>
                                <Route
                                    exact
                                    path="/login"
                                    render={() => (
                                        <FormPageLayout>
                                            <LogIn />
                                        </FormPageLayout>
                                    )}
                                />
                                <Route
                                    exact
                                    path="/signup"
                                    render={() => (
                                        <FormPageLayout title="Sign Up">
                                            <SignUp />
                                        </FormPageLayout>
                                    )}
                                />
                                <Route
                                    exact
                                    path="/forgot-password"
                                    render={() => (
                                        <FormPageLayout title="Forgot Password">
                                            <ForgotPassword />
                                        </FormPageLayout>
                                    )}
                                />
                                <Route
                                    exact
                                    path="/reset-password/:resetToken"
                                    render={() => (
                                        <FormPageLayout title="Reset Password">
                                            <PasswordReset />
                                        </FormPageLayout>
                                    )}
                                />
                                <Route
                                    exact
                                    path="/question"
                                    render={() => (
                                        <Question
                                            state={this.state}
                                            handleAnswer={this.handleAnswer}
                                            generateNewTest={this.generateNewTest}
                                            changeAppStep={this.changeAppStep}
                                            prepareQuestion={this.prepareQuestion}
                                            handleButtonClick={this.handleButtonClick}
                                            utils={utils}
                                        />
                                    )}
                                />

                                <Route
                                    exact
                                    path="/choose-test"
                                    render={() => (
                                        <Choose />
                                    )}
                                />

                                <Route path="/load-questions" exact render={ () =>
                                    <Load />
                                }/>
                                {/* Dashboard routes */}
                                <Route exact path="/"
                                    render={() => (
                                        <OverviewWithDashboard
                                            state={this.state}
                                            handleAnswer={this.handleAnswer}
                                            generateNewTest={this.generateNewTest}
                                            changeAppStep={this.changeAppStep}
                                            prepareQuestion={this.prepareQuestion}
                                            handleButtonClick={this.handleButtonClick}
                                            utils={utils}
                                        />
                                    )}/>
                                <Route
                                    exact
                                    path="/tests"
                                    render={() => (
                                        <TestsHubWithDashboard />
                                    )}
                                />
                                <Route path="/settings" component={SettingsWithDashboard} />
                                {/* 404 route */}
                                <Route path="*" exact={true} render={() => <NotFound />} />
                            </Switch>
                        </ModalProviderWrapper>
                    </ConnectedRouter>
                </Suspense>
            </Provider>
        );
    }
}

export default withRouter(App);
