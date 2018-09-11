import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { unregister } from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// removing because of https
// registerServiceWorker();
unregister();
