import React, { Component } from 'react';
import ReactDOM from 'react-dom'

import 'typeface-roboto';
import Navbar from './components/Navbar';

const App = () => {
    return (
      <div>
        <Navbar />
      </div>
    );
}

// eslint-dable-next-line no-undef
ReactDOM.render(<App />, document.getElementById('app'))
