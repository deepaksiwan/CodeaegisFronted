import  React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';


const  Loader =() =>{
  return (
    <Box sx={{ display: 'flex',  textalign:"center"}} >
      <CircularProgress  size={"30px"} color={"error"}/>
    </Box>
  );
}
export default Loader;