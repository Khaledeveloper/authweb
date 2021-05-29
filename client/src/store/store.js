import { createStore, applyMiddleware } from 'redux';
//import index file in reducers
import Reducers from "./reducers" ;
import reduxThunk from 'redux-thunk';
import { persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga'
import {watchAuth} from './saga/index'





const sagaMiddleware = createSagaMiddleware()


const middleWares = [sagaMiddleware, reduxThunk]

export const store = createStore(Reducers , {}, applyMiddleware(...middleWares));
sagaMiddleware.run(watchAuth)
export const persistor = persistStore(store);