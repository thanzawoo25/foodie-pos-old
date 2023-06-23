import { Box, Button, TextField, Typography } from "@mui/material";
import NavBar from "./NavBar";
import Layout from "../Layout";
import { useContext, useState } from "react";
import { AppContext } from "../contexts/AppContext";
import { config } from "../config/config";


const Locations = () => {
  const { locations, fetchData, company } = useContext(AppContext);
  // console.log(locations)
  
  const [newLocation, setNewLocation] = useState({ name: "", address: "", companyId: company?.id })
  const accessToken = localStorage.getItem("accessToken");
  

  const createNewLocation = async () => {
     console.log(newLocation)
     await fetch(`${config.apiBaseUrl}/locations`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type":"application/json"
      },
      body:JSON.stringify(newLocation)
    })
   
    fetchData();
    setNewLocation({name:"",address:"",companyId:company?.id})
  }


  return (
    <Layout title="Locations">
      <Box sx={{ ml: 5, mt: 5 }}>
        {locations.map((location,index) => {
          return (
            <Box key={location.id} sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Typography variant="h5" sx={{mr:3}}>
                      {index + 1 }.
                  </Typography>
              
              <TextField defaultValue={location.name} sx={{mr:3}} />
              <TextField defaultValue={location.address} sx={{mr:3}}/>
              <Button variant="contained">Update</Button>
              </Box>
              
          );
        })}

        <h1>Create new location</h1>

        <Box sx={{ ml: 5, mt: 5,display:"flex",alignItems:"center" }}>

          <TextField 
            value={newLocation.name}
            sx={{ mr: 3 }}
          onChange={(event)=>{
            setNewLocation({...newLocation,name:event.target.value})
            }} />
          
          <TextField
            value={newLocation.address}
            sx={{ mr: 3 }}
          onChange={(event)=>{
            setNewLocation({...newLocation,address:event.target.value})
          }}/>
          <Button variant="contained" onClick={createNewLocation}>Create</Button>
        </Box>
       
      </Box>
    </Layout>
  );
};

export default Locations;

