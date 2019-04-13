import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './index.css';
import App from './components/App/App.js';
import registerServiceWorker from './registerServiceWorker';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';

// gets all projects from server
function* getProjectsSaga ( action ) {
    try {
        const getProjectsResponse = yield axios.get( '/projects' )
        console.log(`got projects from saga, woot!`, getProjectsResponse);
        yield put({ type: 'SET_PROJECTS', payload: getProjectsResponse.data })
    }
    catch ( error ) {
        console.log(`error in getProjectsSaga`, error);
    }
}

// gets all tags from server
function* getTagsSaga ( action ) {
    try {
        const getTagsResponse = yield axios.get( '/projects/tags' )
        console.log(`got tags from saga, woot!`, getTagsResponse);
        yield put({ type: 'SET_TAGS', payload: getTagsResponse.data})
    }
    catch (error) {
        console.log(`error in getTagsSaga`, error);
    }
}

// sends new project data to server
function* addProjectSaga ( action ) {
    try {
        const addProjectResponse = yield axios.post( '/projects', action.payload );
        console.log(`posted tags from saga, woot!`, addProjectResponse);
        yield put({ type: 'GET_PROJECTS' });
    }
    catch (error) {
        console.log(`error in addProjectSaga`, error);
        
    }
}

// send project id for delete to server
function* deleteProjectSaga ( action ) {
    try{
        const deleteProjectResponse = yield axios.delete(`/projects/${action.payload}`)
        console.log( `deleted project from saga, woot!`, deleteProjectResponse );
        yield put({ type: 'GET_PROJECTS' });
    }
    catch( error ) {
        console.log(`error in deleteProjectSaga`, error);
        
    }

}

// Create the rootSaga generator function
function* rootSaga() {
    yield takeEvery( 'GET_PROJECTS', getProjectsSaga );
    yield takeEvery( 'GET_TAGS', getTagsSaga );
    yield takeEvery( 'ADD_PROJECT', addProjectSaga );
    yield takeEvery( 'DELETE_PROJECT', deleteProjectSaga );
}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Used to store projects returned from the server
const projects = (state = [], action) => {
    switch (action.type) {
        case 'SET_PROJECTS':
            return action.payload;
        default:
            return state;
    }
}

// Used to store the project tags (e.g. 'React', 'jQuery', 'Angular', 'Node.js')
const tags = (state = [], action) => {
    switch (action.type) {
        case 'SET_TAGS':
            return action.payload;
        default:
            return state;
    }
}

// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        projects,
        tags,
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(<Provider store={storeInstance}><App /></Provider>, 
    document.getElementById('root'));
registerServiceWorker();
