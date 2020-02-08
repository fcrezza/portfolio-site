import React from 'react'
import styled from 'styled-components'
import axios from 'axios'
import PropTypes from 'prop-types'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import {object, string} from 'yup'
import {BlockButton} from './Button'
import {getThemeValue} from '../utils/ThemeContext'
import color from '../utils/colorSchemes'
import toRem from '../utils/toRem'
import mobile, {phone} from '../utils/mobile'
import isLight from '../utils/isLight'
import encode from '../utils/encode'

const Wrapper = styled.section`
  background: ${({theme}) =>
    isLight(theme) ? color.common.smoothWhite : color.dark.darkGrey};
  padding: ${toRem(80)} ${toRem(90)};
  display: flex;
  justify-content: space-between;
  transition: background 0.4s;
  ${mobile({padding: `${toRem(30)} ${toRem(50)}`, flexDirection: 'column'})}
  ${phone({padding: `${toRem(30)} ${toRem(30)}`})}
`

const Left = styled.div`
  h1 {
    color: ${({theme}) =>
      isLight(theme) ? color.light.dark : color.dark.white};
    margin: 0;
    font-size: ${toRem(53)};
    ${mobile({fontSize: toRem(40)})}
  }

  h2 {
    color: ${({theme}) =>
      isLight(theme) ? color.light.smoothDark : color.dark.smoothWhite};
    margin: 0;
    font-weight: 400;
    font-size: ${toRem(38)};
    margin-bottom: ${toRem(26)};
    ${mobile({fontSize: toRem(30), marginBottom: 23})}
  }
`

const Right = styled.div`
  max-width: ${toRem(500)};
  width: 100%;
  ${mobile({margin: `${toRem(35)} 0`, maxWidth: '100%'})}

  form {
    padding: ${toRem(35)};
    background: ${({theme}) =>
      isLight(theme) ? color.common.lightWhite : color.dark.dark};
    display: flex;
    flex-direction: column;
    transition: background 0.4s;
  }

  input[type='email'],
  textarea {
    background: ${color.common.smoothWhite};
    padding: ${toRem(14)};
    outline: none;
    font-family: 'Cuprum', sans-serif;
    font-size: ${toRem(20)};
    color: ${color.common.lowDark};
    border: 0;
    margin-bottom: ${toRem(10)};
    width: 100%;
  }

  textarea {
    min-height: ${toRem(230)};
    resize: vertical;
  }
`

const ErrorMsg = styled.p`
  color: #f5587b;
  margin: 0 0 ${toRem(15)};
`

const CustomErrorMessage = ({name}) => (
  <ErrorMsg>
    <ErrorMessage name={name} />
  </ErrorMsg>
)

CustomErrorMessage.propTypes = {
  name: PropTypes.string.isRequired,
}

const Contact = ({handleSetType, toggleModal}) => {
  const theme = getThemeValue()

  return (
    <>
      <Wrapper id="contact" theme={theme}>
        <Left theme={theme}>
          <h2>Want to make your beautiful website?</h2>
          <h1>Send a message to me!</h1>
        </Left>
        <Right theme={theme}>
          <Formik
            initialValues={{email: '', message: ''}}
            validationSchema={object({
              email: string()
                .email('please enter a valid email')
                .required('field must be filled in'),
              message: string().required('field must be filled in'),
            })}
            validateOnChange={false}
            validateOnBlur={false}
            onSubmit={({email, message}, {setSubmitting, resetForm}) => {
              setSubmitting(true)
              resetForm()
              axios
                .post('/', encode({'form-name': 'contact', email, message}), {
                  headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                  },
                })
                .then(() => {
                  setSubmitting(false)
                  toggleModal()
                  handleSetType('success')
                })
                .catch(() => {
                  setSubmitting(false)
                  toggleModal()
                  handleSetType('error')
                })
            }}
          >
            {({isSubmitting}) => {
              return (
                <Form name="contact" data-netlify="true">
                  <input type="hidden" name="form-name" value="contact" />
                  <Field name="email" type="email" placeholder="Your email" />
                  <CustomErrorMessage name="email" />
                  <Field
                    name="message"
                    as="textarea"
                    placeholder="Enter your message here"
                  />
                  <CustomErrorMessage name="message" />
                  <BlockButton type="submit">
                    {isSubmitting ? 'Sending message...' : 'Send'}
                  </BlockButton>
                </Form>
              )
            }}
          </Formik>
        </Right>
      </Wrapper>
    </>
  )
}

export default Contact

Contact.propTypes = {
  handleSetType: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired,
}
