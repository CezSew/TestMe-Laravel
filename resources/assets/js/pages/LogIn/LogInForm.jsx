import React from 'react';
import { Link } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';

import { PasswordFormLine, TextFormLine, NeutralButton } from 'components';
import { email as emailRegex } from 'constants/regexes';
import { linkStyle } from 'constants/styles';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import styled from 'styled-components';

const validateLogin = values => {
    let errors = {};

    if (!values.email) {
        errors.email = 'This field is required';
    } else if (!emailRegex.test(values.email)) {
        errors.email = 'Invalid email address';
    }

    if (!values.password) {
        errors.password = 'This field is required';
    }

    return errors;
}

const ButtonsContainer = styled.div`
  margin-top: 30px;
  display: flex;
`;

const ButtonWrapper = styled.div`
  margin-right: 30px;
`;

const CenterWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;
`;

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

const LoginForm = props => {
    const { handleSubmit } = props;

    return (
        <form onSubmit={handleSubmit} className="form form--login">
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
            <div className="flex items-center">
                <CenterWrapper>
                    <ButtonsContainer>
                        <ButtonWrapper>
                            <Button variant="contained" color="primary" type="submit">
                              Log In
                            </Button>
                        </ButtonWrapper>
                        <ButtonWrapper>
                            <Button variant="outlined" href="/signup">
                              Or Signup
                            </Button>
                        </ButtonWrapper>
                        <Button variant="outlined" href="/forgot-password">
                            Forgot Password?
                        </Button>
                    </ButtonsContainer>
                </CenterWrapper>
            </div>
        </form>
    );
};

export default reduxForm({
    form: 'login',
    validate: validateLogin
})(LoginForm);
