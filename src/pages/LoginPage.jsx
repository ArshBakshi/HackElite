import React, { useState } from "react";
import { KeyIcon, LockIcon } from "lucide-react";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement blockchain authentication logic
    console.log("Login attempt:", { username, password });
  };

  return (
    <div className="min-h-screen bg-base-300 flex items-center justify-center p-4">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-primary">SafXest</h2>
            <p className="text-base-content/70">Secure IPFS File Storage</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-base-content">Username</span>
              </label>
              <div className="input-group">
                <span className="bg-base-200">
                  <KeyIcon className="text-base-content" />
                </span>
                <input
                  type="text"
                  placeholder="Enter your username"
                  className="input input-bordered w-full focus:outline-primary"
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
              <div className="input-group">
                <span className="bg-base-200">
                  <LockIcon className="text-base-content" />
                </span>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="input input-bordered w-full focus:outline-primary"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-control mt-6">
              <button
                type="submit"
                className="btn btn-primary hover:bg-primary-focus transition-colors duration-300"
              >
                Login
              </button>
            </div>
          </form>

          <div className="text-center">
            <a
              href="#"
              className="link link-hover text-base-content/70 text-sm"
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
