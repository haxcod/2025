import React, { useState } from 'react';
import { Eye, EyeOff, Smartphone, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import ErrorPopup from '../components/ErrorPopup';
import SuccessPopup from '../components/SuccessPopup';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ mobile: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [isErrorPopup, setIsErrorPopup] = useState(false);
  const [isSuccessPopup, setIsSuccessPopup] = useState(false);
  const [cookies, setCookie] = useCookies(['user']); // Initialize cookies
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    const mobileRegex = /^\d{10}$/;

    if (!formData.mobile.trim()) {
      newErrors.mobile = 'Mobile number is required.';
    } else if (!mobileRegex.test(formData.mobile)) {
      newErrors.mobile = 'Enter a valid 10-digit mobile number.';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required.';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setErrors({});

    try {
      const response = await axios.post('http://localhost:3000/api/v1/login', formData);

      if (response.status === 200) {
        const { data } = response.data; // Assuming user data is in `response.data.data`

        // Save user data in cookies
        setCookie('user', JSON.stringify(data), { path: '/', maxAge: 86400 }); // Cookie valid for 1 day

        setFormData({ mobile: '', password: '' });
        setIsSuccessPopup(true); // Show success popup

        setTimeout(() => navigate('/'), 1000);
      } else {
        setErrors({ apiError: 'Unexpected response. Please try again.' });
        setIsErrorPopup(true); // Show error popup
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || 'Login failed. Please check your credentials and try again.';
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
    <div className="min-h-screen bg-white">
      {/* Top Navigation */}
      <div className="sticky top-0 bg-white px-4 py-3 flex items-center justify-center border-b border-gray-100">
        <h1 className="text-center text-xl font-semibold">Log In</h1>
      </div>

      <div className="px-4 pt-6 pb-4 space-y-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Mobile Number */}
          <div className="space-y-2">
            <label className="block text-[4vw] leading-[5.333333vw]">Mobile Number</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Smartphone className="text-gray-400" />
              </div>
              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleInputChange}
                className="block w-full pl-11 pr-4 py-3 border border-gray-200 rounded-[2.133333vw] outline-none"
                placeholder="Enter your mobile number"
                required
                disabled={loading}
              />
            </div>
            {errors.mobile && <p className="text-red-500">{errors.mobile}</p>}
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label className="block text-[4vw] leading-[5.333333vw]">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className=" text-gray-400" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="block w-full pl-11 pr-12 py-3 border border-gray-200 rounded-[2.133333vw] outline-none"
                placeholder="Enter your password"
                required
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
            {errors.password && <p className="text-red-500">{errors.password}</p>}
          </div>

          {/* Popups */}
          {isErrorPopup && <ErrorPopup error={errors.apiError} handleClose={handlePopupClose} />}
          {isSuccessPopup && (
            <SuccessPopup message="Login successful! Redirecting..." handleClose={handlePopupClose} />
          )}

          {/* Submit Button */}
          <div className="pt-6 space-y-4">
            <button
              className="w-full bg-[#4CA335] hover:bg-[#3e8c2a] text-white py-3 rounded-[2.133333vw] text-[4.266667vw]"
              type="submit"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Sign In'}
            </button>

            <div className="w-full text-center text-sm">
              Don't have an account?{' '}
              <span
                className="text-[#459330] font-medium cursor-pointer"
                onClick={() => navigate('/register')}
              >
                Sign Up
              </span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
