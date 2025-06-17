'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Bell, Search, Settings, ChevronDown, Trophy, Zap } from 'lucide-react'

// Header Component
export function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        height: '64px', // h-16
        backgroundColor: '#fff', // bg-white
        borderBottom: '1px solid #e5e7eb', // border-b border-border
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: '24px', // px-6
        paddingRight: '24px' // px-6
      }}
    >
      {/* Search */}
      <div style={{ flex: 1, maxWidth: '448px' }}> {/* max-w-md */}
        <div style={{ position: 'relative' }}>
          <Search style={{
            position: 'absolute',
            left: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '16px',
            height: '16px',
            color: '#6b7280' // text-gray-500
          }} />
          <input
            type="text"
            placeholder="Buscar desafios, conceitos..."
            style={{
              width: '100%',
              paddingLeft: '40px', // pl-10
              paddingRight: '16px', // pr-4
              paddingTop: '8px', // py-2
              paddingBottom: '8px', // py-2
              backgroundColor: '#f8fafc', // bg-slate-50
              border: '1px solid #e5e7eb', // border border-border
              borderRadius: '8px',
              fontSize: '14px',
              color: '#000', // text-black
              outline: 'none', // focus:outline-none
              transition: 'all 0.15s ease-in-out',
              // Estilo para placeholder
              '::placeholder': { color: '#6b7280' }, // placeholder:text-gray-500
              // Estilos de foco (simulados, precisaria de um CSS global ou module para ':focus')
              // focus:ring-2 focus:ring-blue-500 focus:border-transparent
            }}
            onFocus={(e) => { e.target.style.boxShadow = '0 0 0 2px #3b82f6'; e.target.style.borderColor = 'transparent'; }}
            onBlur={(e) => { e.target.style.boxShadow = 'none'; e.target.style.borderColor = '#e5e7eb'; }}
          />
        </div>
      </div>

      {/* Right section */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {/* Quick Stats (hidden no mobile) */}
        <div style={{ display: 'none', alignItems: 'center', gap: '16px' }} className="md-flex-items-center-gap-16px"> {/* Usar uma classe para responsividade */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 12px',
            backgroundColor: '#eff6ff', // bg-blue-50
            border: '1px solid #bfdbfe', // border-blue-200
            borderRadius: '8px'
          }}>
            <Zap style={{ width: '16px', height: '16px', color: '#2563eb' }} />
            <span style={{ fontSize: '14px', fontWeight: '500', color: '#1d4ed8' }}>5 streak</span>
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 12px',
            backgroundColor: '#ecfdf5', // bg-green-50
            border: '1px solid #d1fae5', // border-green-200
            borderRadius: '8px'
          }}>
            <Trophy style={{ width: '16px', height: '16px', color: '#16a34a' }} />
            <span style={{ fontSize: '14px', fontWeight: '500', color: '#14532d' }}>1,250 pts</span>
          </div>
        </div>

        {/* Notifications */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            position: 'relative',
            padding: '8px',
            backgroundColor: 'transparent',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'background-color 0.15s ease-in-out',
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
        >
          <Bell style={{ width: '20px', height: '20px', color: '#6b7280' }} /> {/* text-gray-500 */}
          <div style={{
            position: 'absolute',
            top: '-4px',
            right: '-4px',
            width: '12px',
            height: '12px',
            backgroundColor: '#ef4444', // bg-red-500
            borderRadius: '9999px'
          }}></div>
        </motion.button>

        {/* Settings */}
        <motion.button
          whileHover={{ scale: 1.05, rotate: 90 }}
          whileTap={{ scale: 0.95 }}
          style={{
            padding: '8px',
            backgroundColor: 'transparent',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'all 0.15s ease-in-out', // Para rotação e escala
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
        >
          <Settings style={{ width: '20px', height: '20px', color: '#6b7280' }} /> {/* text-gray-500 */}
        </motion.button>

        {/* User Profile */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            paddingLeft: '16px', // pl-4
            borderLeft: '1px solid #e5e7eb', // border-l border-border
            cursor: 'pointer',
            transition: 'transform 0.15s ease-in-out'
          }}
        >
          <div style={{
            width: '32px',
            height: '32px',
            background: 'linear-gradient(to bottom right, #a855f7, #9333ea)', // from-purple-500 to-purple-600
            borderRadius: '9999px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <span style={{ color: '#fff', fontSize: '14px', fontWeight: '600' }}>JS</span>
          </div>
          <div style={{ display: 'none' }} className="md-block"> {/* Usar classe para responsividade */}
            <p style={{ fontSize: '14px', fontWeight: '500', color: '#000' }}>João Silva</p> {/* text-black */}
            <p style={{ fontSize: '12px', color: '#6b7280' }}>Desenvolvedor</p> {/* text-gray-600 */}
          </div>
          <ChevronDown style={{ width: '16px', height: '16px', color: '#6b7280' }} /> {/* text-gray-500 */}
        </motion.div>
      </div>
    </motion.header>
  )
}