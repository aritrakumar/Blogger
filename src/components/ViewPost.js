import React, { useEffect } from 'react'
import {
    Flex,
    Text,
    Heading,
    HStack,
    Icon,
    Link as ChakraLink,
    Button,
} from '@chakra-ui/react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
} from '@chakra-ui/react'

import { AiOutlineUser } from 'react-icons/ai'
import { EditIcon, DeleteIcon } from '@chakra-ui/icons'
import { Link } from 'react-router-dom'
import { fetchSinglePost, deleteSinglePost } from '../actions'
import { connect } from 'react-redux'

function DeleteModal(props) {
    const { isOpen, onOpen, onClose, deleteHandler } = props
    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Delete Post</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text>Are you sure you want to delete this post?</Text>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button onClick={deleteHandler} colorScheme={'red'}>
                            Delete
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

const ViewPost = props => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const postid = props.match.params.id
    const { fetchSinglePost, deleteSinglePost } = props
    const { PostInfo } = props
    console.log('From ViewPost : ', PostInfo)
    useEffect(() => {
        fetchSinglePost(postid)
    }, [postid, fetchSinglePost])

    const renderPost = () => {
        if (Object.keys(PostInfo).length !== 0) {
            const date = new Date(PostInfo.createdDate)
            const dateString = `${date.getDate()}/${
                date.getMonth() + 1
            }/${date.getFullYear()}`

            return (
                <Flex
                    flexDirection={'column'}
                    maxW={'1200px'}
                    mx={'auto'}
                    mt={'5'}
                    gap={'1rem'}
                >
                    <Heading>{PostInfo.title}</Heading>
                    <HStack justifyContent={'space-between'}>
                        <HStack>
                            <Icon as={AiOutlineUser} />
                            <Link to={`/profile/${PostInfo.author.username}`}>
                                <Text>{PostInfo.author.username}</Text>
                            </Link>

                            <Text>{dateString}</Text>
                        </HStack>
                        {props.PostInfo.author.username === props.MyUsername ? (
                            <HStack spacing={'.5rem'}>
                                <ChakraLink
                                    as={Link}
                                    to={`/post/${PostInfo._id}/edit`}
                                >
                                    <EditIcon />
                                </ChakraLink>
                                <ChakraLink>
                                    <DeleteIcon onClick={onOpen} />
                                    <DeleteModal
                                        isOpen={isOpen}
                                        onOpe={onOpen}
                                        onClose={onClose}
                                        deleteHandler={() => {
                                            deleteSinglePost(postid).then(
                                                () => {
                                                    onClose()
                                                }
                                            )
                                        }}
                                    />
                                </ChakraLink>
                            </HStack>
                        ) : null}
                    </HStack>

                    <Text>{PostInfo.body}</Text>
                </Flex>
            )
        }
        return <div>Loading...</div>
    }

    return <>{renderPost()}</>
}

const mapStateToProps = state => {
    return {
        PostInfo: state.singlePostDetails,
        MyUsername: state.auth.Username,
    }
}

export default connect(mapStateToProps, { fetchSinglePost, deleteSinglePost })(
    ViewPost
)
