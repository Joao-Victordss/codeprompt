'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Sidebar } from './Sidebar'
import { Header } from './Header'
import { usePathname } from 'next/navigation' // Importe usePathname

// App Layout Component
export function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname(); // Obtém o caminho da URL atual

  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      backgroundColor: '#f8fafc' // bg-slate-50
    }}>
      <Sidebar activePath={pathname} /> {/* Passa a rota ativa para o Sidebar */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        marginLeft: '288px' // ml-72 para compensar o sidebar fixo
      }}>
        <Header />
        <main style={{
          flex: 1,
          overflowY: 'auto',
          padding: '24px' // p-6
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
    </div>
  )
}