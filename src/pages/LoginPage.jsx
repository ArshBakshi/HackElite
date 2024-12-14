import React, { useState } from "react";
import { KeyIcon, LockIcon } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          username,
          password,
        }
      );

      setSuccessMessage(response.data.message);
      setErrorMessage("");

      setTimeout(() => {
        navigate("/home");
      }, 1000);
    } catch (error) {
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message);
        setSuccessMessage("");
      } else {
        setErrorMessage("Server error");
        setSuccessMessage("");
      }
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#0D1117] flex items-center justify-center p-4">
      {/* Enhanced animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20 transition-opacity duration-500 ease-in-out" 
             style={{ opacity: isHovered ? 0.4 : 0.2 }} />
        <div className="absolute -top-32 -left-32 w-64 h-64 bg-blue-500/30 rounded-full blur-3xl animate-pulse transition-transform duration-700 ease-in-out"
             style={{ transform: isHovered ? 'scale(1.1)' : 'scale(1)' }} />
        <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-purple-500/30 rounded-full blur-3xl animate-pulse transition-transform duration-700 ease-in-out"
             style={{ transform: isHovered ? 'scale(1.1)' : 'scale(1)' }} />
      </div>

      {/* Enhanced card with hover effects */}
      <div 
        className="card w-96 bg-base-100 shadow-xl relative z-10 transition-all duration-300 ease-in-out hover:shadow-2xl"
        style={{ 
          transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="card-body space-y-6">
          <div className="text-center transition-transform duration-300 ease-in-out" 
               style={{ transform: isHovered ? 'scale(1.02)' : 'scale(1)' }}>
            <h2 className="text-3xl font-bold text-primary"
                style={{
                  animation: 'lightUpDim 2s ease-in-out infinite'
                }}>
              BlockSafe
            </h2>
            <style>{`
              @keyframes lightUpDim {
                0%, 100% { 
                  opacity: 0.5;
                  color: rgb(56, 189, 248, 0.7);
                }
                50% { 
                  opacity: 1;
                  color: rgb(56, 189, 248);
                }
              }
            `}</style>
            <p className="text-base-content/70">Secure IPFS File Storage</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-base-content">Username</span>
              </label>
              <div className="input-group transition-transform duration-200 ease-in-out hover:scale-[1.02]">
                <span className="bg-base-200 transition-colors duration-200 hover:bg-base-300">
                  <KeyIcon className="text-base-content" />
                </span>
                <input
                  type="text"
                  placeholder="Enter your username"
                  className="input input-bordered w-full focus:outline-primary transition-all duration-200 ease-in-out hover:border-primary"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-base-content">Password</span>
              </label>
              <div className="input-group transition-transform duration-200 ease-in-out hover:scale-[1.02]">
                <span className="bg-base-200 transition-colors duration-200 hover:bg-base-300">
                  <LockIcon className="text-base-content" />
                </span>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="input input-bordered w-full focus:outline-primary transition-all duration-200 ease-in-out hover:border-primary"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-control mt-6">
              <button
                type="submit"
                className="btn btn-primary hover:bg-primary-focus transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg active:scale-95"
              >
                Login
              </button>
            </div>
          </form>

          {errorMessage && (
            <div className="text-center text-red-500 transition-all duration-300">{errorMessage}</div>
          )}
          {successMessage && (
            <div className="text-center text-green-500 transition-all duration-300">{successMessage}</div>
          )}

          <div className="text-center">
            <a
              href="#"
              className="link link-hover text-base-content/70 text-sm transition-colors duration-200 hover:text-primary"
            >
              Forgot Password?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;