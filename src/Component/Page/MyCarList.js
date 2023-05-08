import React, { useContext, useState } from "react";
import { Box, Container, Grid, Pagination, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { getAllUserCreatedCars } from "../../Api/ApiCall/getAllUserCreatedCars";
import { useQuery } from "react-query";
import { UserContext } from "../../Context/UserContext";
import Header from "./Header";
import Modal from "./carListing/Modal";
import Loader from "./Loader";

const useStyles = makeStyles({
  mycarlistmain: {
    textAlign: "left",
    "& h1": {
      fontSize: "32px",
      fontWeight: "700",
      margin: "20px 0px 0px 0px",
      "@media (max-width: 992px)": {
        margin: "40px 0px 0px 0px",
      },
      "@media (max-width: 640px)": {
        fontSize: "24px",
      },
    },
  },

  car_box: {
    textDecoration: "none",
    backgroundColor: "#262626",
    borderRadius: "12px",
    padding: "10px",
    transition: "all 0.15s ease-in-out 0s",
    display: "block",
    "&:hover $img_svg": {
      display: "none",
    },
    "&:hover $buy_btn": {
      display: "block",
    },
    "&:hover $img_ovelay": {
      display: "block",
    },
  },
  scale__img: {
    width: "100%",
    transition: "0.5s",
    "&:hover": {
      transform: "scale(1.1)",
    },
  },
  loader:{
    width: "100vh",
    textalign: "center"
    
  }
});

const MyCarList = () => {
  const classes = useStyles();
  const token = localStorage.getItem("token");
  const [{ userData }] = useContext(UserContext);

  const { data: myCarList, isFetched } = useQuery(
    ["getAllUserCreatedCars", token],
    () => getAllUserCreatedCars({ token: token }),
    {
      onSuccess: (data) => {
        if (data?.success === true) {
          // console.log("data", data);
        }
      },
    }
  );
  
  //Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(myCarList?.response?.length / itemsPerPage);
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const itemsForCurrentPage = myCarList?.response?.slice(startIndex, endIndex);

  return (
    <Box>
      <Box sx={{ backgroundColor: "#C4C4C4"}}>
        <Header />
        <Container>
          <Box className={classes.mycarlistmain}>
            <Typography sx={{color: "#00adc9"}} component={"h2"}>CarList By UserName</Typography>
            <Typography component={"h3"}>
              {userData?.user_name ? userData?.user_name : "MyCar"}  CarList
            </Typography>
          </Box>
          <Grid container spacing={2} my={"30px"}>
            {isFetched === true ? (
              itemsForCurrentPage?.map((v, index) => {
                return (
                  <Grid key={index} item lg={4} md={4} sm={6} xs={12}>
                    <Box className={classes.mainDiv}>
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
                              className={classes.scale__img}
                              component={"img"}
                              src={v.car_image}
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
                          {v.car_description}
                        </Typography>
                        <Typography
                          fontSize={"15px"}
                          color={"#fff"}
                          textAlign={"center"}
                          p="10px 25px 10px"
                        >
                          {v.car_price}
                          <Modal car_id={v?._id} />
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                );
              })
            ) : (
              <Box className={classes.loader}>
                <Loader />
                
              </Box>
             
            )}
          </Grid>
          {itemsForCurrentPage?.length === 0 &&<Typography>No any Car Found</Typography>}
        </Container>
        {isFetched === true ? (
          <Pagination
            sx={{
              backgroundColor: "#C4C4C4",
              "& .MuiPagination-ul": {
                display: "flex",
                justifyContent: "center",
              },
              "& .MuiButtonBase-root": {
                color: "#fff",
                backgroundColor: "#09468e",
                borderRadius: 0,
                border: "1px solid #999",
                padding: "24px 14px",
              },
              "& .MuiButtonBase-root:hover": {
                backgroundColor: "rgb(243 167 53) !important",
                color: "#000",
              },

              "& .Mui-selected:focus": {
                backgroundColor: "rgb(243 167 53) !important",
                color: "#000",
              },
            }}
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
          />
        ) : (
          ""
        )}
      </Box>
    </Box>
  );
};

export default MyCarList;
