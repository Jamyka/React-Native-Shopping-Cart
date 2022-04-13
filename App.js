import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Cart from './Components/Cart';
import ProductsList from './Components/ProductsList';

import {Provider} from 'react-redux';
import promiseMW from 'redux-promise';
import {createStore, applyMiddleware} from 'redux';
import rootReducer from './Redux/Reducers/index';

const myStore = applyMiddleware(promiseMW)(createStore);
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <Provider store={myStore(rootReducer)}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Product" component={ProductsList} />
          <Stack.Screen name="Cart" component={Cart} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
