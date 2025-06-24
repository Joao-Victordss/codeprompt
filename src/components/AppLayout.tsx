'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Sidebar } from './Sidebar' //
import { Header } from './Header' //
import { usePathname } from 'next/navigation'
import { MessageCircleQuestion } from 'lucide-react' // NOVO ÍCONE: MessageCircleQuestion
import { Modal } from './Modal' //
import { StudyAssistant } from './StudyAssistant' //

// App Layout Component
export function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isAssistantModalOpen, setIsAssistantModalOpen] = useState(false);

  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      backgroundColor: '#f8fafc' //
    }}>
      <Sidebar activePath={pathname} /> {/* */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        marginLeft: '288px' //
      }}>
        <Header /> {/* */}
        <main style={{
          flex: 1,
          overflowY: 'auto',
          padding: '24px' //
        }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {children}
          </motion.div>
        </main>
      </div>

      {/* Botão Flutuante do Assistente de IA */}
      <motion.button
        className="fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-lg transition-colors duration-200"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsAssistantModalOpen(true)}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 50,
          backgroundColor: '#2563eb', // NOVA COR: Azul (similar ao bg-blue-600)
          color: '#fff',
          padding: '16px',
          borderRadius: '9999px',
          boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <MessageCircleQuestion style={{ width: '28px', height: '28px' }} /> {/* NOVO ÍCONE */}
      </motion.button>

      {/* Modal do Assistente de IA */}
      <Modal isOpen={isAssistantModalOpen} onClose={() => setIsAssistantModalOpen(false)}>
        <StudyAssistant onClose={() => setIsAssistantModalOpen(false)} />
      </Modal>
    </div>
  )
}