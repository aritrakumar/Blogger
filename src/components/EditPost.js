import React, { useState, useEffect } from 'react'
import { Flex, Input, Textarea, Text, Button, useToast } from '@chakra-ui/react'
import { connect } from 'react-redux'
import { fetchSinglePost, editSinglePost } from '../actions'

const EditPost = props => {
    const postid = props.match.params.id
    const { fetchSinglePost, editSinglePost } = props
    const { PostInfo } = props

    const toast = useToast()
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')

    useEffect(() => {
        fetchSinglePost(postid)
    }, [postid, fetchSinglePost])

    useEffect(() => {
        if (Object.keys(PostInfo).length !== 0) {
            setTitle(PostInfo.title)
            setBody(PostInfo.body)
        }
    }, [PostInfo])

    const onSubmitHandler = () => {
        /*props.createPost(title, body).then(() => {
            toast({
                title: 'Post created.',
                status: 'success',
                duration: 4000,
                isClosable: true,
            })
        })*/
        editSinglePost(postid, title, body).then(() => {
            toast({
                title: 'Post edited.',
                status: 'success',
                duration: 4000,
                isClosable: true,
            })
        })
        console.log('Editing post')
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

const mapStateToProps = state => {
    return { PostInfo: state.singlePostDetails }
}

export default connect(mapStateToProps, { fetchSinglePost, editSinglePost })(
    EditPost
)
