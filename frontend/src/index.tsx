import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Orders from './components/Orders';
import MenuCategories from './components/MenuCategories';
import AddonCategories from './components/AddonCategories';
import Addons from './components/Addons';
import Settings from './components/Settings';
import Locations from './components/Locations';
import Menus from './components/Menus';
import Logout from './components/Logout';
import AppProvider from './contexts/AppContext';
import Router from './Routes/Router';

// const routes = createBrowserRouter([
//   {
//     path: "/",
//     element:<App/>
//   },
//   {
//     path: "/register",
//     element:<Register/>
//   },
//   {
//     path: "/login",
//     element:<Login/>
//   },
//   {
//     path: "/logout",
//     element:<Logout/>
//   },
//   {
//     path: "/orders",
//     element:<Orders/>
//   },
//   {
//     path: "/menus",
//     element:<Menus/>
//   },
//   {
//     path: "/menu-categories",
//     element:<MenuCategories/>
//   },
//   {
//     path: "/addons",
//     element:<Addons/>
//   },
//   {
//     path: "/addon-categories",
//     element:<AddonCategories/>
//   },
//   {
//     path: "/locations",
//     element:<Locations/>
//   },
//   {
//     path: "/settings",
//     element:<Settings/>
//   },

// ])

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <AppProvider>
    <Router />
  </AppProvider>
)
//root.render(<RouterProvider router={routes}/>)

