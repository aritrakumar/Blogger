import React, { useState, useEffect } from 'react'
import { Box, Input, Button, Text, useToast } from '@chakra-ui/react'

import { USERNAME_VALID, PASSWORD_VALID, EMAIL_VALID } from '../actions/types'

import { connect, useDispatch } from 'react-redux'
import { signUp } from '../actions'
import { checkUsername, checkEmail } from '../actions/signupForm'

const SignUp = props => {
    const toast = useToast()
    const { checkUsername, checkEmail, SignUpValidation } = props
    const { usernameExists, emailExists } = SignUpValidation
    const dispatch = useDispatch()

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [finalusername, setFinalusername] = useState()
    const [finalemail, setFinalemail] = useState()

    const [usernameInputHelper, setUsernameInputHelper] = useState('')
    const [emailInputHelper, setEmailInputHelper] = useState('')
    const [passwordInputHelper, setPasswordInputHelper] = useState('')

    useEffect(() => {
        if (password.length === 0) {
            setPasswordInputHelper('')
            dispatch({
                type: PASSWORD_VALID,
                payload: false,
            })
            return
        }
        if (password.length < 12) {
            setPasswordInputHelper('Password must be 12 characters long')
            dispatch({
                type: PASSWORD_VALID,
                payload: false,
            })
            return
        }
        dispatch({
            type: PASSWORD_VALID,
            payload: true,
        })
        setPasswordInputHelper('')
    }, [password, dispatch])

    useEffect(() => {
        if (username.length === 0) {
            setUsernameInputHelper('')
            dispatch({
                type: USERNAME_VALID,
                payload: false,
            })
            return
        }
        if (username.length < 8) {
            setUsernameInputHelper('Usernmae must be 8 characters long')
            dispatch({
                type: USERNAME_VALID,
                payload: false,
            })
        } else if (usernameExists) {
            setUsernameInputHelper('Username has been taken')
            dispatch({
                type: USERNAME_VALID,
                payload: false,
            })
        } else {
            setUsernameInputHelper('')
        }
        dispatch({
            type: USERNAME_VALID,
            payload: true,
        })
    }, [username, usernameExists, dispatch])

    useEffect(() => {
        if (email.length === 0) {
            setEmailInputHelper('')
            dispatch({
                type: EMAIL_VALID,
                payload: false,
            })
            return
        }
        if (emailExists) {
            setEmailInputHelper('Email address already taken')
            dispatch({
                type: EMAIL_VALID,
                payload: false,
            })
        } else if (
            !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
        ) {
            setEmailInputHelper('You must provide a valid email')
            dispatch({
                type: EMAIL_VALID,
                payload: false,
            })
        } else {
            setEmailInputHelper('')
        }
        dispatch({
            type: EMAIL_VALID,
            payload: true,
        })
    }, [emailExists, email, dispatch])

    useEffect(() => {
        const usernameId = setTimeout(() => {
            setFinalusername(username)
        }, 1000)

        return () => clearTimeout(usernameId)
    }, [username])

    useEffect(() => {
        const emailId = setTimeout(() => {
            setFinalemail(email)
        }, 1000)

        return () => clearTimeout(emailId)
    }, [email])

    useEffect(() => {
        if (finalusername) {
            // make network request to check if username already exist
            console.log('Checking if usernmae exists')
            checkUsername(finalusername)
        }
    }, [finalusername, checkUsername])

    useEffect(() => {
        if (finalemail) {
            // make network request to check if email already exist
            console.log('Checking if email exists')
            checkEmail(finalemail)
        }
    }, [finalemail, checkEmail])

    const signUpHandler = () => {
        let {
            usernameExists,
            emailExists,
            usernameValid,
            emailValid,
            passwordValid,
        } = SignUpValidation
        if (
            !usernameExists &&
            !emailExists &&
            password &&
            usernameValid &&
            emailValid &&
            passwordValid
        ) {
            props.signUp(finalusername, finalemail, password).then(() => {
                toast({
                    title: 'Welcome to Bloggler',
                    status: 'success',
                    duration: 4000,
                    isClosable: true,
                })
            })
        } else {
            toast({
                title: 'Something went wrong',
                status: 'error',
                duration: 4000,
                isClosable: true,
            })
        }
    }

    return (
        <Box maxW={'300px'}>
            <Box>
                <Text>Username</Text>
                <Input
                    key={'1'}
                    value={username}
                    onChange={e => setUsername(e.target.value.toLowerCase())}
                    borderColor={'teal'}
                    type="text"
                    placeholder={'Choose your username'}
                />
                <Text>{usernameInputHelper}</Text>
                <Text>Email</Text>
                <Input
                    key={'2'}
                    value={email}
                    onChange={e => setEmail(e.target.value.toLowerCase())}
                    borderColor={'teal'}
                    type="email"
                    placeholder={'jhon@doe.com'}
                />
                <Text>{emailInputHelper}</Text>
                <Text>Password</Text>
                <Input
                    key={'3'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    borderColor={'teal'}
                    type="password"
                    placeholder={'Create a new password'}
                />
                <Text>{passwordInputHelper}</Text>
                <Button
                    mt={'1rem'}
                    onClick={signUpHandler}
                    w={'full'}
                    colorScheme={'teal'}
                >
                    Sign Up
                </Button>
            </Box>
        </Box>
    )
}

const mapStateToProps = state => {
    return { SignUpValidation: state.signUpValidation }
}

export default connect(mapStateToProps, { signUp, checkEmail, checkUsername })(
    SignUp
)
