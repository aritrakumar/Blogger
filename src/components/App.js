import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import { Box } from '@chakra-ui/react'
import CreatePost from './CreatePost'
import Error from './Error'
import GuestHome from './GuestHome'
import Header from './Header'
import Profile from './Profile'
import SignUp from './SignUp'
import ViewPost from './ViewPost'
import HomeController from './HomeController'
import EditPost from './EditPost'

import history from '../history'

const App = () => {
    return (
        <Box w={'100%'} minH={'100vh'} bg={'gray.100'}>
            <Router history={history}>
                <>
                    <Header />
                    <Switch>
                        <Route
                            exact
                            path="/profile/:username"
                            component={Profile}
                        />
                        <Route
                            exact
                            path="/profile/:username/*"
                            component={Profile}
                        />
                        <Route exact path="/" component={HomeController} />
                        <Route exact path="/post/:id" component={ViewPost} />
                        <Route path="/post/:id/edit" component={EditPost} />
                        <Route
                            exact
                            path="/create-post"
                            component={CreatePost}
                        />

                        <Route exact path="*" component={Error} />
                    </Switch>
                </>
            </Router>
        </Box>
    )
}

export default App
