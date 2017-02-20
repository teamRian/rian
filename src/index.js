import React from 'react';
import { render } from 'react-dom';
import Root from './containers/Root';
import configureStore from './store/configureStore'

import './index.css';

// configs in './configureStore.js'
const store = configureStore() 

render(
  <Root store={store} />,
  document.getElementById('root')
);
	