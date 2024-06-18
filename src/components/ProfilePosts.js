import { Avatar, Box, VStack, Text, HStack } from '@chakra-ui/react'
import { AiOutlineUser } from 'react-icons/ai'
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchProfilePosts, tabChange } from '../actions'
import { Link } from 'react-router-dom'

const Post = ({ title, date, _id }) => {
    const dateObj = new Date(date)
    const dateString = `${dateObj.getDate()}/${
        dateObj.getMonth() + 1
    }/${dateObj.getFullYear()}`

    const titleLen = title.length
    if (titleLen >= 28) title = title.slice(0, 28) + '...'

    return (
        <Link to={`/post/${_id}`}>
            <Box shadow={'md'} px={'1rem'} py={'0.5rem'} width={'350px'}>
                <HStack justifyContent={'space-between'}>
                    <Avatar icon={<AiOutlineUser />} />
                    <VStack>
                        <Text fontWeight={'semibold'}>{title}</Text>
                        <Text>{dateString}</Text>
                    </VStack>
                </HStack>
            </Box>
        </Link>
    )
}

const ProfilePosts = props => {
    const username = props.match.params.username
    const { fetchProfilePosts, tabChange } = props

    useEffect(() => {
        tabChange(0)
    }, [tabChange])

    useEffect(() => {
        fetchProfilePosts(username)
    }, [fetchProfilePosts, username])

    return (
        <VStack gap={'2'} mt={'1'}>
            {props.ProfilePosts.map(post => {
                return (
                    <Post
                        key={post._id}
                        title={post.title}
                        date={post.createdDate}
                        _id={post._id}
                    />
                )
            })}
        </VStack>
    )
}

const mapStateToProps = state => {
    return { ProfilePosts: state.profilePosts }
}
export default connect(mapStateToProps, { fetchProfilePosts, tabChange })(
    ProfilePosts
)
