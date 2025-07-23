import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [auth,setAuth] = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
    if (!email || !password) {
      alert("All fields are required");
      return;
    }
    try {
      const response = await axios.post("http://localhost:8080/auth/login", {
        email,
        password,
      });
      console.log(response.data);
      
      const {success, message, jwtToken, name, error} = response.data;

      if (response.data.success) {
        toast.success(response.data.message);

        setAuth({
          ...auth, user:name, token:jwtToken
        })
        localStorage.setItem("auth", JSON.stringify(response.data));

        setTimeout(() => {
          navigate("/home");
        }, 2000);

        // setFormData({name: "", email: "", password: ""});
      }
    } catch (error) {
      console.log(error);
      //toast.error("Something went wrong");
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-emerald-200">
      <div className="bg-white p-8 rounded-xl shadow-2xl border border-gray-300 w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-all"
          >
            Login
          </button>
        </form>
        {/* Forgot Password */}
        <p className="mt-3 text-center text-gray-600">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              alert("Forgot Password feature coming soon!");
            }}
            className="text-blue-500 hover:underline"
          >
            Forgot Password?
          </a>
        </p>

        {/* Register */}
        <p className="mt-4 text-center text-gray-600">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500 hover:underline">
            Register here
          </Link>
        </p>
      </div>
      <Toaster />
    </div>
  );
};

export default Login;
