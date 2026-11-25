import React from 'react'
import { onClose } from '../../redux/sideBarButtonToogle'
import { useDispatch } from 'react-redux'
import { LuPanelLeftClose } from 'react-icons/lu'
import {
  IoChatbubbleEllipsesOutline
} from 'react-icons/io5'

const SideBarHeader = () => {
        const dispatch = useDispatch()

    return (
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
        </div>)
}

export default SideBarHeader