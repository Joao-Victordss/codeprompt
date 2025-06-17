'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Home, Terminal, BookOpen, User, Bell, Search, Settings, ChevronDown, Trophy, Zap, Code2 } from 'lucide-react'

// Sidebar Component
// Adiciona a prop activePath
export function Sidebar({ activePath }: { activePath: string }) {
  const links = [
    { href: '/', label: 'Dashboard', icon: Home }, // Remove active: true/false daqui
    { href: '/desafios', label: 'Desafios', icon: Terminal, badge: '12' },
    { href: '/aulas', label: 'Aulas', icon: BookOpen },
    { href: '/perfil', label: 'Perfil', icon: User },
  ]

  return (
    <motion.aside
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        width: '288px', // w-72 em Tailwind (~288px)
        backgroundColor: '#fff', // bg-white
        borderRight: '1px solid #e5e7eb', // border-r border-border
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        position: 'fixed', // sidebar fixo
        top: 0,
        left: 0,
        zIndex: 10 // Para garantir que fique acima do conteúdo
      }}
    >
      {/* Logo */}
      <div style={{ padding: '24px', borderBottom: '1px solid #e5e7eb' }}>
        <motion.div
          whileHover={{ scale: 1.05 }}
          style={{ display: 'flex', alignItems: 'center', gap: '12px' }}
        >
          <div style={{
            width: '40px',
            height: '40px',
            background: 'linear-gradient(to bottom right, #2563eb, #1d4ed8)', // from-blue-600 to-blue-700
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Code2 style={{ width: '24px', height: '24px', color: '#fff' }} />
          </div>
          <div>
            <h1 style={{ fontSize: '20px', fontWeight: 'bold', color: '#000' }}>CodePrompt</h1> {/* text-black */}
            <p style={{ fontSize: '12px', color: '#6b7280' }}>AI Code Learning</p> {/* text-gray-600 */}
          </div>
        </motion.div>
      </div>

      {/* Navigation */}
      <nav style={{ flex: 1, padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {links.map(({ href, label, icon: Icon, badge }) => {
          // Verifica se o link é o ativo com base em activePath
          const isActive = activePath === href;
          return (
            <motion.div
              key={href}
              whileHover={{ scale: 1.02, x: 4 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <a
                href={href}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  fontWeight: '500',
                  transition: 'all 0.15s ease-in-out',
                  ...(isActive
                    ? { backgroundColor: '#eff6ff', color: '#1d4ed8', border: '1px solid #bfdbfe', boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)' } // bg-blue-50 text-blue-700 border border-blue-200 shadow-sm
                    : { color: '#4b5563', backgroundColor: 'transparent' }), // text-gray-700
                  textDecoration: 'none', // Remover sublinhado padrão de link
                  // Adiciona um hover explícito para o estado inativo
                  // Como estamos em JS, o ':hover' não é direto no style prop.
                  // Uma solução simples para protótipo é usar onMouseEnter/onMouseLeave se precisar de mais que a transition já oferece
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = '#000'; // hover:text-black
                    e.currentTarget.style.backgroundColor = '#f8fafc'; // hover:bg-slate-50
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = '#4b5563';
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Icon style={{ width: '20px', height: '20px', color: isActive ? '#2563eb' : '#6b7280' }} /> {/* text-blue-600 text-gray-500 */}
                  <span>{label}</span>
                </div>
                {badge && (
                  <div style={{
                    width: '24px',
                    height: '24px',
                    backgroundColor: '#ef4444', // bg-red-500
                    color: '#fff',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    borderRadius: '9999px', // rounded-full
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {badge}
                  </div>
                )}
              </a>
            </motion.div>
          );
        })}
      </nav>

      {/* User Stats */}
      <div style={{ padding: '16px', borderTop: '1px solid #e5e7eb' }}>
        <div style={{
          background: 'linear-gradient(to right, #ecfdf5, #eff6ff)', // from-green-50 to-blue-50
          border: '1px solid #d1fae5', // border-green-200
          borderRadius: '8px',
          padding: '16px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <div style={{
              width: '32px',
              height: '32px',
              backgroundColor: '#22c55e', // bg-green-500
              borderRadius: '9999px', // rounded-full
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Trophy style={{ width: '16px', height: '16px', color: '#fff' }} />
            </div>
            <div>
              <p style={{ fontSize: '14px', fontWeight: '600', color: '#000' }}>Nível 5</p> {/* text-black */}
              <p style={{ fontSize: '12px', color: '#6b7280' }}>250 XP</p> {/* text-gray-600 */}
            </div>
          </div>
          <div style={{ width: '100%', backgroundColor: '#e5e7eb', borderRadius: '9999px', height: '8px' }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '60%' }}
              transition={{ duration: 1, delay: 0.5 }}
              style={{
                background: 'linear-gradient(to right, #22c55e, #3b82f6)', // from-green-500 to-blue-500
                height: '100%',
                borderRadius: '9999px'
              }}
            />
          </div>
          <p style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>150 XP para próximo nível</p> {/* text-gray-600 */}
        </div>
      </div>
    </motion.aside>
  )
}