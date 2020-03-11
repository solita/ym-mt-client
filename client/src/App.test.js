import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// @TODO mock backend calls on tests and unskip the test
it.skip('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
