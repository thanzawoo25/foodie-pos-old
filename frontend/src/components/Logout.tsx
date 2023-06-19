import { Box, Typography } from "@mui/material"
import Layout from "../Layout";

const Logout = () => {
    
    return (
        <Layout>
            <Typography variant="h3" sx={{textAlign:"center",mt:4}}>
                YOUR'RE NOW LOGGED OUT.
                <Box sx={{mt:5,fontSize:"h6" }}>
                    <h6>Already have registered? <a href="/register">Register here</a></h6>
                </Box>
        </Typography>
        </Layout>
    )
}

export default Logout;