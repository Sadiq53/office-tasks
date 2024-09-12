// App.js
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import ModuleScreen from './screens/ModuleScreen';
import UserDataSlice from './redux/UserDataSlice';


const rootReducer = combineReducers({UserDataSlice});
const store = configureStore({
  reducer : rootReducer
});


export default function App() {
  return (
    <Provider store={store}>
      <ModuleScreen />
    </Provider>
  );
}
