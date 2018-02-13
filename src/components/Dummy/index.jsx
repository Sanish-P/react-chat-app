import React, { Component } from 'react';
import store from '../../store';

class Dummy extends Component {
  state = {
    currentState: store.getState().counter
  };
  render() {
    store.subscribe(() => {
      this.setState({ currentState: store.getState().counter });
    });
    return (
      <div>
        <h1>{this.state.currentState}</h1>
        <button
          onClick={() => {
            store.dispatch({ type: 'INCREMENT' });
          }}
        >
          +
        </button>
        <button
          onClick={() => {
            store.dispatch({ type: 'DECREMENT' });
          }}
        >
          -
        </button>
      </div>
    );
  }
}

export default Dummy;
