import React, { useState } from "react";
import {
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiMessageSquare,
  FiArrowRight,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import api from "../Api/api";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../redux/userSlice";

export default function Login() {
  let dispatch = useDispatch()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { userData } = useSelector(state=>state.user)
  console.log(userData);
  
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);
      // Yahan apni login API call lagayein
      let result = await api.post(`/auth/login`, { password, email })
      dispatch(setUserData(result.data))
      navigate("/dashboard")
    } catch (err) {
      console.log(err);
      
      setError(err?.response?.data?.message || "Unable to sign in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen w-full bg-[var(--bg-app)] text-[var(--text-primary)] flex items-center justify-center px-4 py-8">
      <section className="w-full max-w-md bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-2xl p-6 sm:p-8 shadow-2xl">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-11 h-11 rounded-xl bg-[var(--accent-primary)]/15 border border-[var(--accent-primary)]/30 flex items-center justify-center text-[var(--accent-primary)]">
            <FiMessageSquare className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold tracking-tight">ChatFlow</h1>
              <span className="inline-flex items-center gap-1.5 text-xs font-medium px-2 py-0.5 rounded-full bg-[var(--status-online)]/10 text-[var(--status-online)]">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--status-online)]" />
                Chat Friendly
              </span>
            </div>
            <p className="text-xs text-[var(--text-secondary)]">
              Sign in to continue your conversations
            </p>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 px-3.5 py-2.5 rounded-xl bg-[var(--status-error)]/10 border border-[var(--status-error)]/30 text-[var(--status-error)] text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email Input */}
          <div>
            <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <FiMail className="w-4 h-4 text-[var(--text-muted)] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full bg-[var(--bg-input)] text-[var(--text-primary)] placeholder-[var(--text-muted)] text-sm rounded-xl pl-10 pr-3.5 py-2.5 border border-[var(--border-subtle)] focus:outline-none focus:border-[var(--border-focus)] transition"
              />
            </div>
          </div>

          {/* Password Input with Show / Hide */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-medium text-[var(--text-secondary)]">
                Password
              </label>
              <a
                href="/forgot-password"
                className="text-xs text-[var(--accent-secondary)] hover:underline"
              >
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <FiLock className="w-4 h-4 text-[var(--text-muted)] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full bg-[var(--bg-input)] text-[var(--text-primary)] placeholder-[var(--text-muted)] text-sm rounded-xl pl-10 pr-11 py-2.5 border border-[var(--border-subtle)] focus:outline-none focus:border-[var(--border-focus)] transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="text-[var(--text-muted)] hover:text-[var(--text-primary)] absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-lg transition cursor-pointer"
              >
                {showPassword ? (
                  <FiEyeOff className="w-4 h-4" />
                ) : (
                  <FiEye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Remember Me */}
          <label className="inline-flex items-center gap-2 text-xs text-[var(--text-secondary)] cursor-pointer select-none">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 rounded accent-[var(--accent-primary)] cursor-pointer"
            />
            Keep me signed in
          </label>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-1 inline-flex items-center justify-center gap-2 bg-[var(--accent-primary)] hover:bg-[var(--accent-primary-hover)] disabled:opacity-60 text-white font-medium text-sm py-2.5 px-4 rounded-xl transition cursor-pointer"
          >
            <span>{loading ? "Signing in..." : "Login"}</span>
            <FiArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Link to Signup Page */}
        <p className="mt-6 text-center text-xs text-[var(--text-secondary)]">
          Don&apos;t have an account?{" "}
          <a
            href="/signup"
            className="text-[var(--accent-primary)] hover:underline font-semibold"
          >
            Sign up
          </a>
        </p>
      </section>
    </main>
  );
}