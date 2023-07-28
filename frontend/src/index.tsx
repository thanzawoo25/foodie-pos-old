import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import AppProvider from "./contexts/AppContext";
import Router from "./Routes/Router";

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
  document.getElementById("root") as HTMLElement
);
root.render(
  <AppProvider>
    <Router />
  </AppProvider>
);
//root.render(<RouterProvider router={routes}/>)
