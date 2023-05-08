import { useContext } from "react";
import { Box, Container, Typography } from "@mui/material";
import React from "react";
import { makeStyles } from "@mui/styles";
import { Link, NavLink } from "react-router-dom";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { actionTypes } from "../../Context/UserReducer";
const useStyles = makeStyles({
  main___Div: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem 0rem",
    "@media(max-width : 900px)": {
      display: "none",
    },
  },
  Nav___List__Wrap: {},
  Nav___List: {
    margin: "0",
    padding: "0px",
    listStyle: "none",
    display: "flex",
  },
  NavLink___List2: {
    fontFamily: "Playfair Display",
    fontSize: "20px",
    color: "#00adc9",
  },
  NavLink___List: {
    fontFamily: "Playfair Display",
    fontSize: "20px",
    color: "#00adc9",
    textDecoration: "none",
    marginLeft: "35px",
  },
  side___navbar: {
    display: "flex",
    alignItems: "center",
  },
  side___navbar2: {
    display: "flex",
    justifyContent: "end",
    alignItems: "center",
    width: "50%",
    "@media(max-width : 600px)": {
      width: "40%",
    },
  },
  mob__nav: {
    color: "#fff",
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
});
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="right" ref={ref} {...props} />;
});

export const Header = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const [{ token, userData }, dispatch] = useContext(UserContext);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const Logout = (e) => {
    e.preventDefault();
    dispatch({ type: actionTypes.SET_TOKEN, value: null });
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <Box>
      <Container>
        <Box className={classes.main___Div}>
          <Box>
            <Link to="/">
              <Typography
                component={"img"}
                src="https://www.codeaegis.com/public/user/images/logo.png"
              />
            </Link>
          </Box>
          <Box className={classes.Nav___List__Wrap}>
            <Box className={classes.Nav___List} component={"ul"}>
              <Box component={"li"}>
                <NavLink to="/" className={classes.NavLink___List2}>
                  Home
                </NavLink>
              </Box>
              {token ? (
                <Box component={"li"}>
                  <NavLink to="/MyCarList" className={classes.NavLink___List}>
                    MyCars
                  </NavLink>
                </Box>
              ) : (
                ""
              )}
              {token ? (
                <NavLink to="/CreateCar" className={classes.NavLink___List}>
                  Create
                </NavLink>
              ) : (
                ""
              )}
              {!token ? (
                <Box component={"li"}>
                  <NavLink to="/Login" className={classes.NavLink___List}>
                    Login
                  </NavLink>
                </Box>
              ) : (
                <Box component={"li"}>
                  <NavLink onClick={Logout} className={classes.NavLink___List}>
                    Logout
                  </NavLink>
                </Box>
              )}
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            display: "none",
            "@media(max-width : 900px)": { display: "block" },
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              padding: "1.5rem 2rem 1rem 2rem",
              alignItems: "center",
              "@media(max-width : 600px)": { padding: "1rem 0rem 0rem 0rem" },
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "50%",
                "@media(max-width : 600px)": {
                  width: "60%",
                  flexDirection: "row-reverse",
                },
              }}
            >
              <Box>
                <Link to="/">
                  {" "}
                  <Typography
                    component={"img"}
                    src="https://www.codeaegis.com/public/user/images/logo.png"
                    width={"100px"}
                  />
                </Link>
              </Box>
              <Box onClick={handleClickOpen}>
                <MenuIcon
                  sx={{ color: "#07484A", cursor: "pointer", fontSize: "30px" }}
                />
              </Box>
            </Box>
          </Box>
        </Box>
        <Dialog
          fullScreen
          open={open}
          onClose={handleClose}
          TransitionComponent={Transition}
          sx={{
            backgroundImage:
              "linear-gradient(45deg, #716449, #ccb483, #716449)",
            "& .MuiPaper-root": {
              backgroundColor: "#4285f7",
            },
          }}
        >
          <AppBar
            sx={{
              position: "relative",
              backgroundColor: "#4285f7",
              boxShadow: "none",
            }}
          >
            <Toolbar
              sx={{
                backgroundColor: "#4285f7",
                boxShadow: "none",
                justifyContent: "right",
              }}
            >
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleClose}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <Box sx={{ textAlign: "center", display: "grid", gap: "20px" }}>
            <NavLink className={classes.mob__nav} onClick={handleClose} to="/">
              Home
            </NavLink>
            {token ? (
              <NavLink
                to="/MyCarList"
                className={classes.mob__nav}
                onClick={handleClose}
              >
                MyCars
              </NavLink>
            ) : (
              ""
            )}
            {token ? (
              <NavLink to="/CreateCar" className={classes.mob__nav}>
                Create
              </NavLink>
            ) : (
              ""
            )}
            {!token ? (
              <Box component={"li"}>
                <NavLink to="/Login" className={classes.mob__nav}>
                  login
                </NavLink>
              </Box>
            ) : (
              <Box component={"li"}>
                <NavLink onClick={Logout} className={classes.mob__nav}>
                  Logout
                </NavLink>
              </Box>
            )}
          </Box>
        </Dialog>
      </Container>
    </Box>
  );
};
export default Header;
