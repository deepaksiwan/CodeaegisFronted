import axios from "axios";
import ApiConfigs from "../ApiConfig";

export const updateCardetail = async ({token,id,car_price,car_description}) => {
    try {
      const { data } = await axios({
        method:'PUT',
        url:ApiConfigs.updateCardetail, 
        headers:{
          Authorization:`Bearer ${token}`
        },
        data:{
            car_description:car_description,
            car_price:car_price
        },
        params:{
            id:id
        }
    });
    return data;
    } catch (error) {
      console.log(error,"hk");
    }
};