import React from 'react';
import { render } from 'react-dom';
import Root from './containers/Root';
import configureStore from './store/configureStore'


import { AppContainer } from 'react-hot-loader';
import './index.css';

// configs in './configureStore.js'
const store = configureStore() 
console.log("FIRST STORE", store.getState())

render(
	<AppContainer>
  	<Root store={store} />
  </AppContainer>,
  document.getElementById('root')
);



if (module.hot) {
  module.hot.accept('./containers/Root', () => {
    // If you use Webpack 2 in ES modules mode, you can
    // use <App /> here rather than require() a <NextApp />.

    const NextApp = require('./containers/Root').default; // eslint-disable-line global-require
    render(
      <AppContainer>
        <NextApp store={store} />
      </AppContainer>,
      document.getElementById('root')
    );
  });
}