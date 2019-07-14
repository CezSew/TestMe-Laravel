import React from 'react'

import { Card, CardContent } from 'components'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import styled from 'styled-components'

const Wrapper = styled.div`
  margin-top: 100px;
`

export const FormPageLayout = props => (
  <Wrapper>
    <Container component="main" maxWidth="xs" className="jss1">
      <Card className="max-w-md mt-20 mx-auto">
        <CardContent>
          <Typography variant="h3" component="h1">
            {props.title}
          </Typography>
          {props.children}
        </CardContent>
      </Card>
    </Container>
  </Wrapper>
)
