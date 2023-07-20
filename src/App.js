import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Cars from "./components/Cars";
import AddCar from "./components/Addcars/AddCars";

import DeleteCar from "./components/DeleteCar";
import ReservationForm from "./components/ReservationForm";
import ReservedCars from "./components/ReservedCars";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginForm from "./components/Login/Login";
import SignupForm from "./components/Signup";
// import AddCar from "./components/Addcars/Addcars";
import Private from "./components/PrivateRoute";
import ProductDescription from "./components/Description/ProductDescription";
import ReserveProduct from './components/ReserveProduct'
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setAuth } from "./redux/authSlice";




function App() {
const dispatch = useDispatch()
useEffect(() => {
  dispatch(setAuth());
  }, [dispatch]); 

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/addcars" element={<AddCar />} />
        <Route path="/deleteCar" element={<DeleteCar />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/login" element={<LoginForm />} />
        {/* <Route path="/new_reservations" element={<Reservation />} /> */}
        <Route path="cars/:id" element={<ProductDescription />} />
        <Route path="/" element={<Home />} />
        {/* <Route path="/deleteCar" element={<ReserveProduct />} /> */}
        <Route path="/reservation_form" element={<ReservationForm />} />
        <Route path="/reservedCars" element={(<Private><ReservedCars /> </Private>)} />
        <Route path="cars/:id" element={<ProductDescription />} />
        <Route path="cars/:id/reserve" element={<ReserveProduct />} />
      </Routes>
    </Router>
  );
}

export default App;
