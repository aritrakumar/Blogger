import React, { useState } from 'react'
import { Flex, Input, Textarea, Text, Button, useToast } from '@chakra-ui/react'
import { connect } from 'react-redux'
import { createPost } from '../actions'

const CreatePost = props => {
    const toast = useToast()
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')

    const onSubmitHandler = () => {
        props.createPost(title, body).then(() => {
            toast({
                title: 'Post created.',
                status: 'success',
                duration: 4000,
                isClosable: true,
            })
        })
    }

    return (
        <Flex flexDirection={'column'} maxW={'1200px'} mx={'auto'} mt={'5'}>
            <Text>Title</Text>
            <Input
                value={title}
                onChange={e => setTitle(e.target.value)}
                borderColor={'teal'}
                size={'lg'}
            />
            <Text>Body Content</Text>
            <Textarea
                value={body}
                onChange={e => setBody(e.target.value)}
                borderColor={'teal'}
                h={'293px'}
                size={'lg'}
            />
            <Button onClick={onSubmitHandler} mt={'1rem'} colorScheme={'teal'}>
                Submit
            </Button>
        </Flex>
    )
}

export default connect(null, { createPost })(CreatePost)
