import React, { useState, useContext } from "react";
import Button from "@mui/material/Button";
import { Box, Container, TextField, Typography } from "@mui/material";
import { UserContext } from "../../Context/UserContext";

import Header from "./Header";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import { userAddCar } from "../../Api/ApiCall/userAddCar";
import { useNavigate } from "react-router-dom";

export default function ScrollDialog() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState([]);
  const [{ token, userData }, ] = useContext(UserContext);

  

  const handleClose = () => {
    setOpen(false);
    navigate("/");
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  
  const handleImage = (e) => {
    const file = e.target.files[0];
    setFileToBase(file);
    
  };

  const setFileToBase = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result);
    };
  };


  const submitHandler = async () => {
    try {
      const { data } = await userAddCar({
        token: token,
        car_name: name,
        car_image: image,
        car_price: price,
        car_description: description,
      });
      if(data){
        navigate('/')
        console.log("success")
      }
      
    } catch (err) {}

  };

  return (
    <div>
      <Box
          sx={{
            backgroundColor: "#C4C4C4",
            padding: "0rem 0rem 4rem 0rem",
            minHeight: "100vh",
          }}
      >
        <Header />
        <Container>
          <Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <CardContent>
                <Grid container justifyContent="center" alignItems="center">
                  <input
                    accept="image/*"
                    className=""
                    id="contained-button-file"
                    multiple
                    type="file"
                    onChange={handleImage}
                  />
                </Grid>
              </CardContent>
            </Box>
            <Typography component={"br"} />
            <TextField
              value={name}
              onChange={(e) => setName(e.target.value)}
              id="standard-basic"
              label="Name"
              placeholder="Name"
              variant="standard"
            />
            <Typography component={"br"} />
            <TextField
              sx={{
                "& input[type=number]": {
                  "-moz-appearance": "textfield",
                },
                "& input[type=number]::-webkit-outer-spin-button": {
                  "-webkit-appearance": "none",
                  margin: 0,
                },
                "& input[type=number]::-webkit-inner-spin-button": {
                  "-webkit-appearance": "none",
                  margin: 0,
                },
              }}
              onChange={(e) => setPrice(e.target.value)}
              type="number"
              id="standard-basic"
              label="Price"
              placeholder="0.00"
              variant="standard"
            />
            <Typography component={"br"} />
            <TextField
              onChange={(e) => setDescription(e.target.value)}
              id="standard-basic"
              label="Discription"
              placeholder="Discription"
              variant="standard"
            />
          </Box>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={submitHandler}>Create</Button>
        </Container>
      </Box>
    </div>
  );
}
