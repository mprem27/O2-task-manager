import React, { useState } from "react";
import { UserPlus, Loader2, AlertCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import loginImage from "../assets/login.svg";
// import loginImage from "../assets/login.png";
import logo from "../assets/logo.svg";
// import logo from "../assets/logo.png";
import { useAuth } from "../context/AuthContext.jsx";
import { useTheme } from "../context/ThemeContext.jsx"; // Add this import

const Register = () => {
  const navigate = useNavigate();
  const { register, loading } = useAuth();
  const { theme } = useTheme(); // Add this hook

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: ""
  });

  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value
    }));

    if (error) setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    try {
      await register({
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        password: form.password
      });

      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please check your details and try again.");
    }
  };

  return (
    <main className="min-h-screen grid place-items-center bg-gray-50 p-4 sm:p-8 dark:bg-slate-950">
      <section className="w-full max-w-5xl grid lg:grid-cols-2 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl dark:border-slate-800 dark:bg-slate-900">
        
        <div className="hidden lg:flex flex-col items-center justify-center bg-blue-50 p-12 dark:bg-slate-900/50">
          <img 
            src={loginImage} 
            alt="Task Management Illustration" 
            className="max-w-md w-full drop-shadow-md transition-transform duration-500 hover:scale-105" 
            loading="lazy"
          />
        </div>

        <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-16">
          
          <div className="mb-6 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 shadow-md">
              {/* UPDATED: Added dynamic theme check to the className */}
              <img 
                src={logo} 
                alt="Logo" 
                className={`h-8 w-8 ${theme === 'dark' ? 'brightness-0 invert' : ''}`} 
              />
            </div>
            
            <div>
              <h1 className="text-xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                O2H Task Manager
              </h1>
              <p className="text-sm font-medium text-gray-500 dark:text-slate-400">
                Create your workspace
              </p>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Create Account
            </h2>
            <p className="mt-2 text-sm text-gray-500 dark:text-slate-400">
              Fill in your details below to set up your personal task manager.
            </p>
          </div>

          {error && (
            <div className="mb-6 flex items-center gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700 dark:border-red-900/50 dark:bg-red-900/20 dark:text-red-400">
              <AlertCircle size={18} className="flex-shrink-0" />
              <p>{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div>
              <label htmlFor="name" className="mb-1.5 block text-sm font-semibold text-gray-700 dark:text-slate-300">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="John Doe"
                className="h-11 w-full rounded-lg border border-gray-300 bg-white px-4 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:border-blue-400 dark:focus:ring-blue-900/30"
              />
            </div>

            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-gray-700 dark:text-slate-300">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="name@example.com"
                className="h-11 w-full rounded-lg border border-gray-300 bg-white px-4 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:border-blue-400 dark:focus:ring-blue-900/30"
              />
            </div>

            <div>
              <label htmlFor="phone" className="mb-1.5 block text-sm font-semibold text-gray-700 dark:text-slate-300">
                Phone Number <span className="text-gray-400 font-normal">(Optional)</span>
              </label>
              <input
                id="phone"
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="+91 123 456 7890"
                className="h-11 w-full rounded-lg border border-gray-300 bg-white px-4 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:border-blue-400 dark:focus:ring-blue-900/30"
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-1.5 block text-sm font-semibold text-gray-700 dark:text-slate-300">
                Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                minLength="6"
                placeholder="Minimum 6 characters"
                className="h-11 w-full rounded-lg border border-gray-300 bg-white px-4 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:border-blue-400 dark:focus:ring-blue-900/30"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-4 inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 text-sm font-bold text-white shadow-sm transition-all hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-blue-400 dark:disabled:bg-blue-800"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  <span>Creating account...</span>
                </>
              ) : (
                <>
                  <UserPlus size={18} strokeWidth={2.5} />
                  <span>Register</span>
                </>
              )}
            </button>

            <p className="mt-6 text-center text-sm font-medium text-gray-600 dark:text-slate-400">
              Already have an account?{" "}
              <Link to="/login" className="font-bold text-blue-600 transition-colors hover:text-blue-700 hover:underline dark:text-blue-400 dark:hover:text-blue-300">
                Sign in here
              </Link>
            </p>

          </form>
        </div>
      </section>
    </main>
  );
};

export default Register;