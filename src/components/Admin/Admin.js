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

    componentDidMount = () => {
        this.props.dispatch({ type: 'GET_PROJECTS' });
        this.props.dispatch({ type: 'GET_TAGS' });
    }

    handleChangeFor = propertyName => event => {
        this.setState({
            newProject: {
                ...this.state.newProject,
                [propertyName]: event.target.value
            }
        })
    }

    handleSubmit = ( event ) => {
        event.preventDefault();
        this.props.dispatch({ type: 'ADD_PROJECT', payload: this.state.newProject })
    }

    render(){
        return(
            <div>
                <pre>{JSON.stringify(this.state)}</pre>
                <form>
                    <input type="text" placeholder="Name" required onChange={this.handleChangeFor('name')} />
                    <input type="date" name="completed" onChange={this.handleChangeFor('description')} />
                    <select onChange={this.handleChangeFor('tag_id')}>
                        <option defaultValue="select" selected disabled>Select a Tag</option>
                        {this.props.reduxState.tags.map( tag => 
                            <option value={tag.id}>{tag.name}</option>
                            )}
                        {/* <option value="1">React</option>
                        <option value="5">Redux</option>
                        <option value="2">jQuery</option>
                        <option value="3">Node</option>
                        <option value="4">SQL</option>
                        <option value="6">HTML</option> */}
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
                    {this.props.reduxState.projects.map( project => 
                        <tr key={project.id}>
                            <td>{project.name}</td>
                            <td><button>Delete Project</button></td>
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