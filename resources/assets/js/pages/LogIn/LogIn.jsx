import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { SubmissionError } from 'redux-form'

import { logIn } from 'store/action-creators/session'

import LogInForm from './LogInForm'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Avatar from '@material-ui/core/Avatar'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh'
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}))

export const LogInComponent = props => {
  const { attemptLogin } = props
  const classes = useStyles()

  return (
    <Grid container component="main" className={classes.root}>
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} elevation={6}>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <LogInForm onSubmit={attemptLogin} />
        </div>
      </Grid>
    </Grid>
  )
}

const parseValidationFromResponse = response => {
  let errors = {}
  if (
    response.errors === true &&
    response.message === 'Incorrect login details'
  ) {
    errors.email = 'Incorrect login details'
  }

  return errors
}

const mapDispatchToProps = dispatch => ({
  attemptLogin: async loginDetails => {
    try {
      await dispatch(logIn(loginDetails))
      dispatch(push('/'))
    } catch (error) {
      throw new SubmissionError(
        parseValidationFromResponse(error.response.data)
      )
    }
  }
})

export default connect(
  null,
  mapDispatchToProps
)(LogInComponent)
