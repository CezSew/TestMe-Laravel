import React from 'react';
import Answers from './Answers/Answers';
import { withRouter } from 'react-router-dom';
import Title from '../../Title';
import Error from '../Error/Error';
// import PropTypes from 'prop-types';

const Question = (props) => {
    console.log('props');
    console.log(props);

    let current = props.state.question.currentQuestionNumber;
    let question = Object.entries(props.state.question.data).length !== 0 ? props.state.question.data[current] : false;

    let renderContents = question
        ? (<React.Fragment>
            <Title text={question.question}/>
            <Answers handleAnswer={props.handleAnswer} state={props.state} utils={props.utils} />
            {props.state.repeat ? (<p className="random">Random questions enabled</p>) : '' }
        </React.Fragment>)
        : <Error error="Sorry, it seems there are no questions loaded!" />;
    return (
        <section className="question">
            {renderContents}
        </section>
    );
};

// Question.propTypes = {
//     state: PropTypes.object.isRequired
// };

export default withRouter(Question);
