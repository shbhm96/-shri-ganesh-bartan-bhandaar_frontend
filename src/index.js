import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import './bootstrap.min.css'
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from "./store"

import { 
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route
} from 'react-router-dom';
import Homescreen from './screens/HomeScreen';


import HomeScreen from "./screens/HomeScreen";
import LoginScreen from './screens/LoginScreen';
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import PageNotFound from "./components/PageNotFound";
import TestElement from "./components/TestElement";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import ProductiListScreen from "./screens/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App/>}>
      <Route index={true} path="/" element={<Homescreen/>}/>
      <Route path="/product/:id" element={<ProductScreen/>}/>
    </Route>
  )
)



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
