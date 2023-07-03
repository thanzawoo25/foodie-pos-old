import { BrowserRouter, Route, Routes } from "react-router-dom"
import App from "../App"
import Menus from "../components/Menus"
import MenuCategories from "../components/MenuCategories"
import Addons from "../components/Addons"
import AddonCategories from "../components/AddonCategories"
import Locations from "../components/Locations"
import Settings from "../components/Settings"
import Register from "../components/Register"
import Login from "../components/Login"
import Logout from "../components/Logout"
import PrivateRoute from "./PrivateRoute"
import CreateMenu from "../components/CreateMenu"


const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<PrivateRoute/>}>
                    <Route path="/" Component={App}/>
                    <Route path="/menus" Component={Menus}/>
                    <Route path="/menu-categories" Component={MenuCategories}/>
                    <Route path="/create-menu" Component={CreateMenu}/>
                    <Route path="/addons" Component={Addons}/>
                    <Route path="/addon-categories" Component={AddonCategories}/>
                    <Route path="/locations" Component={Locations}/>
                    <Route path="/settings" Component={Settings}/>
                </Route>
                    <Route path="/login" Component={Login}/>
                    <Route path="logout" Component={Logout}/>
                    <Route path="/register" Component={Register}/>
                
            </Routes>
        </BrowserRouter>
    )
}
export default Router;