import React,{useEffect} from 'react';
import MatrimonyNavigator from './navigators/MatrimonyNavigator';
import ReduxThunk from "redux-thunk";
import { Provider as PaperProvider } from 'react-native-paper';
import AuthReducer from './store/reducers/AuthReducer';
import {createStore,combineReducers,applyMiddleware} from "redux";
import {Provider} from "react-redux";
import SplashScreen from 'react-native-splash-screen'


const App = () => {
    const rootReducer = combineReducers({
       auth:AuthReducer,
    })
    const store = createStore(rootReducer,applyMiddleware(ReduxThunk));
    useEffect(() => {
       SplashScreen.hide();
    });
  return (
   <Provider store={store}>
    <PaperProvider>
    <MatrimonyNavigator />
    </PaperProvider>
   </Provider>
  );
};


export default App;
