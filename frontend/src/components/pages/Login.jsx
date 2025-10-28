import React, { useContext, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Context } from "../../main";
import axiosInstance from "../../utils/axios";
import toast from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const { mode, isAuthenticated, setIsAuthenticated, setUser } = useContext(Context);
  const navigateTo = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    // Validate all fields
    if (!email || !password || !role) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      const { data } = await axiosInstance.post("/user/login", {
        email,
        password,
        role,
      });
      
      setIsAuthenticated(true);
      setUser(data.user);
      toast.success(data.message);
      setEmail("");
      setPassword("");
      setRole("");
      navigateTo("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred while logging in");
    }
  };

  if(isAuthenticated){
    return <Navigate to={'/'}/>
  }

  return (
    <article className={mode === "dark" ? "dark-bg" : "light-bg"}>
      <section className="auth-form">
        <form onSubmit={handleLogin}>
          <h1>LOGIN</h1>
          <div>
            <select 
              value={role} 
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="">SELECT YOUR ROLE</option>
              <option value="Reader">READER</option>
              <option value="Author">AUTHOR</option>
            </select>
          </div>
          <div>
            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <p>
            Don't have any Account? <Link to={"/register"}>Register Now</Link>
          </p>

          <button 
            className="submit-btn" 
            type="submit"
            disabled={!email || !password || !role}
          >
            LOGIN
          </button>
        </form>
      </section>
    </article>
  );
};

export default Login;