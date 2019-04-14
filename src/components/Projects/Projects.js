import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProjectCard from '../ProjectCard/ProjectCard';
import './Project.css'
// material ui
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    mainGrid: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
});

class Projects extends Component {

    // dispatch on component mount to trigger getProjectsSaga
    componentDidMount = () => {
        this.props.dispatch({ type: 'GET_PROJECTS' })
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Grid container spacing={24} className={classes.mainGrid} >
                {/* maps through projects reducer and displays each project on dom*/}
                {this.props.reduxState.projects.map(project =>

                        <Grid item xs={4} key={project.id}>
                            <ProjectCard project={project} />
                        </Grid>

                )}
                </Grid>
            </div>
        )
    }
}

Projects.propTypes = {
    classes: PropTypes.object.isRequired,
};


const mapReduxStateToProps = reduxState => ({
    reduxState,
})
export default connect(mapReduxStateToProps)(withStyles(styles)(Projects));