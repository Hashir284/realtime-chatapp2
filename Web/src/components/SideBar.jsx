import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  IoSearchOutline,
  IoCloseOutline,
  IoChatbubbleEllipsesOutline,
  IoPersonCircleOutline
} from 'react-icons/io5'
import { LuPanelLeftClose } from 'react-icons/lu'
import { onClose } from '../redux/sideBarButtonToogle'
import SideBarFooter from './SideBar/SideBarFooter'

const SideBar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isOpen = useSelector(state => state.isSidebarOpenSlice.isOpen)
  const [searchTerm, setSearchTerm] = useState('')
  const otherUsers = useSelector(state =>
    Array.isArray(state.user?.otherUsers) ? state.user.otherUsers : []
  )

  const visibleUsers = otherUsers.filter((user) => {
    if (!user || typeof user !== 'object') return false

    const searchText = [user?.name, user?.userName, user?.email]
      .filter((value) => typeof value === 'string')
      .join(' ')
      .toLowerCase()
      console.log(searchText.includes(searchTerm.trim().toLowerCase()));
      console.log(searchText);
    return searchText.includes(searchTerm.trim().toLowerCase())
  })

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div
          onClick={() => dispatch(onClose())}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs md:hidden transition-opacity"
        />
      )}

      {/* Sidebar Container (Responsive + Clean ChatGPT / Gemini Style) */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-50 flex flex-col h-full bg-[var(--bg-surface)] text-[var(--text-primary)] transition-[width] duration-300 ease-in-out overflow-hidden border-r border-[var(--border-subtle)] ${
          isOpen
            ? 'w-[300px] sm:w-[320px] md:w-[320px]'
            : 'w-0'
        }`}
      >
        <div className="w-[300px] sm:w-[320px] md:w-[320px] flex flex-col h-full shrink-0">
          {/* Header with ChatGPT / Gemini style sidebar toggle button */}
          <div className="flex items-center justify-between px-3.5 py-3 border-b border-[var(--border-subtle)]">
            <div className="flex items-center justify-center gap-2.5">
              <div className="p-2 rounded-xl flex items-center justify-center text-white bg-[var(--accent-primary)] shadow-sm">
                <IoChatbubbleEllipsesOutline size={20} />
              </div>
              <div>
                <h2 className="font-semibold text-sm leading-2 mt-2 text-[var(--text-primary)]">
                  Chats
                </h2>
                <span className="text-[11px] text-[var(--text-muted)]">
                  Realtime Messages
                </span>
              </div>
            </div>

            {/* Top Right Action Icons */}
            <div className="flex items-center gap-1">
              {/* ChatGPT / Gemini style collapse sidebar button */}
              <button
                type="button"
                onClick={() => dispatch(onClose())}
                className="p-2 rounded-lg transition-colors hover:bg-white/10 cursor-pointer text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                title="Close sidebar"
                aria-label="Close sidebar"
              >
                <LuPanelLeftClose size={20} />
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="px-3.5 py-2.5">
            <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-[var(--bg-input)] border border-[var(--border-subtle)] focus-within:border-[var(--border-focus)] transition-all">
              <IoSearchOutline size={17} className="text-[var(--text-muted)] shrink-0" />
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-transparent text-sm outline-none text-[var(--text-primary)] placeholder-[var(--text-muted)]"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm('')}
                  className="cursor-pointer text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                >
                  <IoCloseOutline size={16} />
                </button>
              )}
            </div>
          </div>

          {/* Conversation / User List */}
          <div className="flex-1 overflow-y-auto px-2 space-y-1">
            {visibleUsers.map((user) => {
              const displayName = typeof user.name === 'string' ? user.name.trim() : 'Unnamed user'

              return (
                <div
                  key={user._id || user.userName || user.email}
                  className="group flex items-center gap-3 p-2.5 rounded-xl transition-all cursor-pointer hover:bg-white/5 active:scale-[0.99]"
                  onClick={() => navigate(`/user/${user._id}`)}
                >
                  <div className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden shrink-0 font-semibold text-xs select-none bg-[var(--bg-elevated)] text-[var(--accent-secondary)] border border-[var(--border-subtle)]">
                    {user.image ? (
                      <img src={user.image} alt="" className="w-full h-full object-cover" />
                    ) : (
                      displayName === "Unnamed user" ? <IoPersonCircleOutline size={24} /> : displayName.slice(0, 2).toUpperCase()
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium truncate text-[var(--text-primary)]">
                      {displayName}
                    </h3>
                    {user.email && user.email !== displayName && (
                      <p className="text-xs truncate text-[var(--text-secondary)]">
                        {user.email}
                      </p>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Footer / Current User Profile bar */}
          <SideBarFooter />

        </div>
      </aside>
    </>
  )
}

export default SideBar
