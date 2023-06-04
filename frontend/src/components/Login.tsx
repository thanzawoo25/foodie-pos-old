import { Box, Button, TextField } from "@mui/material"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import Layout from "../Layout";

const Login = () => {
    const navigate = useNavigate()

    const [user, setUser] = useState({ email: "", password: "" })
    
    const login =async () => {
        //console.log(user)
        const response = await fetch("http://localhost:5000/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        });
        //console.log(await response.json())
        if (response.ok) {
            const responseData = await response.json();
            const accessToken = responseData.accessToken;
            localStorage.setItem("accessToken",accessToken)
            //console.log(accessToken)
            navigate("/")
        }
    }
    return (
        <Layout>
            <Box
            sx={{display:"flex",flexDirection:"column",maxWidth:"300px",alignItems:"center",margin:"0 auto"}}
        >
            <TextField
                sx={{my:2}}
            id="outlined-basic" 
            placeholder="Email "
                variant="outlined"
                onChange={(event)=>setUser({...user,email:event.target.value})}
            />

            <TextField
                id="outlined-basic" 
                type="password"
            placeholder="Password"
                variant="outlined"
                onChange={(event)=>setUser({...user,password:event.target.value})}
            />
            
            <Button
                sx={{ mt: 2 }}
                variant="contained"
                onClick={login}
            >
                Login
            </Button>
        </Box>
        </Layout    >
    )
}

export default Login;