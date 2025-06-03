import { auth, provider, signInWithPopup } from "../../firebase";
import axios from "axios";
import React from "react";

const Login = () => {
  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Send user info to backend to generate JWT token
      const res = await axios.post("http://localhost:4000/auth/google", {
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
      });

      localStorage.setItem("token", res.data.token);
      window.location.href = "/dashboard";
    } catch (err) {
      console.error("Login Error", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#e0f7fa] to-[#f0f4ff] p-4">
      <div className="w-full  bg-white shadow-2xl rounded-2xl p-8 text-center">
        <div className="flex justify-center mb-4">
          <div className="bg-green-100 text-green-600 rounded-full p-3">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M12 11c0-1.105.895-2 2-2s2 .895 2 2-.895 2-2 2-2-.895-2-2z" />
              <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
            </svg>
          </div>
        </div>
        <h2 className="text-2xl font-semibold mb-2">MiniCRM</h2>
        <p className="text-gray-600 mb-6">
          Transform your customer relationships
        </p>
        <h3 className="text-lg font-medium mb-1">Welcome Back</h3>
        <p className="text-sm text-gray-500 mb-6">
          Sign in to access your powerful CRM dashboard
        </p>
        <button
          onClick={handleLogin}
          className="bg-white text-gray-700 border border-gray-300 rounded-md shadow px-4 py-2 flex items-center justify-center w-full hover:bg-gray-50 transition"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5 mr-2"
          />
          Continue with Google
        </button>

        <div className="mt-6 text-xs text-gray-400">Why choose MiniCRM?</div>

        <div className="mt-4 text-left space-y-3">
          <div className="bg-green-50 border-l-4 border-green-500 p-3 rounded text-sm">
            ✅ <strong>Smart Analytics:</strong> Track performance in real-time
          </div>
          <div className="bg-blue-50 border-l-4 border-blue-500 p-3 rounded text-sm">
            ⚙️ <strong>Workflow Automation:</strong> Save time with smart
            processes
          </div>
          <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded text-sm">
            🔒 <strong>Secure & Reliable:</strong> Enterprise-grade security
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
