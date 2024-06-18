import { Box, Heading, Text, Flex } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchFeed } from '../actions'

const EmptyHome = () => {
    return (
        <Box pt={'5rem'}>
            <Heading textAlign={'center'}>Your feed is empty</Heading>
            <Text textAlign={'center'}>
                Try using the search to find some articles
            </Text>
        </Box>
    )
}

const ShowFeed = ({ Feed }) => {
    return (
        <Flex alignItems={'center'} flexDirection={'column'} gap={'1rem'}>
            <Text fontWeight={'medium'}>
                The Latest posts from the users that you follows
            </Text>
            <Flex direction={'column'} alignItems={'center'} gap={'1rem'}>
                {Feed.map(post => {
                    if (post.title.length >= 22)
                        post.title = post.title.slice(0, 20) + '...'
                    const date = new Date(post.createdDate)
                    const dateString = `${date.getDate()}/${
                        date.getMonth() + 1
                    }/${date.getFullYear()}`

                    return (
                        <Link key={post._id} to={`/post/${post._id}`}>
                            <Box
                                minW={'lg'}
                                bg={'gray.100'}
                                borderRadius={'md'}
                                px={'1rem'}
                                pb={'1rem'}
                                _hover={{ bg: 'gray.200' }}
                                border={'1px'}
                                borderColor={'gray.300'}
                            >
                                <Heading fontWeight={'bold'}>
                                    {post.title}
                                </Heading>
                                <Text>{post.author.username}</Text>
                                <Text fontWeight={'light'}>{dateString}</Text>
                            </Box>
                        </Link>
                    )
                })}
            </Flex>
        </Flex>
    )
}

const Home = props => {
    const { fetchFeed, Feed } = props
    useEffect(() => {
        console.log('Fetch feed useEffect ran')
        fetchFeed()
    }, [fetchFeed])

    return <>{Feed.length ? <ShowFeed Feed={Feed} /> : <EmptyHome />}</>
}

const mapStateToProps = state => {
    return { Feed: state.feed }
}

export default connect(mapStateToProps, { fetchFeed })(Home)
