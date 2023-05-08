import axios from "axios";
import ApiConfigs from "../ApiConfig";

export const getUserProfile = async ({token}) => {
    // console.log(token);
    try {
      const { data } = await axios({
        method:'GET',
        url:ApiConfigs.getUserProfile, 
        headers:{
            Authorization:`Bearer ${token}`
          },
        
    });
    return data;
    } catch (error) {
      console.log(error,"hk");
    }
};