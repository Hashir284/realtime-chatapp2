import React from 'react'
import { LuPanelLeftOpen } from 'react-icons/lu'
import { useDispatch, useSelector } from 'react-redux'
import { onClose } from '../../redux/sideBarButtonToogle'

const MessageAreaHeader = () => {

  const isSidebarOpen = useSelector(state=> state.isSidebarOpenSlice.isOpen)
  const dispatch = useDispatch()

    return (
        <header className="flex items-center gap-3 px-4 py-3.5 md:px-5 shrink-0 bg-[var(--bg-surface)] border-b border-[var(--border-subtle)]">
            {/* ChatGPT / Gemini Open Sidebar Toggle Button - only shows when sidebar is closed */}
            {!isSidebarOpen && (
                <button
                    type="button"
                    onClick={() => dispatch(onClose())}
                    className="p-2 -ml-1 rounded-xl transition cursor-pointer text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/10 active:scale-95"
                    title="Open sidebar"
                    aria-label="Open sidebar"
                >
                    <LuPanelLeftOpen size={20} />
                </button>
            )}

            <div className="flex items-center justify-between w-full">
                <div>
                    <h1 className="text-base font-semibold leading-none text-[var(--text-primary)]">
                        Chat Room
                    </h1>
                    <p className="text-xs mt-1 text-[var(--text-muted)]">
                        Select a chat to start conversation
                    </p>
                </div>
            </div>
        </header>
    )
}

export default MessageAreaHeader