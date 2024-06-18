import { HStack, Input, Button, useToast, Spinner } from '@chakra-ui/react'
import React, { useState } from 'react'

import { connect } from 'react-redux'
import { signIn } from '../actions'

const HeaderLoggedOut = props => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loginClicked, setLoginClicked] = useState(false)
    const toast = useToast()
    const onSubmitHandler = () => {
        setLoginClicked(true)
        props
            .signIn(username, password)
            .then(() => {})
            .catch(() => {
                toast({
                    title: 'Invalid Username or Password',
                    status: 'error',
                    duration: 4000,
                    isClosable: true,
                })
                setLoginClicked(false)
            })
    }

    return (
        <HStack>
            <HStack spacing={'2'}>
                <Input
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    borderColor={'teal'}
                    _hover={{ opacity: 1 }}
                    size={'sm'}
                    type={'text'}
                    autoComplete={'off'}
                    placeholder={'Username'}
                />
                <Input
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    borderColor={'teal'}
                    _hover={{ opacity: 1 }}
                    size={'sm'}
                    type={'password'}
                    autoComplete={'off'}
                    placeholder={'Password'}
                />
            </HStack>
            {loginClicked ? (
                <Spinner />
            ) : (
                <Button
                    onClick={onSubmitHandler}
                    size={'sm'}
                    colorScheme={'teal'}
                >
                    Sign In
                </Button>
            )}
        </HStack>
    )
}

export default connect(null, { signIn })(HeaderLoggedOut)
