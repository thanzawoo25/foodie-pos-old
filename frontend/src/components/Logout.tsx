import { Typography } from "@mui/material"
import Layout from "../Layout";

const Logout = () => {
    
    return (
        <Layout>
            <Typography variant="h3" sx={{textAlign:"center",mt:4}}>
                YOUR'RE NOW LOGGED OUT.
                <Typography variant="h6" sx={{mt:5}}>
                    Already have registered? <a href="/register">Register here</a>
                </Typography>
        </Typography>
        </Layout>
    )
}

export default Logout;