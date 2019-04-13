import React, { Component } from 'react';
import { connect } from 'react-redux';

class Admin extends Component {

    state = {
        newProject: {
            name: '',
            description: '',
            thumbnail: '',
            github: '',
            website: '',
            date: '',
            tag_id: ''
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
        return(
            <div>
                <button onClick={this.pageChange}>Project Page</button>
                <form>
                    <input type="text" placeholder="Name" required onChange={this.handleChangeFor('name')} />
                    <input type="date" name="completed" onChange={this.handleChangeFor('description')} />
                    <select onChange={this.handleChangeFor('tag_id')}>
                        <option defaultValue="select" selected disabled>Select a Tag</option>
                        {/* maps through tags reducer to display all tag options for dropdown */}
                        {this.props.reduxState.tags.map( (tag, i) => 
                            <option value={tag.id} key={i}>{tag.name}</option>
                            )}
                    </select>
                    <input type="url" placeholder="Image URL" required onChange={this.handleChangeFor('thumbnail')} />
                    <input type="url" placeholder="GitHub URL" required onChange={this.handleChangeFor('github')}/>
                    <input type="url" placeholder="Website URL" required onChange={this.handleChangeFor('website')} />
                    <textarea type="text" rows="6" cols="36" placeholder="Description" required onChange={this.handleChangeFor('description')}/>
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

export default connect(mapReduxStateToProps)(Admin);