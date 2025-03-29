import React, { useState } from "react";
import { Eye, EyeOff, Smartphone, Lock } from "lucide-react";
import Logo from "/logo-rounded.png";
import { useCookies } from "react-cookie";
import { postData } from "../services/apiService";
import { useNavigate } from "react-router-dom";
import ErrorPopup from "../components/ErrorPopup";
import SuccessPopup from "../components/SuccessPopup";

const ModernLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ mobile: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [cookies, setCookie] = useCookies(["user"]);
  const [isErrorPopup, setIsErrorPopup] = useState(false);
  const [isSuccessPopup, setIsSuccessPopup] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    const mobileRegex = /^\d{10}$/;

    if (!formData.mobile.trim()) {
      newErrors.mobile = "Mobile number is required.";
    } else if (!mobileRegex.test(formData.mobile)) {
      newErrors.mobile = "Enter a valid 10-digit mobile number.";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    // Simulated login logic
    try {
      const response = await postData("/api/v1/login", formData);

      if (response.status === 200) {
        // Save user data in cookies
        setCookie("user", JSON.stringify(response.data), {
          path: "/",
          maxAge: 86400,
        }); // Cookie valid for 1 day

        setFormData({ mobile: "", password: "" });
        setIsSuccessPopup(true); // Show success popup

        setTimeout(() => navigate("/"), 1000);
      } else {
        setErrors({ apiError: "Unexpected response. Please try again." });
        setIsErrorPopup(true); // Show error popup
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Login failed. Please check your credentials and try again.";
      setErrors({ apiError: errorMessage });
      setIsErrorPopup(true); // Show error popup
    } finally {
      setLoading(false);
    }
  };

  const handlePopupClose = () => {
    setIsErrorPopup(false);
    setIsSuccessPopup(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="h-full w-full bg-white">
      {/* Top Navigation */}
      {/* <div className="sticky top-0 bg-white px-4 py-3 flex items-center justify-center border-b border-gray-100 shadow-sm">
        <h1 className="text-center text-xl font-semibold text-[#4CA335]">Log In</h1>
      </div> */}

      {/* <div className="flex w-full h-full items-center justify-center"> */}
      <div className="w-ful h-screen py-[18vw]">
        <div className="p-6 w-full flex flex-col items-center">
          <img
            src={Logo}
            alt="Logo"
            className="w-28 h-28 rounded-full border-4 border-[#4CA335] mb-6"
          />

          <h2 className="text-2xl font-bold text-[#4CA335] mb-2">
            Welcome Back
          </h2>
          <p className="text-gray-500 mb-6 text-center">
            Sign in to continue to your account
          </p>

          <form onSubmit={handleSubmit} className="w-full">
            {/* Mobile Number Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Smartphone className="text-[#4CA335]" />
              </div>
              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleInputChange}
                className={`w-full pl-10 pr-4 py-3 border-2 rounded-[2.133333vw] 
                    ${
                      errors.mobile
                        ? "border-red-500 bg-red-50"
                        : "border-gray-200 focus:border-[#4CA335]"
                    } 
                    transition-all duration-300 ease-in-out`}
                placeholder="Enter your mobile number"
                disabled={loading}
                inputMode="numeric"
                autoComplete="tel"
                autoCorrect="off"
                spellCheck="false"
              />
            </div>
            {errors.mobile && (
              <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>
            )}

            {/* Password Input */}
            <div className="relative mt-5">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="text-[#4CA335]" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={`w-full pl-10 pr-12 py-3 border-2 rounded-[2.133333vw] 
                    ${
                      errors.password
                        ? "border-red-500 bg-red-50"
                        : "border-gray-200 focus:border-[#4CA335]"
                    } 
                    transition-all duration-300 ease-in-out`}
                placeholder="Enter your password"
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPassword ? (
                  <EyeOff className="text-gray-400" />
                ) : (
                  <Eye className="text-gray-400" />
                )}
              </button>
            </div>

            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}

            {/* Forgot Password */}
            <div className="text-right mt-1" onClick={()=>navigate('/forgotpassword')}>
              <span className="text-sm text-[#4CA335] cursor-pointer hover:underline">
                Forgot Password?
              </span>
            </div>

            {/* Popups */}
            {isErrorPopup && (
              <ErrorPopup
                error={errors.apiError}
                handleClose={handlePopupClose}
              />
            )}
            {isSuccessPopup && (
              <SuccessPopup
                message="Login successful! Redirecting..."
                handleClose={handlePopupClose}
              />
            )}

            {/* Submit Button */}
            <button
              className={`w-full mt-5 py-3 rounded-[2.133333vw] text-white font-semibold transition-all duration-300 
                  ${
                    loading
                      ? "bg-[#86c75a] cursor-not-allowed"
                      : "bg-[#4CA335] hover:bg-[#3e8c2a]"
                  }`}
              type="submit"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Sign In"}
            </button>

            {/* Register Link */}
            <div className="text-center text-sm pt-4">
              Don't have an account?{" "}
              <span
                className="text-[#4CA335] font-medium cursor-pointer hover:underline"
                onClick={() => navigate("/register")}
              >
                Sign Up
              </span>
            </div>
          </form>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
};

export default ModernLogin;
