import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Eye, EyeOff, Mail, Lock, User, ArrowLeft, Smartphone, SquareCode } from 'lucide-react'; // Ensure SquareCode is imported
import ErrorPopup from '../components/ErrorPopup';
import SuccessPopup from '../components/SuccessPopup';
import { fetchData, postData } from '../services/apiService';

const Registration = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    mobile: '',
    inviteCode: '', // Add inviteCode to formData
    termsAccepted: false,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  const [isInviteCode, setIsInviteCode] = useState('')

  // Use useEffect to get the inviteCode from the URL query params
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const inviteCode = urlParams.get('inviteCode');
    if (inviteCode) {
      setIsInviteCode(inviteCode)
      setFormData((prevData) => ({
        ...prevData,
        inviteCode: inviteCode, // Set the invite code in formData
      }));
    }
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required.';
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Enter a valid email address.';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required.';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters.';
    }

    const mobileRegex = /^\d{10}$/;
    if (!formData.mobile.trim()) {
      newErrors.mobile = 'Mobile number is required.';
    } else if (!mobileRegex.test(formData.mobile)) {
      newErrors.mobile = 'Enter a valid 10-digit mobile number.';
    }

    if (!formData.termsAccepted) {
      newErrors.termsAccepted = 'You must agree to the terms.';
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
    setSuccessMessage('');

    try {
      const response = await postData('/api/v1/register', formData);
      if (response.status === 201) {
        setSuccessMessage('Registration successful! Redirecting...');
        setFormData({
          name: '',
          email: '',
          password: '',
          mobile: '',
          inviteCode: '', 
          termsAccepted: false,
        });
        setTimeout(() => navigate('/login'), 2000); // Redirect to login
      }
    } catch (error) {
      setErrors({
        apiError: error.response?.data?.message || 'An error occurred. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleErrorPopup = () => {
    setErrors(false);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Top Navigation */}
      <div className="sticky top-0 bg-white shadow-sm px-4 py-3 flex items-center border-b border-gray-100">
        <button className="p-2 hover:bg-gray-100 rounded-full" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-6 w-6 text-gray-700" />
        </button>
        <h1 className="ml-4 text-xl font-bold">Create Account</h1>
      </div>

      <div className="px-4 pt-10 pb-4 space-y-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Input Fields */}
          {['name', 'mobile', 'email', 'inviteCode', 'password'].map((field, idx) => {
            const icons = {
              name: <User className='text-gray-400'/>,
              mobile: <Smartphone  className='text-gray-400'/>,
              email: <Mail  className='text-gray-400'/>,
              password: <Lock  className='text-gray-400'/>,
              inviteCode: <SquareCode  className='text-gray-400'/>,
            };

            return (
              <div key={idx} className="space-y-2">
                <label className="block text-[4vw] leading-[5.333333vw] capitalize">{field}</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    {icons[field]}
                  </div>
                  <input
                    type={
                      field === 'password'
                        ? showPassword
                          ? 'text'
                          : 'password'
                        : field === 'email'
                        ? 'email'
                        : 'text'
                    }
                    name={field}
                    value={formData[field]}
                    onChange={handleInputChange}
                    className="block w-full pl-11 pr-4 py-3 border border-gray-200 rounded-[2.133333vw] outline-none"
                    placeholder={`Enter your ${field}`}
                    required={field === 'inviteCode' ? false : true}
                    disabled={loading || isInviteCode}
                    maxLength={field === 'mobile' ? 10 : undefined}
                  />
                  {field === 'password' && (
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
                    </button>
                  )}
                </div>
                {errors[field] && <p className="text-red-500">{errors[field]}</p>}
              </div>
            );
          })}

          {/* Terms and Conditions */}
          <div className="space-y-2">
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
                I agree to the{' '}
                <span className="text-[#459330] font-medium cursor-pointer underline" onClick={() => navigate('/about')}>
                  Terms and Conditions
                </span>
              </label>
            </div>
          </div>

          {/* API Error */}
          {errors.apiError && <ErrorPopup error={errors.apiError} handleClose={handleErrorPopup} />}

          {/* Success Message */}
          {successMessage && <SuccessPopup message={successMessage} />}

          {/* Submit Button */}
          <button
            className="w-full bg-[#4CA335] hover:bg-[#3e8c2a] text-white py-3 rounded-[2.133333vw] text-[4.266667vw]"
            type="submit"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Create Account'}
          </button>

          {/* Navigation to Login */}
          <div className="w-full text-center text-sm">
            Already have an account?{' '}
            <span className="text-[#459330] font-medium cursor-pointer" onClick={() => navigate('/login')}>
              Sign In
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registration;
