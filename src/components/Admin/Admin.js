import React, { Component } from 'react';
import { connect } from 'react-redux';

class Admin extends Component {

    componentDidMount = () => {
        this.props.dispatch({ type: 'GET_PROJECTS' })
    }
    render(){
        return(
            <div>
                <form>
                    <input type="text" placeholder="Name" />
                    <input type="date" name="completed" />
                    <select>
                        <option defaultValue="select" disabled>Select a Tag</option>
                        <option value="react">React</option>
                        <option value="redux">Redux</option>
                        <option value="jquery">jQuery</option>
                        <option value="node">Node</option>
                        <option value="sql">SQL</option>
                        <option value="html">HTML</option>
                    </select>
                    <input type="url" placeholder="GitHub URL" />
                    <input type="url" placeholder="Website URL (optional)" />
                    <textarea type="text" rows="6" cols="36" placeholder="Description"></textarea>

                </form>
                <table>
                    <thead>
                        <tr>
                            <th>Project Title</th>
                            <th></th>
                        </tr>
                        </thead>
                    <tbody>
                    {/* {this.props.reduxState.map( project => 
                        <tr key={project.id}>
                            <td>{project.name}</td>
                            <td><button>Delete Project</button></td>
                        </tr>
                    )} */}
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