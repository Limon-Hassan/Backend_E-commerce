import { useState } from "react";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import Login from "./Pages/login";
import Registation from "./Pages/Registation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const axiosInstance = axios.create({
  baseURL: "http://localhost:5990",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

const Signup_signin = () => {
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("signup");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    fullName: "",
    isAdmin: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        role: checked ? "admin" : "user",
      }));
    } else {
      const updatedData = {
        ...formData,
        [name]: value,
      };

      if (name === "firstName" || name === "lastName") {
        updatedData.fullName =
          `${updatedData.firstName || ""} ${updatedData.lastName || ""}`.trim();
      }

      setFormData(updatedData);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!formData.email || !formData.password) {
      setError("Email and password are required.");
      setLoading(false);
      return;
    }

    if (activeTab === "signup" && (!formData.firstName || !formData.lastName)) {
      setError("First and last name are required.");
      setLoading(false);
      return;
    }

    if (activeTab === "signup") {
      const payload = {
        name: `${formData.firstName} ${formData.lastName}`.trim(),
        email: formData.email,
        password: formData.password,
        role: formData.role || "user",
      };

      try {
        const response = await axiosInstance.post(
          "http://localhost:5990/api/v1/auth/regisation",
          payload,
          { withCredentials: true },
        );

        if (response.status === 201) {
          localStorage.setItem("Adminuser", JSON.stringify(response.data.user));
          toast.success(
            payload.role === "admin"
              ? "Admin registered successfully!"
              : "Seller registered successfully!",
          );
          setTimeout(() => {
            setLoading(false);
            navigate("/otp");
          }, [3000]);
        }
      } catch (err) {
        setLoading(false);
        toast.error("Registration failed.");
        console.error(
          "Error during registration:",
          err.response ? err.response.data : err.message,
        );
      }
    }

    if (activeTab === "login") {
      try {
        const response = await axiosInstance.post(
          "http://localhost:5990/api/v1/auth/login",
          {
            email: formData.email,
            password: formData.password,
          },
          { withCredentials: true },
        );

        if (response.status === 200) {
          const { user, token, msg } = response.data;
          localStorage.setItem("token", token);
          toast.success(msg);
          setTimeout(() => {
            setLoading(false);
            navigate(user.role === "admin" && "/");
          }, [3000]);
        }
      } catch (error) {
        setLoading(false);
        console.error("Login failed:", error);
        if (error.response?.status === 401) {
          const backendMessage =
            error.response.data?.msg || "Unauthorized access";
          formData.password.setCustomValidity(backendMessage);
          formData.password.reportValidity();
        } else {
          alert("Something went wrong. Please try again.");
        }
      }
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[url('../Backdrop.png')] bg-cover p-4">
      <div className="h-[760px] w-[730px] rounded-3xl bg-white px-[64px] py-[50px] shadow-md">
        <div className="flex">
          {["signup", "login"].map((tab, index) => (
            <button
              key={tab}
              className={`flex-1 py-2 text-lg font-medium transition duration-700 ease-in-out ${
                activeTab === tab
                  ? "bg-black text-white"
                  : "bg-gray-300 text-gray-500"
              } ${index === 0 ? "rounded-l-lg" : "rounded-r-lg"}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === "signup" ? "Sign up" : "Log in"}
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          {activeTab === "signup" ? (
            <motion.div
              key="signup"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
            >
              <Registation
                formData={formData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                error={error}
                setFormData={setFormData}
                loading={loading}
              />
            </motion.div>
          ) : (
            <motion.div
              key="login"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.4 }}
            >
              <Login
                formData={formData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                error={error}
                loading={loading}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signup_signin;
