import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card from '../Card/Card';

class Projects extends Component {

    // dispatch on component mount to trigger getProjectsSaga
    componentDidMount = () => {
        this.props.dispatch({ type: 'GET_PROJECTS' })
    }

    render(){
        return(
            <div>
                {/* maps through projects reducer and displays each project on dom*/}
                <Card />
            </div>
        )
    }
}

export default connect(mapReduxStateToProps)(Projects);