import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User, ArrowLeft, ChevronRight } from 'lucide-react';

const Authentication = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Top Navigation Bar */}
      <div className="sticky top-0 bg-white px-4 py-3 flex items-center border-b border-gray-100">
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <ArrowLeft className="h-6 w-6 text-gray-700" />
        </button>
        <h1 className="ml-4 text-xl font-semibold">
          {isLogin ? 'Sign In' : 'Create Account'}
        </h1>
      </div>

      <div className="px-4 pt-6 pb-4 space-y-6">

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div className="space-y-2">
              <label className="block text-[4vw] leading-[5.333333vw]">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="block w-full pl-11 pr-4 py-3 border border-gray-200 rounded-[2.133333vw] outline-none"
                  placeholder="Enter your full name"
                  required={!isLogin}
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <label className="block text-[4vw] leading-[5.333333vw]">Email</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="block w-full pl-11 pr-4 py-3 border border-gray-200 rounded-[2.133333vw]  outline-none"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-[4vw] leading-[5.333333vw]">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="block w-full pl-11 pr-12 py-3 border border-gray-200 rounded-[2.133333vw] outline-none"
                placeholder="Create a password"
                required
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
          </div>

          {/* Bottom Action Buttons */}
          <div className="pt-6 space-y-4">
            <button
                className={`mt-[2.666667vw] p-[0_4.266667vw] rounded-[2.133333vw] h-[12.8vw] text-[4.266667vw] text-white ${
                // loading || !isFormValid
                //     ? "bg-gray-400 cursor-not-allowed"
                //     : 
                "bg-[#4CA335] active:bg-[#459330] hover:bg-[#3e8c2a]"
                } w-full outline-none`}
                type="button"
                onClick={handleSubmit}
                aria-label="Confirm"
            >
                <div>{isLogin ? 'Sign in' : 'Create account'}</div>
            </button>

            <div
              className="w-full text-center text-sm ">
              {isLogin ? (
                <>
                    Don't have an account? <span className="text-[#459330] font-medium cursor-pointer" onClick={() => setIsLogin(!isLogin)}>Sign up</span>
                </>
                ) : (
                <>
                    Already have an account? <span className="text-[#459330] font-medium cursor-pointer" onClick={() => setIsLogin(!isLogin)}>Sign in</span>
                </>
                )}

            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Authentication;