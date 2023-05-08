import React, { useContext, useState } from "react";
// import Header from "../../components/Header/Header";
import { useMutation } from "react-query";
import { useNavigate, Link } from "react-router-dom";
 import { signup } from "../../Api/ApiCall/Signup";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import { TextField, Box, Typography, Button, Grid, Container, Tooltip } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import IconButton from '@mui/material/IconButton';
import Header from './Header';
import { UserContext } from "../../Context/UserContext";
import { actionTypes } from "../../Context/UserReducer"

const useStyle = makeStyles((theme) => ({
  formmainwrp: {
    padding: '7rem 0rem 3rem 0rem !important',
    '@media(max-width : 900px)': {
      padding: '6rem 0rem 3rem 0rem !important',
      '@media(max-width : 600px)': {
        padding: '5rem 0rem 0rem 0rem !important',
      }
    }
  },
  error: {
    color: 'red',
    paddingTop: '10px',
    fontSize: '12px !important',
  },
  typ: {
    color: "#000",
    textDecoration: "underline !important",
    fontSize: "1rem"
  },
  error: {
    color: 'red',
    paddingTop: '10px',
    fontSize: '12px !important',
  },
  formbox: {
    padding: '2.5rem 3rem !important',
    boxShadow: 'inset 0px 7px 15px -4px #00000024',
    borderRadius: '40px',
    backgroundColor: '#efefef96',
    '@media(max-width : 600px)': {
      padding: '1.5rem !important'
    }
  },
  input: {
    backgroundColor: '#fcfcfc75',
    boxShadow: 'inset 0px 7px 15px -4px #00000024 !important',
    padding: '12px 20px !important',
    borderRadius: '30px !important'
  },
  input2: {
    backgroundColor: '#fcfcfc75',
    boxShadow: 'inset 0px 7px 15px -4px #00000024 !important',
    borderRadius: '30px !important'
  },
  loginbtn: {
    backgroundColor: '#4285f7 !important',
    color: '#fff !important',
    borderRadius: '30px !important',
    padding: '14px !important',
    width: '270px !important',
    '@media(max-width : 1200px)': {
      width: '220px !important',
      '@media(max-width : 900px)': {
        width: '300px !important',
        '@media(max-width : 600px)': {
          width: '130px !important',
        }
      }
    }
  },
  signupbtn: {
    backgroundColor: '#FF5F29 !important',
    color: '#fff !important',
    borderRadius: '30px !important',
    padding: '14px !important',
    width: '270px !important',
    '@media(max-width : 1200px)': {
      width: '220px !important',
      '@media(max-width : 900px)': {
        width: '300px !important',
        '@media(max-width : 600px)': {
          width: '130px !important',
        }
      }
    }
  },
  btnwrp: {
    display: 'flex',
    justifyContent: 'space-between',
    '@media(max-width : 600px)': {
      display: 'inherit'
    }
  },
  bothinput: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  inpwidth: {
    width: '49%',
  },
  registercont: {
    padding: '2.5rem 1.5rem 1.5rem 1.5rem',
    '@media(max-width : 900px)': {
      padding: '0rem 0rem 1.5rem 0rem',
      textAlign: 'center',
    }
  },
  
}));
const Signup = () => {
  const classes = useStyle();
 const [, dispatch] = useContext(UserContext);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] =useState(false);
  const navigate = useNavigate();
  


  const { mutateAsync } = useMutation(
    "signup",
    signup,
    {
      onSuccess: (data) => {
        console.log("data", data)
        try {
          if (data.responseCode === 200) {
            
            dispatch({ type: actionTypes.SET_TOKEN, value: data.token });
            localStorage.setItem("token", data.token);
            dispatch({
              type: actionTypes.SET_USER,
              value: data.responseResult,
            });
            navigate("/Login");
            toast.success(JSON.stringify(data.responseMessage));

          } else {
            toast.error(JSON.stringify(data.responseMessage));
          }
        } catch (error) {
          toast.error(JSON.stringify(error));
        }
      },
      onError: (error, data) => {
        console.log("error")
        toast.error(JSON.stringify(data.responseMessage));
      },
    }
  );

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };



  const handleClickShowPassword2 = () => setShowPassword2((show) => !show);
  const handleMouseDownPassword2 = (event) => {
    event.preventDefault();
  };
  

  const formik = useFormik({
    initialValues: {
      user_name: "",
      email: "",
      password: "",
     
    },
    validationSchema: Yup.object({
      user_name: Yup
        .string().trim()
        .required('Enter valid username')
        .min(4, 'Username must be at least 4 digit')
        .max(20, 'Username must not exceed 20 digit'),
      email: Yup.string()
        .trim()
        .email("Invalid email format")
        .required("Enter valid email address"),
      password: Yup.string()
        .trim()
        .required('Enter valid password')
        .min(2, 'Password should be 8 to 26 digit')
        .max(5, 'Password should be 8 to 26 digit'),
    }),
    onSubmit: async (values) => {
      try {
        await mutateAsync({
          user_name: values.user_name,
          email: values.email,
          password: values.password,
          
        });
      } catch (error) {
        console.log(error);
      }
    },

  });

  const RedirectLogin = () => {
    navigate("/login")
  }

  return (
    <Box sx={{backgroundColor:'#C4C4C4', padding:'0rem 0rem',minHeight:'100vh'}}>
       <Header/>
      <Container>
        <Box className={classes.formmainwrp}>
          <Grid container spacing={2}>
            <Grid item lg={5} md={5} sm={12} xs={12}>
              <Box className={classes.registercont}>
                <Typography variant="h5" fontWeight={700} color="#999999">Register Now,</Typography>
                <Typography color="#999999">It’s Quick, Easy and Beneficial. </Typography>
              </Box>
              
            </Grid>
            <Grid item lg={7} md={7} sm={12} xs={12}>
              <Box className={classes.formbox}>
                <form onSubmit={formik.handleSubmit} fullWidth >
                    <TextField
                      className={classes.input}
                      variant="standard"
                      id="user_name"
                      name="user_name"
                      placeholder="Username"
                      value={formik.values.user_name}
                      onChange={formik.handleChange}
                      sx={{ display: "flex", marginTop: '10px', boxShadow: "rgb(0 0 0 / 5%) 0px 2px 16px 0px", borderRadius: "8px", }}
                      InputProps={{
                        disableUnderline: true,
                      }}
                    />
                  <Typography className={classes.error}> {formik.touched.user_name && formik.errors.user_name}</Typography> 
                    <TextField
                      className={classes.input}
                      variant="standard"
                      id="email"
                      name="email"
                      placeholder="email@gmail.com"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      sx={{ display: "flex", boxShadow: "rgb(0 0 0 / 5%) 0px 2px 16px 0px", borderRadius: "8px", }}
                      InputProps={{
                        disableUnderline: true,
                      }}
                    />
                  

                  <Typography className={classes.error}> {formik.touched.email && formik.errors.email}</Typography>

                  <FormControl sx={{ marginTop: '10px', width: '100%', borderRadius: "30px", }}>
                      <OutlinedInput
                        className={classes.input2}
                        sx={{ border: 'none', "& fieldset": { border: 'none' }, }}
                        variant="standard"
                        name="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        placeholder=" New Password"
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        }
                      // label="Password"
                      />
                  </FormControl>
                  <Typography className={classes.error}> {formik.touched.password && formik.errors.password}</Typography>
                  <Typography className={classes.error}> {formik.touched.conformPassword && formik.errors.conformPassword}</Typography>
                  <Box height={10} />
                  <Box className={classes.btnwrp}>
                    <Button className={classes.signupbtn} type="submit">Register</Button>
                    <Button className={classes.loginbtn} onClick={RedirectLogin}>Login</Button>
                  </Box>
                </form>
              </Box>
            </Grid>
          </Grid>
        </Box>
        
      </Container>

    </Box>
  );
};

export default Signup;