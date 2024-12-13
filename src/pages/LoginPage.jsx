import React, { useState } from "react";
import { UserIcon, KeyIcon } from "lucide-react";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const validateInputs = () => {
    if (!username || !password) {
      setError("Both username and password are required.");
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setIsSuccess(false);

    if (!validateInputs()) return;

    setIsLoading(true);

    // Simulate a login attempt
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      console.log("Login attempt:", { username, password, rememberMe });
      // TODO: Implement blockchain authentication logic
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-800 via-purple-800 to-gray-900 flex items-center justify-center p-6">
      <div className="card w-96 bg-gradient-to-b from-gray-900 to-gray-800 shadow-2xl rounded-lg relative">
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-purple-700 p-4 rounded-full">
          <UserIcon className="text-white w-12 h-12" />
        </div>
        <div className="card-body space-y-4 pt-12">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-purple-400 animate-pulse">SafXest</h2>
            <p className="text-gray-500">Secure IPFS File Storage</p>
          </div>

          {error && (
            <div className="alert alert-error bg-red-300 text-red-900 p-4 rounded-lg animate-shake">
              <span>{error}</span>
            </div>
          )}

          {isSuccess && (
            <div className="alert alert-success bg-green-300 text-green-900 p-4 rounded-lg flex items-center animate-bounce">
              <span>Login successful!</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-gray-400">Username</span>
              </label>
              <div className="flex items-center bg-gray-800 rounded-lg transition-all duration-300 focus-within:ring-2 focus-within:ring-purple-600">
                <span className="p-2 text-gray-400">
                  <UserIcon />
                </span>
                <input
                  type="text"
                  placeholder="Enter your username"
                  className="input input-bordered w-full bg-gray-800 text-gray-300 
                    focus:outline-none 
                    hover:bg-gray-700 
                    transition-colors duration-300"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-gray-400">Password</span>
              </label>
              <div className="flex items-center bg-gray-800 rounded-lg transition-all duration-300 focus-within:ring-2 focus-within:ring-purple-600">
                <span className="p-2 text-gray-400">
                  <KeyIcon />
                </span>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="input input-bordered w-full bg-gray-800 text-gray-300 
                    focus:outline-none 
                    hover:bg-gray-700 
                    transition-colors duration-300"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text text-gray-400">Remember me</span>
                <input
                  type="checkbox"
                  className="checkbox checkbox-purple 
                    hover:ring-2 hover:ring-purple-600 
                    focus:ring-2 focus:ring-purple-600 
                    transition-all duration-300"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
              </label>
            </div>

            <div className="form-control mt-4">
              <button
                type="submit"
                className={`btn bg-purple-700 text-white w-full flex justify-center items-center 
                  ${isLoading
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-purple-800 hover:scale-105 active:scale-95 transition-all duration-300"}
                  focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="animate-spin mr-2">Loading...</span>
                ) : (
                  "Login"
                )}
              </button>
            </div>
          </form>

          <div className="text-center">
            <a
              href="#"
              className="link text-purple-500 hover:text-purple-600 text-sm 
                hover:underline transition-colors duration-300 
                focus:outline-none focus:text-purple-700 focus:underline"
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