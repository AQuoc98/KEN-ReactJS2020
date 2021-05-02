import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decrease, increase } from './counterSlice';

CounterFeature.propTypes = {};

function CounterFeature(props) {
  const counter = useSelector((state) => state.counter);
  const dispatch = useDispatch();
  const handleIncreaseClick = () => {
    const action = increase();
    dispatch(action);
  };
  const handleDecreaseClick = () => {
    const action = decrease();
    dispatch(action);
  };
  return (
    <div>
      Counter: {counter}
      <div>
        <button onClick={handleIncreaseClick}>Increase</button>
        <button onClick={handleDecreaseClick}>Decrease</button>
      </div>
    </div>
  );
}

export default CounterFeature;
