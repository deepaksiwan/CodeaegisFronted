import axios from "axios";
import ApiConfigs from "../ApiConfig";

export const getAllUserCreatedCars = async ({token}) => {
    try {
      const { data } = await axios({
        method:'GET',
        url:ApiConfigs.getAllUserCreatedCars, 
        headers:{
            Authorization:`Bearer ${token}`
          },
        
    });
    return data;
    } catch (error) {
      console.log(error,"hk");
    }
};