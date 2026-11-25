import React from 'react'
import { IoLogOutOutline, IoPersonCircleOutline } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import api from '../../Api/api'
import { setUserData } from '../../redux/userSlice'

const SideBarFooter = () => {
    const userData = useSelector(state => state.user.userData)
    const dispatch = useDispatch()

    const logOut = () => {
      try {
        api.post("/auth/logout")
        dispatch(setUserData(null))
      } catch (error) {
        console.log(error);
      }
    }
    const navigate = useNavigate()

    return (
        <div className="p-3 mt-auto flex items-center justify-between bg-[var(--bg-elevated)] border-t border-[var(--border-subtle)]">
            {/* Click redirects to /profile */}
            <div
                onClick={() => navigate('/profile')}
                className="flex items-center gap-2.5 min-w-0 cursor-pointer p-1.5 -m-1 rounded-xl transition hover:bg-white/5 group"
                title="Open Profile"
            >
                <div className="w-9 h-9 rounded-full flex items-center justify-center overflow-hidden shrink-0 bg-[var(--bg-surface)] text-[var(--accent-primary)] border border-[var(--border-subtle)] group-hover:border-[var(--accent-primary)] transition">
                    {userData?.image ? (
                        <img
                            src={userData.image}
                            alt={userData.name || 'User'}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <IoPersonCircleOutline size={24} />
                    )}
                </div>
                <div className="min-w-0">
                    <p className="text-xs font-semibold truncate text-[var(--text-primary)] group-hover:text-[var(--accent-secondary)] transition">
                        {userData?.name ? userData.name + " (You)" : "My Profile"}
                    </p>
                    <p className="text-[9px] truncate flex items-center gap-1 text-[var(--status-online)]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--status-online)]" />
                        Online
                    </p>
                </div>
            </div>

            <button
                type="button"
                title="Logout"
                className="p-2 rounded-xl transition-colors hover:bg-rose-500/10 cursor-pointer text-[var(--text-secondary)] hover:text-rose-400 shrink-0"
                onClick={logOut}
            >
                <IoLogOutOutline size={19} />
            </button>
        </div>
    )
}

export default SideBarFooter