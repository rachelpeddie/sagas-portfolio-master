import React, { Component } from 'react';
import { connect } from 'react-redux';

class Admin extends Component {

    componentDidMount = () => {
        this.props.dispatch({ type: 'GET_PROJECTS' })
    }
}

const mapReduxStateToProps = reduxState => ({
    reduxState,
})

export default connect(mapReduxStateToProps)(Admin);