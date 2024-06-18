import { Box, HStack, Avatar, Text, VStack } from '@chakra-ui/react'
import { AiOutlineUser } from 'react-icons/ai'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchProfileFollowers, tabChange } from '../actions'

const Follower = ({ username }) => {
    return (
        <Link to={`/profile/${username}`}>
            <Box shadow={'md'} px={'1rem'} py={'0.5rem'} width={'350px'}>
                <HStack justifyContent={'space-between'}>
                    <Avatar icon={<AiOutlineUser />} />
                    <Text fontWeight={'semibold'}>{username}</Text>
                </HStack>
            </Box>
        </Link>
    )
}

const ProfileFollowers = props => {
    const username = props.match.params.username
    const { fetchProfileFollowers, tabChange } = props

    useEffect(() => {
        tabChange(1)
    }, [tabChange])

    useEffect(() => {
        fetchProfileFollowers(username)
    }, [fetchProfileFollowers, username])
    return (
        <VStack gap={'2'} mt={'1'}>
            {props.ProfileFollowers.map((follower, index) => {
                return <Follower key={index} username={follower.username} />
            })}
        </VStack>
    )
}

const mapStateToProps = state => {
    return { ProfileFollowers: state.profileFollowers }
}
export default connect(mapStateToProps, { fetchProfileFollowers, tabChange })(
    ProfileFollowers
)
