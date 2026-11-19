import React, { useState } from "react";
import {
    FiAtSign,
    FiMail,
    FiLock,
    FiEye,
    FiEyeOff,
    FiMessageSquare,
    FiArrowRight,
} from "react-icons/fi";
import api from "../Api/api";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";


export default function Signup() {
    let dispatch = useDispatch()
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate()

    const handleSignup = async (e) => {
        e.preventDefault();
        setError("");

        if (!username.trim() || !email.trim() || !password) {
            setError("Please fill in all fields.");
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            setLoading(true);
            // Yahan apni signup API call lagayein
            let result = await api.post(`/auth/signup`, { password, userName: username, email })
            dispatch(setUserData(result.data))
            navigate("/dashboard")
        } catch (err) {
            setError(err?.response?.data?.message || "Could not create account.");
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
                        <h1 className="text-xl font-bold tracking-tight">Create Account</h1>
                        <p className="text-xs text-[var(--text-secondary)]">
                            Join ChatFlow and start chatting right away
                        </p>
                    </div>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="mb-4 px-3.5 py-2.5 rounded-xl bg-[var(--status-error)]/10 border border-[var(--status-error)]/30 text-[var(--status-error)] text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSignup} className="space-y-4">
                    {/* Username */}
                    <div>
                        <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">
                            Username
                        </label>
                        <div className="relative">
                            <FiAtSign className="w-4 h-4 text-[var(--text-muted)] absolute left-3.5 top-1/2 -translate-y-1/2" />
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="username"
                                className="w-full bg-[var(--bg-input)] text-[var(--text-primary)] placeholder-[var(--text-muted)] text-sm rounded-xl pl-10 pr-3.5 py-2.5 border border-[var(--border-subtle)] focus:outline-none focus:border-[var(--border-focus)] transition"
                            />
                        </div>
                    </div>

                    {/* Email */}
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

                    {/* Password with Show / Hide */}
                    <div>
                        <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">
                            Password
                        </label>
                        <div className="relative">
                            <FiLock className="w-4 h-4 text-[var(--text-muted)] absolute left-3.5 top-1/2 -translate-y-1/2" />
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Create a password"
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

                    {/* Confirm Password with Show / Hide */}
                    <div>
                        <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">
                            Confirm Password
                        </label>
                        <div className="relative">
                            <FiLock className="w-4 h-4 text-[var(--text-muted)] absolute left-3.5 top-1/2 -translate-y-1/2" />
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirm your password"
                                className="w-full bg-[var(--bg-input)] text-[var(--text-primary)] placeholder-[var(--text-muted)] text-sm rounded-xl pl-10 pr-11 py-2.5 border border-[var(--border-subtle)] focus:outline-none focus:border-[var(--border-focus)] transition"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword((prev) => !prev)}
                                aria-label={
                                    showConfirmPassword
                                        ? "Hide confirm password"
                                        : "Show confirm password"
                                }
                                className="text-[var(--text-muted)] hover:text-[var(--text-primary)] absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-lg transition cursor-pointer"
                            >
                                {showConfirmPassword ? (
                                    <FiEyeOff className="w-4 h-4" />
                                ) : (
                                    <FiEye className="w-4 h-4" />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Signup Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full mt-1 inline-flex items-center justify-center gap-2 bg-[var(--accent-primary)] hover:bg-[var(--accent-primary-hover)] disabled:opacity-60 text-white font-medium text-sm py-2.5 px-4 rounded-xl transition cursor-pointer"
                    >
                        <span>{loading ? "Creating account..." : "Sign Up"}</span>
                        <FiArrowRight className="w-4 h-4" />
                    </button>
                </form>

                {/* Link to Login Page */}
                <p className="mt-6 text-center text-xs text-[var(--text-secondary)]">
                    Already have an account?{" "}
                    <a
                        href="/login"
                        className="text-[var(--accent-primary)] hover:underline font-semibold"
                    >
                        Login
                    </a>
                </p>
            </section>
        </main>
    );
}