import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const Auth = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(true);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleAuthMode = () => setIsSignUp(!isSignUp);

  const leftVariants = {
    initial: { x: isSignUp ? -100 : 100, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: isSignUp ? 100 : -100, opacity: 0 },
  };

  const rightVariants = {
    initial: { x: isSignUp ? 100 : -100, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: isSignUp ? -100 : 100, opacity: 0 },
  };

  const imageVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        delay: 0.6,
        duration: 0.6,
      },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.3 },
    },
  };

  return (
    <div className="w-full h-screen flex bg-[#d6c7bd] overflow-hidden relative">
      {/* Left Side Animation */}
      <AnimatePresence mode="wait">
        <motion.div
          key={isSignUp ? "left-signup" : "left-signin"}
          variants={leftVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.5 }}
          className="w-1/2 bg-[#d6c7bd] flex flex-col items-start pl-20 pt-32 relative z-10"
        >
          <div className="max-w-md">
            <h2 className="text-3xl font-semibold text-[#4a2d24] leading-relaxed">
              <span className="block">
                Focus on <span className="text-black font-bold">care</span>, not{" "}
                <span className="italic text-gray-700">complexity</span>.
              </span>
              <span className="block mt-2">
                <span className="text-[#8b5e3c] font-bold">Enroll</span>{" "}
                clients.
                <span className="text-[#8b5e3c] font-bold ml-1">
                  Manage 
                </span>{" "}
                programs.
                <span className="text-[#8b5e3c] font-bold ml-1">
                  Access
                </span>{" "}
                health data.
              </span>
              <span className="block mt-2 text-gray-600">
                Exactly when you need it most.
              </span>
            </h2>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Right Side Animation */}
      <AnimatePresence mode="wait">
        <motion.div
          key={isSignUp ? "right-signup" : "right-signin"}
          variants={rightVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.5 }}
          className="w-1/2 flex flex-col justify-center items-center bg-white shadow-lg rounded-l-3xl z-10 px-10"
        >
          <div className="w-full max-w-md">
            <h2 className="text-3xl font-bold mb-8 text-center">
              {isSignUp ? "Create Account" : "Sign In"}
            </h2>
            <form className="space-y-6">
              {isSignUp && (
                <>
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
                </>
              )}
              <div>
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-black py-2"
                />
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
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
                  {isSignUp ? "Create Account" : "Sign In"}
                </button>
              </div>
            </form>
            <p className="text-center text-sm text-gray-500 mt-6">
              {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
              <button
                type="button"
                onClick={toggleAuthMode}
                className="text-[#D6C1B5] hover:underline ml-1"
              >
                {isSignUp ? "Sign In" : "Create Account"}
              </button>
            </p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Bouncing Image with delayed fade in/out */}
      <AnimatePresence mode="wait">
        <motion.img
          key={isSignUp ? "auth-signup-image" : "auth-signin-image"}
          src="/auth.png"
          alt="Auth Visual"
          className="absolute top-40 left-165 transform -translate-x-1/2 w-[450px] h-[450px] object-contain z-20"
          variants={imageVariants}
          initial="initial"
          animate={{
            ...imageVariants.animate,
            y: [0, -15, 0],
            transition: {
              ...imageVariants.animate.transition,
              y: {
                duration: 2,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
              },
            },
          }}
          exit="exit"
        />
      </AnimatePresence>
    </div>
  );
};

export default Auth;
