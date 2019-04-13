import React, { Component } from 'react';
import { connect } from 'react-redux';

class Projects extends Component {

    // dispatch on component mount to trigger getProjectsSaga
    componentDidMount = () => {
        this.props.dispatch({ type: 'GET_PROJECTS' })
    }

    render(){
        return(
            <div>
                {/* maps through projects reducer and displays each project on dom*/}
                {this.props.reduxState.projects.map(project =>
                    <section key={project.id}>
                        <h3>{project.name}</h3>
                        <img src={project.thumbnail} alt={project.name}></img>
                        <a href={project.github}>GitHub</a>
                        <a href={project.website}>Website</a>
                        <p>{project.tag_id}</p>
                        <p>{project.description}</p>
                    </section >
                )}
            </div>
        )
    }
}

const mapReduxStateToProps = reduxState => ({
    reduxState,
})

export default connect(mapReduxStateToProps)(Projects);