import axios from "axios";
import ApiConfigs from "../ApiConfig";

export const getCarById = async (id) => {
    try {
      const { data } = await axios({
        method:'GET',
        url:ApiConfigs.getCarById, 
        params:{
          id:id
        }
    });
    return data;
    } catch (error) {
      console.log(error,"hk");
    }
};