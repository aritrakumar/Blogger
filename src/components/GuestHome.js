import { Box, Container, Flex } from '@chakra-ui/react'
import React from 'react'
import GuestText from './GuestText'
import SignUp from './SignUp'

const GuestHome = () => {
    return (
        <Box w={'100%'} h={'100%'}>
            <Container py={'5'}>
                <Flex
                    w={'100%'}
                    h={'100%'}
                    alignItems={'center'}
                    justifyContent={'center'}
                    gap={'5rem'}
                    mt={'4rem'}
                >
                    <Box minW={'550px'} flex={'2'}>
                        <GuestText />
                    </Box>
                    <Box minW={'300px'} flex={'1'}>
                        <SignUp />
                    </Box>
                </Flex>
            </Container>
        </Box>
    )
}
export default GuestHome
