import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Routing from './Pages/Routing' ;
import {BrowserRouter} from 'react-router-dom'
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux' ;
import {createStore} from 'redux' ;
import Reducer from './Reducers/Reducer' ;
import ParaPage from './Pages/ParaPage' ;
import Container from './Pages/Container' ;

const store = createStore(Reducer) ;
ReactDOM.render(<Provider store={store} ><BrowserRouter><Container /></BrowserRouter></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
