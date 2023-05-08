import axios from "axios";
import ApiConfigs from "../ApiConfig";

export const getAllCarList = async (page,limit) => {
    try {
      const { data } = await axios({
        method:'GET',
        url:ApiConfigs.getAllCarlist, 
        params:{
          page:page,
          limit:limit
        }
    });
    return data;
    } catch (error) {
      console.log(error,"hk");
    }
};