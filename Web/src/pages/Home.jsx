import React, { useState } from 'react'
import SideBar from '../components/SideBar'
import MessageArea from '../components/MessageArea'
import { LuPanelLeftOpen } from 'react-icons/lu'
import MessageAreaHeader from '../components/MessageArea/MessageAreaHeader'

const Home = () => {
  // Sidebar open/collapse state (Default open like ChatGPT / Gemini)

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[var(--bg-app)] text-[var(--text-primary)] relative">

      {/* Responsive & Collapsible Sidebar */}
      <SideBar />

      {/* Main Chat/Content Container */}
      <main className="flex-1 flex flex-col h-full min-w-0 overflow-hidden relative">

        {/* Top Navbar / Header */}
        <MessageAreaHeader />

        {/* Message Area Section */}
        <div className="flex-1 overflow-hidden relative">
          <MessageArea />
        </div>

      </main>

    </div>
  )
}

export default Home
