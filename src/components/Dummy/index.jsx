import React, { Component } from 'react';
import store from '../../store';

class Dummy extends Component {
  state = {
    currentState: store.getState().counter
  };
  render() {
    this.unsubscribe = store.subscribe(() => {
      let prev = this.state.currentState;
      let next = store.getState().counter;
      (prev !== next) && this.setState({ currentState: next })
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
  componentWillUnmount() {
    this.unsubscribe();
  }
}

export default Dummy;
