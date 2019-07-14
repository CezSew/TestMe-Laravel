import React from 'react'

import { Card, CardContent } from 'components'
import Typography from '@material-ui/core/Typography'
import styled from 'styled-components'
import Container from '@material-ui/core/Container'

const TitleWrapper = styled.div`
  margin-top: 100px;
  margin-bottom: 30px;
`

export const FormPageLayout = props => (

  <Card className="max-w-md mt-20 mx-auto">
    <CardContent>
      <Container component="main" maxWidth="xs">
        {props.title
          ? (
            <TitleWrapper>
              <Typography variant="h3" component="h1">
                {props.title}
              </Typography>
            </TitleWrapper>
          )
          : (
            null
          )}
      </Container>
      {props.children}
    </CardContent>
  </Card>

)
