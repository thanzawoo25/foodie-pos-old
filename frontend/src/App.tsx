import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar';
import Register from './components/Register';
import { Box, Typography } from '@mui/material';
import Layout from './Layout';
import zIndex from '@mui/material/styles/zIndex';

function App() {
  const accessToken = localStorage.getItem("accessToken");
  console.log("App Component",accessToken)
  useEffect(() => {
    fetchData()
  }, []);

  const fetchData =async () => {
    const response = await fetch("http://localhost:5000/menus", {
      headers: {
        Authorization :`Bearer ${accessToken}`
      }
    });
    console.log(await response.json())
  }
  

  return (
    <Layout>
       <div className="App">
      {/* <NavBar/> */}
      <Box sx={{mt:5}}>
        <Typography variant='h2'>
          Welcome To Foodie pos
        </Typography>
      </Box>
    </div>
   </Layout>
  );
}

export default App;

