import React, { useEffect, useRef, useState } from "react";
import { Input, Typography } from "@material-tailwind/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const OtpSent = () => {
  let user = JSON.parse(localStorage.getItem("Adminuser"));
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const [otp, setOtp] = useState(Array(4).fill(""));
  const [timer, setTimer] = useState(60);
  const [isResendEnabled, setIsResendEnabled] = useState(false);
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prev) => {
        if (prev === 1) {
          clearInterval(countdown);
          setIsResendEnabled(true);
          setIsExpired(true);
          setOtp(Array(4).fill(""));
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, []);

  const handleChange = (index, value) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }

    if (newOtp.every((digit) => digit !== "")) {
      handleVerifyOtp(newOtp.join(""));
    }
  };

  const handleBackspace = (event, index) => {
    if (event.key === "Backspace" && !event.target.value && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleVerifyOtp = async (otpCode) => {
    if (isExpired) return;

    try {
      const response = await axios.post(
        "http://localhost:5990/api/v1/auth/otp-verify",
        { email: user.email, otp: otpCode },
      );

      if (response.data === "OTP verified successfully!") {
        toast.success("verified successfully! Now Please Login to ahead ", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
        });
        setTimeout(() => {
          navigate("/signup-signin/login");
        }, [5000]);
      } else {
        toast.error("Invalid OTP, try again.");
        setOtp(Array(4).fill(""));
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      toast.error("Error verifying OTP");
    }
  };

  const handleResendOtp = async () => {
    if (isExpired && !isResendEnabled) return;

    setIsResendEnabled(false);
    setTimer(60);
    setIsExpired(false);

    try {
      const response = await axios.post(
        "http://localhost:5990/api/v1/auth/otp-reset",
        {
          email: user.email,
        },
      );

      if (response.data === "OTP reset successful") {
        toast.success("New OTP sent!");
      } else {
        toast.error("Failed to resend OTP. Try again later.");
      }
    } catch (error) {
      console.error("Error resending OTP:", error);
      toast.error("Failed to resend OTP. Try again later.");
    }
  };

  return (
    <section className="mb-[150px] mt-[150px]">
      <div className="border-black.50 mx-auto flex h-[350px] flex-col items-center justify-center rounded-xl border bg-white p-6 shadow-xl shadow-black/20">
        <Typography
          variant="small"
          color="blue-gray"
          className="flex items-center justify-center gap-1 text-center font-medium"
        >
          Enter the 4-digit OTP sent to
          <span className="font-bold">{user.email}</span>
        </Typography>

        <div className="my-4 flex items-center justify-center gap-2">
          {otp.map((digit, index) => (
            <React.Fragment key={index}>
              <Input
                type="text"
                maxLength={1}
                className="!w-10 appearance-none !border-t-blue-gray-200 text-center !text-lg placeholder:text-blue-gray-300 placeholder:opacity-100 focus:!border-t-gray-900"
                value={digit}
                containerProps={{
                  className: "!min-w-0 !w-10 !shrink-0 !outline-none",
                }}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleBackspace(e, index)}
                inputRef={(el) => (inputRefs.current[index] = el)}
              />
            </React.Fragment>
          ))}
        </div>

        {isExpired && (
          <Typography variant="small" className="mb-3 text-center text-red-500">
            OTP Expired. Please request a new one.
          </Typography>
        )}

        <Typography
          variant="small"
          className="text-center font-normal text-blue-gray-500"
        >
          {isResendEnabled ? (
            <span
              className="cursor-pointer font-bold text-blue-500"
              onClick={handleResendOtp}
            >
              Resend OTP
            </span>
          ) : (
            `Resend OTP in ${timer}s`
          )}
        </Typography>
      </div>
      <ToastContainer />
    </section>
  );
};

export default OtpSent;
