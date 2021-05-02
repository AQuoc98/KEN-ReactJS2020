import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/Counter/counterSlice';
import userReducer from '../features/Auth/userSlice';

const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
  },
});

export default store;
