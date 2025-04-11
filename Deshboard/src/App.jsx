import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signp_signin from "./Signup_signin";
import Rootleayout from "./Components/Rootleayout";
import About from "./Pages/About";
import Home from "./Pages/Home";
import Addproduct from "./Components/Addproduct";
import Login from "./Pages/login";
import Registation from "./Pages/Registation";
import ProductList from "./Components/ProductList";
import AddCategory from "./Components/AddCategory";
import CategoryList from "./Components/CategoryList";
import Account from "./Components/Account";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Orderlist from "./Components/Orderlist";
import OtpSent from "./Pages/otpsent";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Rootleayout />}>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/addproduct" element={<Addproduct />} />
          <Route path="/addcategory" element={<AddCategory />} />
          <Route path="/productlist" element={<ProductList />} />
          <Route path="/CategoryList" element={<CategoryList />} />
          <Route path="/Account" element={<Account />} />
          <Route path="/orderlist" element={<Orderlist />} />
        </Route>

        <Route path="/otp" element={<OtpSent />} />
        <Route path="/signup-signin" element={<Signp_signin />}>
          <Route path="login" element={<Login />} />
          <Route path="registration" element={<Registation />} />
        </Route>
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
};

export default App;
