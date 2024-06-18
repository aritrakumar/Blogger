import React from 'react'
import { connect } from 'react-redux'
import GuestHome from './GuestHome'
import Home from './Home'

const HomeController = props => {
    return <>{props.Token ? <Home /> : <GuestHome />}</>
}

const mapStateToProps = state => {
    return { Token: state.auth.Token, Username: state.auth.Username }
}

export default connect(mapStateToProps, {})(HomeController)
