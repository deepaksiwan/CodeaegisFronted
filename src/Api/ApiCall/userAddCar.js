import axios from "axios";
import ApiConfigs from "../ApiConfig";

export const userAddCar = async ({token,car_name,car_image,car_price,car_description}) => {
    try {
      const { data } = await axios({
        method:'POST',
        url:ApiConfigs.userAddCar, 
        headers:{
          Authorization:`Bearer ${token}`
        },
        data:{
            car_name:car_name,
            car_image:car_image,
            car_price:car_price,
            car_description:car_description
        }
    });
    return data;
    } catch (error) {
      console.log(error,"hk");
    }
};