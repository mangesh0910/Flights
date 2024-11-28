// Counter.js
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, reset, incrementByAmount } from '../../store/counterSlice';

const Counter = () => {
    const count = useSelector((state) => state.counter.value); // Access Redux state
    const dispatch = useDispatch(); // Hook to dispatch actions
    const [amount, setAmount] = useState(0);

    return (
        <div>
            <h1>Counter: {count}</h1>
            <button onClick={() => dispatch(increment())}>Increment</button>
            <button onClick={() => dispatch(decrement())}>Decrement</button>
            <button onClick={() => dispatch(reset())}>Reset</button>
            <div>
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                />
                <button onClick={() => dispatch(incrementByAmount(amount))}>
                    Increment by Amount
                </button>
            </div>
        </div>
    );
};

export default Counter;
