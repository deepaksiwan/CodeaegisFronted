import {useContext, useEffect} from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import  Home  from './Component/Page/Home';
import Login from './Component/Page/Login';
import Signup from './Component/Page/Signup';
import CarDetails from './Component/Page/CarDetails';
import CreateCar from './Component/Page/CreateCar';
import MyCarList from './Component/Page/MyCarList';
import { UserContext } from "./Context/UserContext";
import { actionTypes } from "./Context/UserReducer";
import { useQuery } from "react-query";
import { getUserProfile } from "./Api/ApiCall/getUserProfile";
import AuthGuard from "./ProtectedRoute/AuthGuard";

function App() {
  const [{token}, dispatch] = useContext(UserContext);
  const tokens =token? token: localStorage.getItem("token");
  const { refetch } = useQuery(
    ["getUserProfile", tokens],
    () => getUserProfile({token:tokens}), {
    onSuccess: (data) => {
      // console.log(data?.response);
      if (data?.success){
        dispatch({ type: actionTypes.SET_USER, value: data?.response });
      }
    },
  });

  useEffect(() => {
    const jwtToken = localStorage.getItem("token");
    if (jwtToken) {
      dispatch({ type: actionTypes.SET_TOKEN, value: jwtToken });
      refetch?.()
    }
  }, [dispatch, tokens,refetch]);
 
  return (
    <div className="App">
    <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/Login" name="Login Page" element={<Login />}></Route>
      <Route exact path="/register" name="Signup Page" element={<Signup />}/>
      <Route exact path="/CarDetails" name="CarDetails Page" element={<CarDetails />}/>
      <Route exact path="/CreateCar" name="CarDetails Page" element={<AuthGuard><CreateCar /></AuthGuard>}></Route>
      <Route exact path="/MyCarList" name="CarDetails Page" element={<AuthGuard><MyCarList /></AuthGuard> }></Route>
      </Routes>
  </BrowserRouter>
    </div>
  );
}

export default App;
