import { Box, Flex, Heading, Link, Text, Icon } from '@chakra-ui/react'
import { BsExclamationTriangle } from 'react-icons/bs'
import React from 'react'

const Error = () => {
    return (
        <Flex h={'100vh'} alignItems={'center'} justifyContent={'center'}>
            <Box display={'flex'} flexDirection={'column'}>
                <Icon
                    alignSelf={'center'}
                    as={BsExclamationTriangle}
                    w={'50px'}
                    h={'50px'}
                />
                <Heading>This page is not available</Heading>
                <Text mt={'2'} textAlign={'center'}>
                    Try visiting <Link>homepage</Link> to get a fresh start
                </Text>
            </Box>
        </Flex>
    )
}

export default Error
