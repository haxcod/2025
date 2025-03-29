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
  KeyRound,
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
  
  // OTP related states
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpValue, setOtpValue] = useState("");
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpError, setOtpError] = useState("");
  const [otpResendTimer, setOtpResendTimer] = useState(0);

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

  // OTP resend timer
  useEffect(() => {
    let interval;
    if (otpResendTimer > 0) {
      interval = setInterval(() => {
        setOtpResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [otpResendTimer]);

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

    if (!otpVerified) {
      newErrors.otp = "Email verification is required.";
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
      const requestData = { ...formData, fingerprint, emailVerified: otpVerified };

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
        navigate("/login");
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

  const handleOtpChange = (e) => {
    setOtpValue(e.target.value);
    setOtpError("");
  };

  const handleErrorPopup = () => {
    setErrors(false);
    setLoading(false);
  };

  const sendOtp = async () => {
    // Validate email before sending OTP
    const emailRegex = /\S+@\S+\.\S+/;
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      setErrors((prev) => ({
        ...prev,
        email: "Please enter a valid email address.",
      }));
      return;
    }

    setOtpLoading(true);
    setOtpError("");

    try {
      // Simulate API call to send OTP
      const response = await postData("/api/v1/send-otp", {
        email: formData.email,
        isNewAccount:true,
      });
      
      if (response.success) {
        setOtpSent(true);
        setOtpResendTimer(60); // Set a 60-second timer for resend
      }
      
    } catch (error) {
      const errorMessage = 
      error.response.data?.error || error.response.data?.message || 
        "Failed to send OTP. Please try again.";
      
      setOtpError(
        errorMessage
      );
    } finally {
      setOtpLoading(false);
    }
  };

  const verifyOtp = async () => {
    if (!otpValue || otpValue.length !== 6) {
      setOtpError("Please enter a valid 6-digit OTP");
      return;
    }

    setOtpLoading(true);
    setOtpError("");

    try {
      // Simulate API call to verify OTP
      const response = await postData("/api/v1/verify-otp", {
        email: formData.email,
        otp: otpValue,
      });
      
      if (response.success) {
        setOtpVerified(true);
      }
    } catch (error) {
      setOtpError(
        error.response?.data?.message || "Invalid OTP. Please try again."
      );
    } finally {
      setOtpLoading(false);
    }
  };

  const resetOtp = () => {
    setOtpSent(false);
    setOtpVerified(false);
    setOtpValue("");
  };

  return (
    <div className="h-full flex bg-[#f0f4f0]">
      <div className="w-full bg-white">
        <div className="p-6 py-[14vw] w-full flex flex-col items-center">
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
            {/* Name Field */}
            <div className="relative w-full mt-4">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="text-[#4CA335]" />
              </div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full pl-10 pr-4 py-3 border-2 rounded-[2.133333vw] 
                  ${
                    errors.name
                      ? "border-red-500 bg-red-50"
                      : "border-gray-200 focus:border-[#4CA335]"
                  } 
                  transition-all duration-300 ease-in-out`}
                placeholder="Enter your name"
                required
                disabled={loading}
                autoCorrect="off"
                spellCheck="false"
              />
            </div>
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}

            {/* Mobile Field */}
            <div className="relative w-full mt-4">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Smartphone className="text-[#4CA335]" />
              </div>
              <input
                type="text"
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
                placeholder="Enter your mobile"
                required
                disabled={loading}
                autoCorrect="off"
                spellCheck="false"
                maxLength={10}
              />
            </div>
            {errors.mobile && (
              <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>
            )}

            {/* Email Field */}
            <div className="relative w-full mt-4">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="text-[#4CA335]" />
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full pl-10 pr-4 py-3 border-2 rounded-[2.133333vw] 
                  ${
                    errors.email
                      ? "border-red-500 bg-red-50"
                      : "border-gray-200 focus:border-[#4CA335]"
                  } 
                  transition-all duration-300 ease-in-out
                  ${otpVerified ? "bg-green-50 border-green-500" : ""}`}
                placeholder="Enter your email"
                required
                disabled={loading || otpVerified}
                autoCorrect="off"
                spellCheck="false"
              />
              {otpVerified && (
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <span className="text-green-500 text-sm font-medium">Verified</span>
                </div>
              )}
              {!otpVerified && (
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button
                    type="button"
                    onClick={sendOtp}
                    disabled={otpLoading || otpResendTimer > 0 || !formData.email}
                    className={`text-sm font-medium ${
                      otpLoading || otpResendTimer > 0 || !formData.email
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-[#4CA335] hover:text-[#3e8c2a]"
                    }`}
                  >
                    {otpLoading
                      ? "Sending..."
                      : otpResendTimer > 0
                      ? `Resend in ${otpResendTimer}s`
                      : otpSent
                      ? "Resend OTP"
                      : "Send OTP"}
                  </button>
                </div>
              )}
            </div>
            {otpError && (
                  <p className="text-red-500 text-sm mt-1">{otpError}</p>
                )}  
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}

            {/* OTP Verification Field (shows only when OTP is sent) */}
            {otpSent && !otpVerified && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-4"
              >
                <div className="relative w-full">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <KeyRound className="text-[#4CA335]" />
                  </div>
                  <input
                    type="text"
                    value={otpValue}
                    onChange={handleOtpChange}
                    className={`w-full pl-10 pr-28 py-3 border-2 rounded-[2.133333vw] 
                      ${
                        otpError
                          ? "border-red-500 bg-red-50"
                          : "border-gray-200 focus:border-[#4CA335]"
                      }`}
                    placeholder="Enter 6-digit OTP"
                    maxLength={6}
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <button
                      type="button"
                      onClick={verifyOtp}
                      disabled={otpLoading || otpValue.length !== 6}
                      className={`text-sm font-medium ${
                        otpLoading || otpValue.length !== 6
                          ? "text-gray-400 cursor-not-allowed"
                          : "text-[#4CA335] hover:text-[#3e8c2a]"
                      }`}
                    >
                      {otpLoading ? "Verifying..." : "Verify OTP"}
                    </button>
                  </div>
                </div>
                {otpError && (
                  <p className="text-red-500 text-sm mt-1">{otpError}</p>
                )}
                <p className="text-gray-500 text-sm mt-2">
                  We've sent a verification code to {formData.email}
                </p>
              </motion.div>
            )}

            {/* Password Field - Now below OTP */}
            <div className="relative w-full mt-4">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="text-[#4CA335]" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={`w-full pl-10 pr-10 py-3 border-2 rounded-[2.133333vw] 
                  ${
                    errors.password
                      ? "border-red-500 bg-red-50"
                      : "border-gray-200 focus:border-[#4CA335]"
                  } 
                  transition-all duration-300 ease-in-out`}
                placeholder="Enter your password"
                required
                disabled={loading}
                autoCorrect="off"
                spellCheck="false"
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

            {/* OTP verification error */}
            {errors.otp && (
              <p className="text-red-500 text-sm mt-3">{errors.otp}</p>
            )}

            {/* Optional Invite Code */}
            {!isInviteCode && (
              <div className={`relative mt-4`}>
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
            <div className="flex items-start space-x-2 mt-4">
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
            {errors.termsAccepted && (
              <p className="text-red-500 text-sm mt-1">{errors.termsAccepted}</p>
            )}

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
    </div>
  );
};

export default ModernRegistration;