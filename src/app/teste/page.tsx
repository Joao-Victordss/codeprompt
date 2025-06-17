// src/app/teste/page.tsx
import React from 'react';
import { motion } from 'framer-motion';

export default function TestePage() {
  return (
    <div style={{ padding: '24px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
      <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '24px', color: '#000' }}>Página de Testes de Componentes</h1>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        style={{ color: '#333' }}
      >
        Esta página é dedicada a testar componentes individuais como modals, toasts, temas, etc.
      </motion.p>
      <p style={{ color: '#6b7280', marginTop: '8px' }}>Componentes de teste virão aqui...</p>
    </div>
  );
}