import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
    FiArrowLeft,
    FiCamera,
    FiUser,
    FiAtSign,
    FiMail,
    FiCheckCircle,
} from 'react-icons/fi'
import api from '../Api/api'
import { setUserData } from '../redux/userSlice'

const Profile = () => {
    
    const navigate = useNavigate()
    const { userData } = useSelector((state) => state.user)
    const [name, setName] = useState(userData?.name || '')
    const [userName, setUserName] = useState(userData?.userName || '')
    const [email, setEmail] = useState(userData?.email || '')
    const [imagePreview, setImagePreview] = useState(userData?.image || '')
    const fileInputRef = useRef(null)
    const [backendImage, setBackendImage] = useState('')
    const [saving, setSaving] = useState(false)

    const dispatch = useDispatch()

    const handleImageChange = (e) => {
        const file = e.target.files?.[0]
        if (!file) {
            return
        }
        setImagePreview(URL.createObjectURL(file))
        setBackendImage(file)
    }

    const handleSaveProfile = async (e) => {
        e.preventDefault()
        try {
            setSaving(true)
            let formData = new FormData()
            if(name) formData.append("name", name)
            if(backendImage) formData.append("image", backendImage)
            let result = await api.put("/user/profile", formData)
        dispatch(setUserData(result.data))
        } catch (error) {
            console.log(error.response.data)            
        } finally {
            setSaving(false)
        }
        // Backend/API logic aap khud lagayein
    }

    return (
        <main className="min-h-screen w-full bg-[var(--bg-app)] text-[var(--text-primary)] flex items-center justify-center px-4 py-8 relative">
            {/* Back Button */}
            <button
                type="button"
                onClick={() => navigate('/')}
                className="absolute top-6 left-6 flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--accent-primary)]/40 transition cursor-pointer shadow-md group"
                aria-label="Go back"
            >
                <FiArrowLeft className="w-4 h-4 transition group-hover:-translate-x-0.5" />
                <span className="text-xs font-medium">Back</span>
            </button>

            {/* Main Card */}
            <section className="w-full max-w-md bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
                {/* Glow ambient background accent */}
                <div className="absolute -top-16 -right-16 w-36 h-36 bg-[var(--accent-primary)]/15 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-16 -left-16 w-36 h-36 bg-[var(--accent-secondary)]/10 rounded-full blur-3xl pointer-events-none" />

                {/* Header */}
                <div className="text-center mb-6">
                    <h1 className="text-xl font-bold tracking-tight">Your Profile</h1>
                    <p className="text-xs text-[var(--text-secondary)] mt-1">
                        Manage your personal identity & details
                    </p>
                </div>

                {/* Profile Avatar Section */}
                <div className="flex flex-col items-center mb-6">
                    <div className="relative group">
                        {/* Outer Accent Ring */}
                        <div className="w-28 h-28 rounded-full p-1 bg-gradient-to-tr from-[var(--accent-primary)] via-[var(--accent-secondary)] to-[var(--accent-primary)] shadow-lg shadow-[var(--accent-primary)]/20">
                            <div className="w-full h-full rounded-full bg-[var(--bg-elevated)] flex items-center justify-center overflow-hidden border-2 border-[var(--bg-surface)]">
                                {imagePreview ? (
                                    <img
                                        src={imagePreview}
                                        alt="Profile"
                                        className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
                                    />
                                ) : (
                                    <FiUser className="w-12 h-12 text-[var(--text-muted)]" />
                                )}
                            </div>
                        </div>

                        {/* Camera Floating Button */}
                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="absolute bottom-0 right-0 p-2.5 rounded-full bg-[var(--accent-primary)] hover:bg-[var(--accent-primary-hover)] text-white shadow-md border-2 border-[var(--bg-surface)] transition transform hover:scale-110 active:scale-95 cursor-pointer"
                            title="Change Profile Photo"
                        >
                            <FiCamera className="w-4 h-4" />
                        </button>

                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                        />
                    </div>

                    <span className="text-[11px] text-[var(--text-muted)] mt-2.5">
                        Click the camera icon to upload photo
                    </span>
                </div>

                {/* Form Inputs */}
                <form onSubmit={handleSaveProfile} className="space-y-4">
                    {/* Full Name */}
                    <div>
                        <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">
                            Full Name
                        </label>
                        <div className="relative">
                            <FiUser className="w-4 h-4 text-[var(--text-muted)] absolute left-3.5 top-1/2 -translate-y-1/2" />
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter your name"
                                className="w-full bg-[var(--bg-input)] text-[var(--text-primary)] placeholder-[var(--text-muted)] text-sm rounded-xl pl-10 pr-3.5 py-2.5 border border-[var(--border-subtle)] focus:outline-none focus:border-[var(--border-focus)] transition shadow-inner"
                            />
                        </div>
                    </div>

                    {/* Username */}
                    <div>
                        <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">
                            Username
                        </label>
                        <div className="relative">
                            <FiAtSign className="w-4 h-4 text-[var(--text-muted)] absolute left-3.5 top-1/2 -translate-y-1/2" />
                            <input
                                type="text"
                                value={userName}
                                disabled={true}
                                placeholder="username"
                                className="w-full bg-[var(--bg-input)] text-[var(--text-primary)] placeholder-[var(--text-muted)] text-sm rounded-xl pl-10 pr-3.5 py-2.5 border border-[var(--border-subtle)] focus:outline-none focus:border-[var(--border-focus)] transition shadow-inner"
                            />
                        </div>
                    </div>

                    {/* Email Address */}
                    <div>
                        <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">
                            Email Address
                        </label>
                        <div className="relative">
                            <FiMail className="w-4 h-4 text-[var(--text-muted)] absolute left-3.5 top-1/2 -translate-y-1/2" />
                            <input
                                type="email"
                                value={email}
                                disabled={true}
                                placeholder="you@example.com"
                                className="w-full bg-[var(--bg-input)] text-[var(--text-primary)] placeholder-[var(--text-muted)] text-sm rounded-xl pl-10 pr-3.5 py-2.5 border border-[var(--border-subtle)] focus:outline-none focus:border-[var(--border-focus)] transition shadow-inner"
                            />
                        </div>
                    </div>

                    {/* Save Button */}
                    <button
                        type="submit"
                        className="w-full mt-2 inline-flex items-center justify-center gap-2 bg-[var(--accent-primary)] hover:bg-[var(--accent-primary-hover)] text-white font-medium text-sm py-2.5 px-4 rounded-xl transition cursor-pointer shadow-lg shadow-[var(--accent-primary)]/25 active:scale-[0.99]"
                        disabled={saving}
                        onClick={handleSaveProfile}
                    >
                        <FiCheckCircle className="w-4 h-4" />
                        <span>{saving? "Saving..." : "Save Profile"}</span>
                    </button>
                </form>
            </section>
        </main>
    )
}

export default Profile