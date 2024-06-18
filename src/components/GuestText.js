import { Box, Heading, Text } from '@chakra-ui/react'
import React from 'react'

const GuestText = () => {
    return (
        <Box>
            <Heading>Remember Writing?</Heading>
            <Text mt={'2'}>
                Are you sick of short tweets and impersonal “shared” posts that
                are reminiscent of the late 90’s email forwards? We believe
                getting back to actually writing is the key to enjoying the
                internet again.
            </Text>
        </Box>
    )
}

export default GuestText
