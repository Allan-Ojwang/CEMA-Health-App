import React, { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';

const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#fefefe]">
      <div className="w-full max-w-md p-10 bg-white shadow-md">
        <h2 className="text-3xl font-bold mb-8 text-center">Create Account</h2>
        <form className="space-y-6">
          <div>
            <input
              type="text"
              placeholder="Full Name"
              className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-black py-2"
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Medical License Number"
              className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-black py-2"
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Email Address"
              className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-black py-2"
            />
          </div>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-black py-2 pr-10"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-2 top-2 text-gray-500"
            >
              {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </button>
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-[#D6C1B5] hover:bg-[#cbb1a4] text-black font-semibold py-2 rounded-md transition"
            >
              Create Account
            </button>
          </div>
        </form>
        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{' '}
          <a href="#" className="text-[#D6C1B5] hover:underline">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUpForm;
