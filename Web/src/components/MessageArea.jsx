import React from 'react'
import { IoChatbubblesOutline } from 'react-icons/io5'

const MessageArea = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-6 text-center select-none bg-[var(--bg-app)]">
      <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-transform hover:scale-105 bg-[var(--bg-elevated)] text-[var(--accent-primary)] border border-[var(--border-subtle)] shadow-lg shadow-black/20">
        <IoChatbubblesOutline size={32} />
      </div>
      <h2 className="text-lg font-semibold mb-1 text-[var(--text-primary)]">
        Welcome to ChatFlow
      </h2>
      <p className="text-sm max-w-sm text-[var(--text-muted)]">
        Sidebar se koi bhi conversation select karein ya new chat shuru karein.
      </p>
    </div>
  )
}

export default MessageArea
