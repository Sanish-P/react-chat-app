import React from 'react';
import { loaderBackground } from './Loader.css';

const Loader = () => {
  return (
    <div className={`ui active inverted dimmer ${loaderBackground}`}>
      <div className="ui large text loader">Loading</div>
    </div>
  )
}

export default Loader;
