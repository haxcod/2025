import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Mail, ArrowLeft, Lock, EyeOff, Eye } from 'lucide-react';
import Logo from '/logo-rounded.png';
import { postData } from '../services/apiService';

const ForgotPassword = () => {
  const [step, setStep] = useState('email'); // 'email', 'otp', 'password'
  const [formData, setFormData] = useState({
    email: '',
    otp: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [remainingTime, setRemainingTime] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const validateEmail = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Enter a valid email address.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateOTP = () => {
    const newErrors = {};
    const otpRegex = /^\d{6}$/;

    if (!formData.otp.trim()) {
      newErrors.otp = 'OTP is required.';
    } else if (!otpRegex.test(formData.otp)) {
      newErrors.otp = 'Enter a valid 6-digit OTP.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePassword = () => {
    const newErrors = {};

    if (!formData.newPassword.trim()) {
      newErrors.newPassword = 'New password is required.';
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters.';
    }

    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = 'Confirm password is required.';
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSendOTP = async (e) => {
    e.preventDefault();
    if (!validateEmail()) return;

    setLoading(true);
    try {
      const response = await postData("/api/v1/forgot-password/send-otp", { 
        email: formData.email 
      });

      if (response.status === 200) {
        setStep('otp');
        startOTPTimer();
      } else {
        setErrors({ apiError: "Failed to send OTP. Please try again." });
      }
    } catch (error) {
      const errorMessage = 
        error.response?.data?.message || 
        "Failed to send OTP. Please try again.";
      setErrors({ apiError: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    if (!validateOTP()) return;

    setLoading(true);
    try {
      const response = await postData("/api/v1/forgot-password/verify-otp", { 
        email: formData.email,
        otp: formData.otp 
      });

      if (response.status === 200) {
        setStep('password');
      } else {
        setErrors({ apiError: "Invalid OTP. Please try again." });
      }
    } catch (error) {
      const errorMessage = 
        error.response?.data?.message || 
        "OTP verification failed. Please try again.";
      setErrors({ apiError: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!validatePassword()) return;

    setLoading(true);
    try {
      const response = await postData("/api/v1/forgot-password/reset", { 
        email: formData.email,
        otp: formData.otp,
        newPassword: formData.newPassword 
      });

      if (response.status === 200) {
        // Show success message and navigate to login
        navigate('/login', { 
          state: { 
            successMessage: 'Password reset successfully. Please log in.' 
          } 
        });
      } else {
        setErrors({ apiError: "Password reset failed. Please try again." });
      }
    } catch (error) {
      const errorMessage = 
        error.response?.data?.message || 
        "Password reset failed. Please try again.";
      setErrors({ apiError: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  const startOTPTimer = () => {
    setRemainingTime(180); // 3 minutes
    const timer = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleResendOTP = async () => {
    if (remainingTime > 0) return;

    setLoading(true);
    try {
      const response = await postData("/api/v1/forgot-password/resend-otp", { 
        email: formData.email 
      });

      if (response.status === 200) {
        startOTPTimer();
        setFormData(prev => ({ ...prev, otp: '' }));
      } else {
        setErrors({ apiError: "Failed to resend OTP. Please try again." });
      }
    } catch (error) {
      const errorMessage = 
        error.response?.data?.message || 
        "Failed to resend OTP. Please try again.";
      setErrors({ apiError: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const renderStep = () => {
    switch(step) {
      case 'email':
        return (
          <form onSubmit={handleSendOTP} className="w-full space-y-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="text-[#4CA335]" />
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full pl-10 pr-4 py-3 border-2 rounded-[2.133333vw] 
                  ${errors.email 
                    ? 'border-red-500 bg-red-50' 
                    : 'border-gray-200 focus:border-[#4CA335]'} 
                  transition-all duration-300 ease-in-out`}
                placeholder="Enter your email"
                disabled={loading}
                required
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <button
              className={`w-full py-3 rounded-[2.133333vw] text-white font-semibold transition-all duration-300 
                ${loading 
                  ? 'bg-[#86c75a] cursor-not-allowed' 
                  : 'bg-[#4CA335] hover:bg-[#3e8c2a]'}`}
              type="submit"
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Send OTP'}
            </button>
          </form>
        );

      case 'otp':
        return (
          <form onSubmit={handleVerifyOTP} className="w-full space-y-4">
            <div className="relative">
              <input
                type="text"
                name="otp"
                value={formData.otp}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border-2 rounded-[2.133333vw] text-center tracking-[10px] text-2xl 
                  ${errors.otp 
                    ? 'border-red-500 bg-red-50' 
                    : 'border-gray-200 focus:border-[#4CA335]'} 
                  transition-all duration-300 ease-in-out`}
                placeholder="Enter OTP"
                disabled={loading}
                maxLength={6}
                inputMode="numeric"
                required
              />
              {errors.otp && (
                <p className="text-red-500 text-sm mt-1 text-center">{errors.otp}</p>
              )}
            </div>

            <div className="text-center mt-3">
              {remainingTime > 0 ? (
                <p className="text-sm text-gray-500">
                  OTP expires in {Math.floor(remainingTime / 60)}:
                  {remainingTime % 60 < 10 ? '0' : ''}{remainingTime % 60}
                </p>
              ) : (
                <button
                  type="button"
                  className="text-sm text-[#4CA335] hover:underline"
                  onClick={handleResendOTP}
                  disabled={loading}
                >
                  Resend OTP
                </button>
              )}
            </div>

            <button
              className={`w-full py-3 rounded-[2.133333vw] text-white font-semibold transition-all duration-300 
                ${loading 
                  ? 'bg-[#86c75a] cursor-not-allowed' 
                  : 'bg-[#4CA335] hover:bg-[#3e8c2a]'}`}
              type="submit"
              disabled={loading}
            >
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>
          </form>
        );

      case 'password':
        return (
          <form onSubmit={handleResetPassword} className="w-full space-y-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="text-[#4CA335]" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                name="newPassword"
                value={formData.newPassword}
                onChange={handleInputChange}
                className={`w-full pl-10 pr-12 py-3 border-2 rounded-[2.133333vw] 
                  ${errors.newPassword 
                    ? 'border-red-500 bg-red-50' 
                    : 'border-gray-200 focus:border-[#4CA335]'} 
                  transition-all duration-300 ease-in-out`}
                placeholder="New Password"
                disabled={loading}
                required
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
              {errors.newPassword && (
                <p className="text-red-500 text-sm mt-1">{errors.newPassword}</p>
              )}
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="text-[#4CA335]" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className={`w-full pl-10 pr-12 py-3 border-2 rounded-[2.133333vw] 
                  ${errors.confirmPassword 
                    ? 'border-red-500 bg-red-50' 
                    : 'border-gray-200 focus:border-[#4CA335]'} 
                  transition-all duration-300 ease-in-out`}
                placeholder="Confirm New Password"
                disabled={loading}
                required
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
              )}
            </div>

            <button
              className={`w-full py-3 rounded-[2.133333vw] text-white font-semibold transition-all duration-300 
                ${loading 
                  ? 'bg-[#86c75a] cursor-not-allowed' 
                  : 'bg-[#4CA335] hover:bg-[#3e8c2a]'}`}
              type="submit"
              disabled={loading}
            >
              {loading ? 'Resetting...' : 'Reset Password'}
            </button>
          </form>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Top Navigation */}
      {/* <div className="sticky top-0 bg-white px-4 py-3 flex items-center justify-start border-b border-gray-100 shadow-sm">
        <button
          className="p-2 hover:bg-gray-100 rounded-full mr-4"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-6 w-6 text-[#4CA335]" />
        </button>
        <h1 className="text-xl font-semibold text-[#4CA335]">
          {step === 'email' ? 'Forgot Password' : 
           step === 'otp' ? 'Verify OTP' : 
           'Reset Password'}
        </h1>
      </div> */}

        <div 
          className="w-full h-screen flex items-center justify-center"
        >
          <div className="w-full p-6 flex flex-col items-center">
            <img 
              src={Logo} 
              alt="Logo" 
              className="w-28 h-28 rounded-full border-4 border-[#4CA335] mb-6"
            />
            
            <h2 className="text-2xl font-bold text-[#4CA335] mb-2">
              {step === 'email' ? 'Reset Password' : 
               step === 'otp' ? 'Verify OTP' : 
               'Create New Password'}
            </h2>
            <p className="text-gray-500 mb-6 text-center">
              {step === 'email' ? 'Enter your email to receive OTP' : 
               step === 'otp' ? 'Enter the 6-digit OTP sent to your email' : 
               'Create a new secure password'}
            </p>

            {renderStep()}

            {/* Error Popup */}
            {errors.apiError && (
              <div className="mt-4 w-full bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-[2.133333vw]">
                {errors.apiError}
              </div>
            )}

            {/* Navigation to Login */}
            <div className="text-center text-sm pt-4">
              Remember your password?{" "}
              <span
                className="text-[#4CA335] font-medium cursor-pointer hover:underline"
                onClick={() => navigate("/login")}
              >
                Sign In
              </span>
            </div>
          </div>
        </div>
    </div>
  );
};

export default ForgotPassword;