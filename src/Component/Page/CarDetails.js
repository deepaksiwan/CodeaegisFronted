import { Container, Box, Typography, Button } from "@mui/material";
import React from "react";
import carimg from "../../images/Box_two.jpg";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { makeStyles } from "@mui/styles";
import Header from "./Header";
import { getCarById } from "../../Api/ApiCall/getCarById";

const useStyle = makeStyles({
  mainwrp:{
    textAlign: "center",
    marginTop: "5rem",
    width: "50%"
  },
 
  car_box: {
    width: "20rem",
    backgroundColor: "#262626",
    borderRadius: "12px",
    padding: "10px",
   
  },
});

const CarDetails = () => {
  const classes = useStyle();
  const {id: id} = useParams();
  console.log("id", id);

  const { data } = useQuery(["getCarById", id],
   () => getCarById(id), {
    onSuccess: (data) => {
      console.log(data);
    },
  });
  

  return (
    <Box>
      <Container>
        <Header />
        <Box className={classes.mainwrp}>
            <Box className={classes.car_box}>
              <Box sx={{ textAlign: "center" }}>
                <Typography
                  sx={{
                    overflow: "hidden",
                    borderRadius: "20px",
                    height: "250px",
                    position: "relative",
                  }}
                >
                  {" "}
                  <Typography
                    sx={{}}
                    className={classes.scale__img}
                    component={"img"}
                    src={data?.response?.car_image}
                    width={"100%"}
                  />
                </Typography>
              </Box>
              <Typography
                fontSize={"18px"}
                color={"#fff"}
                textAlign={"center"}
                fontWeight="700"
                p="8px"
              >
                {data?.response?.car_name}
              </Typography>
              <Typography
                fontSize={"18px"}
                color={"#fff"}
                textAlign={"center"}
                fontWeight="700"
                p="8px"
              >
                {data?.response?.car_description}
              </Typography>
              <Typography
                fontSize={"15px"}
                color={"#fff"}
                textAlign={"center"}
                p="10px 25px 10px"
              >
               {data?.response?.car_price}
              </Typography>
            </Box>

        </Box>
      </Container>
    </Box>
  );
};
export default CarDetails;
