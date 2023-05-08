const url = "http://localhost:8000";

const ApiConfigs = {
    userlogin: `${url}/api/auth/userlogin`,
    UserSignup: `${url}/api/auth/UserSignup`,
    getUserProfile:`${url}/api/auth/getUserProfile`,
    userAddCar: `${url}/api/car/userAddCar`,
    getAllCarlist: `${url}/api/car/getAllCarlist`,
    getCarById: `${url}/api/car/getCarById`,
    getAllUserCreatedCars:`${url}/api/car/getAllUserCreatedCars`,
    updateCardetail:`${url}/api/car/updateCardetail`
    
};

export default ApiConfigs;