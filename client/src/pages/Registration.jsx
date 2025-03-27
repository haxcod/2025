import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  ArrowLeft,
  Smartphone,
  SquareCode,
} from "lucide-react";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import Logo from "/logo-rounded.png";
import { postData } from "../services/apiService";
import ErrorPopup from "../components/ErrorPopup";

const ModernRegistration = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
    inviteCode: "",
    termsAccepted: false,
    fingerprint: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [isInviteCode, setIsInviteCode] = useState("");
  const navigate = useNavigate();

  // Fetch invite code from URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const inviteCode = urlParams.get("inviteCode");
    if (inviteCode) {
      setIsInviteCode(inviteCode);
      setFormData((prevData) => ({
        ...prevData,
        inviteCode: inviteCode,
      }));
    }
  }, []);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required.";
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Enter a valid email address.";
    }

    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
    }

    const mobileRegex = /^\d{10}$/;
    if (!formData.mobile.trim()) {
      newErrors.mobile = "Mobile number is required.";
    } else if (!mobileRegex.test(formData.mobile)) {
      newErrors.mobile = "Enter a valid 10-digit mobile number.";
    }

    if (!formData.termsAccepted) {
      newErrors.termsAccepted = "You must agree to the terms.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      const fingerprint = await getDeviceFingerprint();
      const requestData = { ...formData, fingerprint };

      // Simulate API call
      const response = await postData("/api/v1/register", requestData);
      if (response.status === 201) {
        // setSuccessMessage("Registration successful! Redirecting...");
        setFormData({
          name: "",
          email: "",
          password: "",
          mobile: "",
          inviteCode: "",
          termsAccepted: false,
        });
        navigate("/login")
        // setTimeout(() => navigate("/login"), 2000); // Redirect to login
      }
    
    } catch (error) {
      setErrors({
        apiError:
          error.response?.data?.message ||
          "An error occurred. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  async function getDeviceFingerprint() {
    const fp = await FingerprintJS.load();
    const result = await fp.get();
    return result.visitorId;
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleErrorPopup = () => {
    setErrors(false);
    setLoading(false);
  };



  return (
    <div className="h-full flex bg-[#f0f4f0]">
      {/* Top Navigation */}
      {/* <div className="sticky top-0 bg-white px-4 py-3 flex items-center justify-start border-b border-gray-100 shadow-sm">
        <button
          className="p-2 hover:bg-gray-100 rounded-full mr-4"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-6 w-6 text-[#4CA335]" />
        </button>
        <h1 className="text-xl font-semibold text-[#4CA335]">Create Account</h1>
      </div> */}

      {/* <div className="flex-grow flex items-center justify-center"> */}
        <div className="w-full bg-white flex justify-center items-center">
          <div className="p-6 my-6 w-full flex flex-col items-center">
            <img
              src={Logo}
              alt="Logo"
              className="w-28 h-28 rounded-full border-4 border-[#4CA335] mb-6"
            />

            <h2 className="text-2xl font-bold text-[#4CA335] mb-2">
              Create Account
            </h2>
            <p className="text-gray-500 mb-6 text-center">
              Sign up to get started
            </p>

            <form onSubmit={handleSubmit} className="w-full">
              {/* Input Fields */}
              {["name", "mobile", "email", "password"].map((field) => {
                const icons = {
                  name: <User className="text-[#4CA335]" />,
                  mobile: <Smartphone className="text-[#4CA335]" />,
                  email: <Mail className="text-[#4CA335]" />,
                  password: <Lock className="text-[#4CA335]" />,
                };

                return (
                  <>
                    <div key={field} className="relative w-full mt-4">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        {icons[field]}
                      </div>
                      <input
                        type={
                          field === "password"
                            ? showPassword
                              ? "text"
                              : "password"
                            : field === "email"
                            ? "email"
                            : "text"
                        }
                        name={field}
                        value={formData[field]}
                        onChange={handleInputChange}
                        className={`w-full pl-10 pr-4 py-3 border-2 rounded-[2.133333vw] 
                        ${
                          errors[field]
                            ? "border-red-500 bg-red-50"
                            : "border-gray-200 focus:border-[#4CA335]"
                        } 
                        transition-all duration-300 ease-in-out`}
                        placeholder={`Enter your ${field}`}
                        required
                        disabled={loading}
                        maxLength={field === "mobile" ? 10 : undefined}
                      />
                      {field === "password" && (
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
                      )}
                    </div>
                    {errors[field] && (
                      <p className="text-red-500 text-sm mt-1">{errors[field]}</p>
                    )}
                  </>
                );
              })}

              {/* Optional Invite Code */}
              {!isInviteCode && (
                <div className={`relative my-4`}>
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <SquareCode className="text-[#4CA335]" />
                  </div>
                  <input
                    type="text"
                    name="inviteCode"
                    value={formData.inviteCode}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-[2.133333vw] focus:border-[#4CA335]"
                    placeholder="Invite Code (Optional)"
                  />
                </div>
              )}

              {/* Terms and Conditions */}
              <div className="flex items-start space-x-2">
                <input
                  type="checkbox"
                  name="termsAccepted"
                  checked={formData.termsAccepted}
                  onChange={handleInputChange}
                  className="w-5 h-5 border border-gray-300 rounded-md focus:ring-[#4CA335] text-[#4CA335]"
                  required
                />
                <label className="text-sm text-gray-700">
                  I agree to the{" "}
                  <span
                    className="text-[#4CA335] font-medium cursor-pointer underline"
                    onClick={() => navigate("/about")}
                  >
                    Terms and Conditions
                  </span>
                </label>
              </div>


              {errors.apiError && (
            <ErrorPopup
              error={errors.apiError}
              handleClose={handleErrorPopup}
            />
          )}



              {/* Submit Button */}
              <button
                className={`w-full my-4 py-3 rounded-[2.133333vw] text-white font-semibold transition-all duration-300 
                  ${
                    loading
                      ? "bg-[#86c75a] cursor-not-allowed"
                      : "bg-[#4CA335] hover:bg-[#3e8c2a]"
                  }`}
                type="submit"
                disabled={loading}
              >
                {loading ? "Creating Account..." : "Create Account"}
              </button>

              {/* Navigation to Login */}
              <div className="text-center text-sm pt-4">
                Already have an account?{" "}
                <span
                  className="text-[#4CA335] font-medium cursor-pointer hover:underline"
                  onClick={() => navigate("/login")}
                >
                  Sign In
                </span>
              </div>
            </form>
          </div>
        </div>
      {/* </div> */}
    </div>
  );
};

export default ModernRegistration;
