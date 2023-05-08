import React, { useState, useContext, useRef, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, TextField, Typography } from "@mui/material";
import { UserContext } from "../../../Context/UserContext";
import { updateCardetail } from "../../../Api/ApiCall/updateCardetail";
import { useQuery, useQueryClient } from "react-query";
import { getCarById } from "../../../Api/ApiCall/getCarById";

export default function ScrollDialog({ car_id }) {
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState("paper");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [{ token }] = useContext(UserContext);
  const queryClient = useQueryClient();

  const { refetch } = useQuery(
    ["getCarById", car_id],
    () => getCarById(car_id),
    {
      onSuccess: (data) => {
        if (data?.success) {
          setDescription(data?.response?.car_description);
          setPrice(data?.response?.car_price);
        }
      },
    }
  );
  useEffect(() => {
    refetch();
  }, [car_id, refetch]);

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = useRef(null);
  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  const submitHandler = async () => {
    try {
      const { data } = await updateCardetail({
        token: token,
        id: car_id,
        car_description: description,
        car_price: price,
      });
      // if(data?.status==1){
      queryClient?.invalidateQueries("getAllCarList");
      queryClient?.invalidateQueries("getAllUserCreatedCars");
      handleClose();
      // }
    } catch (err) {}
  };

  return (
    <div>
      <Button onClick={handleClickOpen("body")}>Edit</Button>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Edit</DialogTitle>
        <DialogContent dividers={scroll === "paper"}>
          <Box>
            <Typography component={"br"} />
            <TextField
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              sx={{ width: "300px" }}
              id="standard-basic"
              label="Discription"
              placeholder="Type description"
              variant="standard"
            />
            <Typography component={"br"} />
            <TextField
              sx={{
                width: "300px",
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
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              type="number"
              id="standard-basic"
              label="Price"
              placeholder="0.00"
              variant="standard"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={submitHandler}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
