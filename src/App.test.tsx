import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {it} from "jest-circus";

it('renders without crashing', () => {
  const div = document.createElement('div');
  // @ts-ignore
  ReactDOM.render(<App  dispatch={} state={}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
