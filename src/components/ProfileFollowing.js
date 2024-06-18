import { Box, HStack, Avatar, Text, VStack } from '@chakra-ui/react'
import { AiOutlineUser } from 'react-icons/ai'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchProfileFollowings, tabChange } from '../actions'

const Following = ({ username }) => {
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

const ProfileFollowing = props => {
    const username = props.match.params.username
    const { fetchProfileFollowings, tabChange } = props

    useEffect(() => {
        tabChange(2)
    }, [tabChange])

    useEffect(() => {
        fetchProfileFollowings(username)
    }, [fetchProfileFollowings, username])
    return (
        <VStack gap={'2'} mt={'1'}>
            {props.ProfileFollowings.map((following, index) => {
                return <Following key={index} username={following.username} />
            })}
        </VStack>
    )
}

const mapStateToProps = state => {
    return { ProfileFollowings: state.profileFollowings }
}
export default connect(mapStateToProps, { fetchProfileFollowings, tabChange })(
    ProfileFollowing
)
