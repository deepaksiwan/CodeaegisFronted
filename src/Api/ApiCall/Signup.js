import axios from "axios";
import ApiConfigs from "../ApiConfig";

export const signup = async ({ user_name,email,password }) => {
    try {
      const { data } = await axios({
        method:'POST',
        url:ApiConfigs.UserSignup, 
        data:{ 
        user_name: user_name,
        email:email, 
        password:password,
        }
    });
    console.log(data);
    return data;
    } catch (error) {
      console.log(error)
    }
  };

