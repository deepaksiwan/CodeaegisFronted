import React from "react";
import { Header } from "../Page/Header";
import { Box } from "@mui/material";
import CarListing from "./carListing/CarListing";


function Home() {
  return (
    <Box>
     <Box sx={{backgroundColor:'#C4C4C4', padding:'0rem 0rem 4rem 0rem'}}>
     <Header />
      <CarListing/>
     </Box>
    </Box>
  );
}

export default Home;
