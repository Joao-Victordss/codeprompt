// src/components/Modal.tsx
import React from 'react';
import { motion } from 'framer-motion';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fundo semi-transparente
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000, // Garante que o modal fique acima de outros elementos
      }}
      onClick={onClose} // Fecha o modal ao clicar fora dele
    >
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.3 }}
        style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          padding: '20px',
          minWidth: '300px',
          onClick: (e) => e.stopPropagation(), // Impede que o clique dentro do modal feche-o
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};