import React, { Component } from 'react';
import { connect } from 'react-redux';

// material ui styles
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    description: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 400,
    },
    menu: {
        width: 200,
    },
});

class Admin extends Component {

    state = {
        newProject: {
            name: '',
            description: '',
            thumbnail: '',
            github: '',
            website: '',
            date: '',
            tag_id: '',
        }
    }

    // dispatch on component mount to trigger getProjectsSaga and getTagsSaga
    componentDidMount = () => {
        this.props.dispatch({ type: 'GET_PROJECTS' });
        this.props.dispatch({ type: 'GET_TAGS' });
    }

    // sets component state from input values on form
    handleChangeFor = propertyName => event => {
        this.setState({
            newProject: {
                ...this.state.newProject,
                [propertyName]: event.target.value
            }
        })
    }

    // dispatches new project data to addProjectSaga on click
    handleSubmit = ( event ) => {
        event.preventDefault();
        this.props.dispatch({ type: 'ADD_PROJECT', payload: this.state.newProject })
    }

    // dispatches project id to deleteProjectSaga on click
    handleDelete = (event) => {
        this.props.dispatch({ type: 'DELETE_PROJECT', payload: event.target.value })
    }

    // function to return to projects page on click
    pageChange = () => {
        this.props.history.push('/');
    }

    render(){
        const { classes } = this.props;
        return(
            
            <div>
                {/* <pre>{JSON.stringify(this.state)}</pre> */}
                <button onClick={this.pageChange}>Project Page</button>
                <form className={classes.container} noValidate>
                    {/* <input type="text" placeholder="Name" required onChange={this.handleChangeFor('name')} /> */}
                    <TextField
                        id="standard-with-placeholder"
                        label="Project Name"
                        type="text"
                        placeholder="Name"
                        className={classes.textField}
                        margin="normal"
                        required
                        onChange={this.handleChangeFor('name')}
                    />
                    <TextField
                        id="date"
                        label="Date Completed"
                        type="date"
                        defaultValue="mm/dd/yyyy"
                        onChange={this.handleChangeFor('date')}
                        className={classes.textField}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        margin="normal"
                    />
                    {/* <select onChange={this.handleChangeFor('tag_id')}>
                        <option defaultValue="select" selected disabled>Select a Tag</option>
                        {/* maps through tags reducer to display all tag options for dropdown */}
                        {/* {this.props.reduxState.tags.map( (tag, i) => 
                            <MenuItem value={tag.id} key={i}>{tag.name}</MenuItem>
                            )}
                    </select> */}

                    <TextField
                        id="standard-select"
                        select
                        label="Select"
                        className={classes.textField}
                        value={this.state.tag_id}
                        onChange={this.handleChangeFor('tag_id')}
                        SelectProps={{
                            MenuProps: {
                                className: classes.menu,
                            },
                        }}
                        helperText="Please select your project tag"
                        margin="normal"
                    >
                        {this.props.reduxState.tags.map((tag, i) =>
                            <MenuItem value={tag.id} key={i}>{tag.name}</MenuItem>
                        )}
                    </TextField>

                    {/* <input type="url" placeholder="Image URL" required onChange={this.handleChangeFor('thumbnail')} /> */}
                    <TextField
                        id="standard-with-placeholder"
                        label="Project Thumbnail"
                        type="url"
                        placeholder="Image Url"
                        className={classes.textField}
                        margin="normal"
                        required
                        onChange={this.handleChangeFor('thumbnail')}
                    />
                    {/* <input type="url" placeholder="GitHub URL" required onChange={this.handleChangeFor('github')}/> */}
                    <TextField
                        id="standard-with-placeholder"
                        label="Github"
                        type="url"
                        placeholder="GitHub URL"
                        className={classes.textField}
                        margin="normal"
                        required
                        onChange={this.handleChangeFor('github')}
                    />
                    {/* <input type="url" placeholder="Website URL" required onChange={this.handleChangeFor('website')} /> */}
                    <TextField
                        id="standard-with-placeholder"
                        label="Project Website"
                        type="url"
                        placeholder="Website URL"
                        className={classes.textField}
                        margin="normal"
                        required
                        onChange={this.handleChangeFor('website')}
                    />
                    {/* <textarea type="text" rows="6" cols="36" placeholder="Description" required onChange={this.handleChangeFor('description')}/> */}

                    <TextField
                        id="outlined-multiline-flexible"
                        label="Description"
                        multiline
                        rowsMax="8"
                        value={this.state.description}
                        onChange={this.handleChangeFor('description')}
                        className={classes.description}
                        margin="normal"
                        variant="outlined"
                        required
                    />
                    <button type="submit" onClick={this.handleSubmit}>Add Project</button>
                </form>
                <table>
                    <thead>
                        <tr>
                            <th>Project Title</th>
                            <th></th>
                        </tr>
                        </thead>
                    <tbody>
                        {/* maps through projects reducer to display all project names in table with delete button */}
                    {this.props.reduxState.projects.map( (project, i) => 
                        <tr key={i}>
                            <td>{project.name}</td>
                            <td><button onClick={this.handleDelete} value={project.id}>Delete Project</button></td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        )
    }
}

const mapReduxStateToProps = reduxState => ({
    reduxState,
})

Admin.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapReduxStateToProps)(withStyles(styles)(Admin));