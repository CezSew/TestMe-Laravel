import React from 'react';
import { reduxForm, Field } from 'redux-form';

import { email as emailRegex } from 'constants/regexes';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import styled from 'styled-components';

const ButtonsContainer = styled.div`
  margin-top: 30px;
  display: flex;
`;

const ButtonWrapper = styled.div`
  margin-right: 30px;
`;

const validateSignUp = values => {
    let errors = {};

    if (!values.first_name) {
        errors.first_name = 'This field is required';
    }

    if (!values.last_name) {
        errors.last_name = 'This field is required';
    }

    if (!values.email) {
        errors.email = 'This field is required';
    } else if (!emailRegex.test(values.email)) {
        errors.email = 'Invalid email address';
    }

    if (!values.password) {
        errors.password = 'This field is required';
    }

    return errors;
};

const SignUpForm = props => {
    const { handleSubmit } = props;

    const renderTextField = ({
        input,
        meta: { touched, error },
        ...custom
    }) => (
        <TextField
            {...input}
            {...custom}
        />
    );

    return (
        <form onSubmit={handleSubmit}>

            <div>
                <Field
                    name="first_name"
                    component={renderTextField}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="first_name"
                    label="First Name"
                    name="first_name"
                    autoFocus
                />
            </div>

            <div>
                <Field
                    name="last_name"
                    component={renderTextField}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="last_name"
                    label="Last Name"
                    name="last_name"
                />
            </div>

            <div>
                <Field
                    name="email"
                    component={renderTextField}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                />
            </div>

            <div>
                <Field
                    name="password"
                    component={renderTextField}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="password"
                    label="Password"
                    name="password"
                />
            </div>

            <ButtonsContainer>
                <ButtonWrapper>
                    <Button variant="contained" color="primary" type="submit">
                      Sign In
                    </Button>
                </ButtonWrapper>
                <Button href="/login">
                  Or Login
                </Button>
            </ButtonsContainer>
        </form>
    );
};

export default reduxForm({
    form: 'signup',
    validate: validateSignUp
})(SignUpForm);
