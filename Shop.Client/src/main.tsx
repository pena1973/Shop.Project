
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux';
import { configureStore, combineReducers} from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux'

import thunkMiddleware from 'redux-thunk'

import {listSlices} from './redux/slices.tsx';
import {productSlices} from './redux/slices.tsx';

export const rootReducer = combineReducers({    
    listSlices: listSlices.reducer,
    productSlices: productSlices.reducer,
})
export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware)
})


ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
  </Provider>,  
)

export type RootState = ReturnType<typeof store.getState> 
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
