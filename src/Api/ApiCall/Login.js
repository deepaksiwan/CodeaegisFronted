import axios from "axios";
import ApiConfigs from "../ApiConfig";

export const login = async ({email, password }) => {
    try {
      const { data } = await axios({
        method:'POST',
        url:ApiConfigs.userlogin, 
        data:{ 
        email:email,
        password:password,
         }
    });
    // console.log(data)
    return data;
    } catch (error) {
    }
  };

