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

function* getProjectsSaga ( action ) {
    try {
        const getProjectsResponse = yield axios.get( '/projects' )
        console.log(`got projects from saga, woot!`, getProjectsResponse);
        yield put({ type: 'SET_PROJECTS', payload: getProjectsResponse.data })
        console.log(`sent 'SET_PROJECTS' action`); 
    }
    catch ( error ) {
        console.log(`error in getProjectsSaga`, error);
    }
}

function* getTagsSaga ( action ) {
    try {
        const getTagsResponse = yield axios.get( '/projects/tags' )
        console.log(`got tags from saga, woot!`, getTagsResponse);
        yield put({ type: 'SET_TAGS', payload: getTagsResponse.data})
        console.log(`sent 'SET_TAGS' action`);
    }
    catch (error) {
        console.log(`error in getTagsSaga`, error);
    }
}

function* addProjectSaga ( action ) {
    try {
        const addProjectResponse = yield axios.post( '/projects', action.payload );
        console.log(`posted tags from saga, woot!`, addProjectResponse);
        yield put({ type: 'GET_PROJECTS' });
        console.log(`send 'GET_PROJECTS' action`);
    }
    catch (error) {
        console.log(`error in addProjectSaga`);
        
    }
}

// Create the rootSaga generator function
function* rootSaga() {
    yield takeEvery( 'GET_PROJECTS', getProjectsSaga );
    yield takeEvery( 'GET_TAGS', getTagsSaga );
    yield takeEvery( 'ADD_PROJECT', addProjectSaga)
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
