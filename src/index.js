import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import MainView from './containers/MainView';
import registerServiceWorker from './registerServiceWorker';

import {Provider} from 'react-redux'
import store from './store'


ReactDOM.render(
	<Provider store={store}>
		<MainView />
	</Provider>, document.getElementById('root'));
registerServiceWorker();
