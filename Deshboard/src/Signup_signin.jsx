import { useState } from "react";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import Login from "./Pages/login";
import Registation from "./Pages/Registation";

const Signup_signin = () => {
  const [activeTab, setActiveTab] = useState("signup");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    fullName: "", 
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = { ...formData, [name]: value };

    if (name === "firstName" || name === "lastName") {
      updatedFormData.fullName =
        `${updatedFormData.firstName} ${updatedFormData.lastName}`.trim();
      console.log("Full Name:", updatedFormData.fullName); 
    }

    setFormData(updatedFormData);
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[url('../Backdrop.png')] bg-cover p-4">
      <div className="h-[740px] w-[730px] rounded-3xl bg-white px-[64px] py-[50px] shadow-md">
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
              <Registation formData={formData} handleChange={handleChange} />
            </motion.div>
          ) : (
            <motion.div
              key="login"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.4 }}
            >
              <Login formData={formData} handleChange={handleChange} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Signup_signin;
