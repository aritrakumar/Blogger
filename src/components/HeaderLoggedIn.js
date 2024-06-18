import React, { useEffect, useState } from 'react'
import {
    Button,
    HStack,
    Link as ChakraLink,
    Avatar,
    useDisclosure,
    Flex,
    Input,
    Text,
    Box,
    useToast,
} from '@chakra-ui/react'
import { Modal, ModalOverlay, ModalContent, ModalBody } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { SearchIcon } from '@chakra-ui/icons'
import { AiOutlineUser } from 'react-icons/ai'

import { connect } from 'react-redux'
import { signOut } from '../actions'
import { BASE_URL } from '../constants'
import axios from 'axios'

function SearchModal(props) {
    /*
        we can make this as a separate component and then we can connect the redux state with this component as well 
        lets try it tomorrow
    
    */

    const { isOpen, onOpen, onClose } = props
    const [posts, setPosts] = useState([])
    const [term, setTerm] = useState('')
    const [finalterm, setFinalterm] = useState()

    useEffect(() => {
        const termid = setTimeout(() => {
            setFinalterm(term)
        }, 1000)

        return () => clearTimeout(termid)
    }, [term])

    useEffect(() => {
        if (!finalterm) {
            setPosts([])
            return
        }
        if (finalterm) {
            async function fetchResults() {
                try {
                    const response = await axios.post(BASE_URL + '/search', {
                        searchTerm: finalterm,
                    })
                    setPosts(response.data)
                } catch (e) {
                    console.log('prolem')
                }
            }
            fetchResults()
        }

        return () => setPosts([]) && setFinalterm('')
    }, [finalterm])

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <HStack
                        py={'1rem'}
                        px={'1rem'}
                        spacing={'5px'}
                        justifyContent={'space-between'}
                    >
                        <Input
                            value={term}
                            onChange={e => setTerm(e.target.value)}
                            placeholder={'Search articles'}
                        />
                    </HStack>
                    {/* <ModalCloseButton /> */}

                    {posts.length ? (
                        <ModalBody pb={'1rem'}>
                            <Flex direction={'column'}>
                                {posts.map(post => {
                                    return (
                                        <Link
                                            key={post._id}
                                            to={`/post/${post._id}`}
                                            onClick={onClose}
                                        >
                                            <Box
                                                p={'2'}
                                                _hover={{ bg: 'gray.100' }}
                                                borderRadius={'md'}
                                            >
                                                <Text fontWeight={'bold'}>
                                                    {post.title}
                                                </Text>
                                                <Text>
                                                    {post.author.username}
                                                </Text>
                                            </Box>
                                        </Link>
                                    )
                                })}
                            </Flex>
                        </ModalBody>
                    ) : null}
                </ModalContent>
            </Modal>
        </>
    )
}

const HeaderLoggedIn = props => {
    const toast = useToast()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const signOutHandler = () => {
        props.signOut().then(() => {
            toast({
                title: 'Successfully logged out',
                status: 'success',
                duration: 4000,
                isClosable: true,
            })
        })
    }
    return (
        <HStack spacing={'2'} alignItems={'center'}>
            <SearchIcon _hover={{ cursor: 'pointer' }} onClick={onOpen} />
            <SearchModal isOpen={isOpen} onOpe={onOpen} onClose={onClose} />
            <ChakraLink as={Link} to={`/profile/${props.Username}`}>
                <Avatar w={'8'} h={'8'} icon={<AiOutlineUser />} />
            </ChakraLink>
            <ChakraLink
                style={{ textDecoration: 'none' }}
                as={Link}
                to={'/create-post'}
            >
                <Button size={'sm'} colorScheme={'teal'}>
                    Create Post
                </Button>
            </ChakraLink>

            <Button onClick={signOutHandler} size={'sm'} colorScheme={'red'}>
                Log Out
            </Button>
        </HStack>
    )
}

const mapStateToProps = state => {
    return { Token: state.auth.Token, Username: state.auth.Username }
}
export default connect(mapStateToProps, { signOut })(HeaderLoggedIn)
