import  React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';


const  Loader =() =>{
  return (
    <Box  >
      <CircularProgress  size={"30px"} sx={{"color": "#3498db"}}/> 
    </Box>
  );
}
export default Loader;