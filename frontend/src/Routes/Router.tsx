import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "../App";
import Menus from "../components/Menus";
import MenuCategories from "../components/MenuCategories";
import AddonCategories from "../components/AddonCategories";
import Locations from "../components/Locations";
import Settings from "../components/Settings";
import Register from "../components/Register";
import Login from "../components/Login";
import Logout from "../components/Logout";
import PrivateRoute from "./PrivateRoute";
import Tables from "../components/Tables";
import EditMenuCategories from "../components/EditMenuCategories";
import Addons from "../components/Addons";
import EditAddons from "../components/EditAddons";
import EditAddonCategories from "../components/EditAddonCategories";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/" Component={App} />
          <Route path="/menus" Component={Menus} />
          <Route path="/menu-categories" Component={MenuCategories} />
          <Route path="/menu-categories/:id" Component={EditMenuCategories} />
          <Route path="/addons" Component={Addons} />
          <Route path="/addons/:id" Component={EditAddons} />
          <Route path="/addon-categories" Component={AddonCategories} />
          <Route path="/addon-categories/:id" Component={EditAddonCategories} />
          <Route path="/tables" Component={Tables} />
          <Route path="/locations" Component={Locations} />
          <Route path="/settings" Component={Settings} />
        </Route>
        <Route path="/login" Component={Login} />
        <Route path="logout" Component={Logout} />
        <Route path="/register" Component={Register} />
      </Routes>
    </BrowserRouter>
  );
};
export default Router;
