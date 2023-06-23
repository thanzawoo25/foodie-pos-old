import { ReactNode } from "react";
import NavBar from "./components/NavBar";

interface Props{
    title?:string
    children:ReactNode
}

const Layout = ({ title,children }: Props) => {
    
    return (
        <div>
            <NavBar title={title}/>
            {children}
        </div>
    )
}
export default Layout;