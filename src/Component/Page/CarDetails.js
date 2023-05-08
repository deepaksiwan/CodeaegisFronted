import { Container, Box, Typography, Button } from "@mui/material";
import React from "react";
import carimg from "../../images/Box_two.jpg";
//import { useParams } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import Header from "./Header"



const useStyle = makeStyles({
   

});

const CarDetails = () => {
  const classes = useStyle();
  //const { id: carDetails } = useParams();
  return (
    <Box>
      <Container>
       <Header/>
        <Box className={classes.mainwrp}>
        <Box className={classes.detailsbox}>
          <Typography>
           Details Page with carImage, descrption, and price
          </Typography>
          
        </Box>
        </Box>
      </Container>
    </Box>
  );
};
export default CarDetails;
