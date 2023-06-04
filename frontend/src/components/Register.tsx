import { Box, Button, TextField } from "@mui/material"
import { useState } from "react";
import Layout from "../Layout";

const Register = () => {

    const [user, setUser] = useState({ name: "", email: "", password: "" })
    
    const register =async () => {
        //console.log(user)
        const response = await fetch("http://localhost:5000/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        });
        console.log(await response.json())

    }
    return (
        <Layout>
             <Box
            sx={{display:"flex",flexDirection:"column",maxWidth:"300px",alignItems:"center",margin:"0 auto"}}
        >
            <TextField
                id="outlined-basic" 
                placeholder="Name"
                variant="outlined"
                onChange={(event)=>setUser({...user,name:event.target.value})}
            />

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
                onClick={register}
            >
                Register
            </Button>
        </Box>
       </Layout>
    )
}

export default Register;