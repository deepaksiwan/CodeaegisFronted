import React, { useState, useContext } from "react";
import { Box, Container, Grid, Pagination, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import carImage from "../../../images/carImage.jpg";
import { useQuery } from "react-query";
import { getAllCarList } from "../../../Api/ApiCall/CarList";
import { useNavigate, useParams , Link} from "react-router-dom";

import Modal from "../carListing/Modal";
import { UserContext } from "../../../Context/UserContext";
import Loader from "../../Page/Loader";

const useStyles = makeStyles({
  car_box: {
    backgroundColor: "#262626",
    borderRadius: "12px",
    padding: "10px",
    transition: "all 0.15s ease-in-out 0s",
    "&:hover": {},
    "&:hover $img_svg": {
      display: "none",
    },
    "&:hover $buy_btn": {
      display: "block",
    },
  },

  scale__img: {
    transition: "0.5s",
    "&:hover": {
      transform: "scale(1.1)",
    },
  },

  topimg: {
    background: `url(${carImage})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "100% 100%",
    padding: "0px 30px 15px 65px",
    display: "inline-block",
    marginTop: "12px",
  },
  mainDiv: {
    position: "relative",
  },

  top__img: {
    display: "flex",
    justifyContent: "space-between",
  },
  loaderMain:{
    justifyContent: "center !important",
    height: "100vh"
  },
  detailsbtn:{
    textDecoration: "none",
     backgroundColor: "#00adc9",
     color: "white",
     borderRadius: "5px",
     fontSize: "15px"
  }
});

const AllCarLiting = () => {
  const [{ userData }] = useContext(UserContext);

  
  
  const classes = useStyles();
  const { data: carList, isFetched } = useQuery(
    "getAllCarList",
    getAllCarList,
    {
      onSuccess: (data) => {
        if (data.success === true) {
          // console.log("data", data);
        }
      },
    }
  );

  //Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const totalPages = Math.ceil(carList?.response?.length / itemsPerPage);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  console.log(userData);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const itemsForCurrentPage = carList?.response?.slice(startIndex, endIndex);

  

  return (
    <div>
      <Container>
        <Grid container spacing={2} my={"30px"}>
          {isFetched === true ? (
            itemsForCurrentPage?.map((v, index) => (
              <Grid key={index} item lg={3} md={3} sm={6} xs={12}>
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
                          sx={{}}
                          className={classes.scale__img}
                          component={"img"}
                          src={v?.car_image}
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
                      {v?.car_description}
                    </Typography>
                    <Typography
                      fontSize={"15px"}
                      color={"#fff"}
                      textAlign={"center"}
                      p="10px 25px 10px"
                    >
                      {v?.car_price}
                    </Typography>
                    {userData?._id === v?.createdby && (
                      <Modal car_id={v?._id} />
                    )}
                    <Link className={classes.detailsbtn} to={`/CarDetails/${v._id}`}>
                       Show Car Details
                    </Link>
                  </Box>
                  <Box></Box>
                </Box>
              </Grid>
            ))
          ) : (
             <Grid className={classes.loaderMain}  item lg={12} md={12} sm={12} xs={12}>
                  <Typography> Loading ...<Loader/></Typography>
              </Grid>
          )}
        </Grid>
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
    </div>
  );
};

export default AllCarLiting;
