import React from 'react'
import { Box, Flex, Link as ChakraLink } from '@chakra-ui/react'
import { connect } from 'react-redux'
import HeaderLoggedIn from './HeaderLoggedIn'
import HeaderLoggedOut from './HeaderLoggedOut'
import { Link } from 'react-router-dom'

const Header = props => {
    return (
        <Flex maxW={'1200px'} bg={'gray.100'} mx={'auto'}>
            <Box
                py={'5'}
                w={'100%'}
                display={'flex'}
                justifyContent={'space-between'}
                alignItems={'center'}
            >
                <Box>
                    <ChakraLink as={Link} fontWeight={'semibold'} to={'/'}>
                        Bloggler
                    </ChakraLink>
                </Box>
                <Box display={'flex'} gap={'2'}>
                    {props.Token ? <HeaderLoggedIn /> : <HeaderLoggedOut />}
                </Box>
            </Box>
        </Flex>
    )
}
const mapStateToProps = state => {
    return { Token: state.auth.Token, Username: state.auth.Username }
}

export default connect(mapStateToProps, {})(Header)
