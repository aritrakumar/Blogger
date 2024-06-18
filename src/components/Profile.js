import React, { useEffect } from 'react'
import { Route, Router, Switch } from 'react-router-dom'
import history from '../history'
import {
    Box,
    Button,
    Flex,
    Icon,
    Text,
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    Link as ChakraLink,
} from '@chakra-ui/react'
import { AiOutlineUser } from 'react-icons/ai'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchProfileInfo, followUser, unfollowUser } from '../actions'
import ViewPost from './ViewPost'
import ProfilePosts from './ProfilePosts'
import ProfileFollowers from './ProfileFollowers'
import ProfileFollowing from './ProfileFollowing'

const Profile = props => {
    const username = props.match.params.username
    const { fetchProfileInfo, followUser, unfollowUser } = props
    console.log('Username from URL', username)

    console.log('Tab index', props.TabIndex)

    useEffect(() => {
        fetchProfileInfo(username)
        console.log('useEffect ran inside the fetch user data')
    }, [username, fetchProfileInfo])

    const followUnfollowHandler = () => {
        if (props.ProfileInfo.isFollowing === true) {
            unfollowUser(username)
        } else {
            followUser(username)
        }
    }

    const displayFollowButton = () => {
        if (props.MyUsername === props.ProfileInfo.profileUsername) return null
        if (props.ProfileInfo.isFollowing === true) {
            return (
                <Button
                    onClick={followUnfollowHandler}
                    size={'sm'}
                    colorScheme={'teal'}
                >
                    Unfollow
                </Button>
            )
        } else {
            return (
                <Button
                    onClick={followUnfollowHandler}
                    size={'sm'}
                    colorScheme={'teal'}
                >
                    Follow
                </Button>
            )
        }
    }

    return (
        <Flex alignItems={'center'} mt={'20'} flexDirection={'column'}>
            <Flex alignItems={'center'} gap={'5'}>
                <Icon as={AiOutlineUser} />
                <Text>{props.ProfileInfo.profileUsername}</Text>
                {props.LoggedIn && displayFollowButton()}
            </Flex>
            <Box mt={'1rem'}>
                <Tabs index={props.TabIndex} size={'lg'}>
                    <TabList>
                        <Tab>
                            <ChakraLink
                                as={NavLink}
                                to={`/profile/${username}`}
                            >
                                Posts
                            </ChakraLink>
                        </Tab>
                        <Tab>
                            <ChakraLink
                                as={NavLink}
                                to={`/profile/${username}/followers`}
                            >
                                Followers
                            </ChakraLink>
                        </Tab>
                        <Tab>
                            <ChakraLink
                                as={NavLink}
                                to={`/profile/${username}/following`}
                            >
                                Following
                            </ChakraLink>
                        </Tab>
                    </TabList>
                </Tabs>
            </Box>
            <Router history={history}>
                <Route
                    exact
                    path="/profile/:username"
                    component={ProfilePosts}
                />
                <Route
                    exact
                    path="/profile/:username/followers"
                    component={ProfileFollowers}
                />
                <Route
                    exact
                    path="/profile/:username/following"
                    component={ProfileFollowing}
                />
            </Router>
        </Flex>
    )
}

const mapStateToProps = state => {
    return {
        ProfileInfo: state.profileInfo,
        TabIndex: state.tabIndex.index,
        MyUsername: state.auth.Username,
        LoggedIn: state.auth.LoggedIn,
    }
}
export default connect(mapStateToProps, {
    fetchProfileInfo,
    followUser,
    unfollowUser,
})(Profile)
