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

  // Variantes para a animação do background de overlay
  const overlayVariants = {
    visible: { opacity: 1, transition: { duration: 0.3 } },
    hidden: { opacity: 0, transition: { duration: 0.3 } },
  };

  // Variantes para a animação do conteúdo do modal
  const contentVariants = {
    hidden: {
      scale: 0.8, // Começa um pouco menor para dar ideia de expansão
      opacity: 0, // Inicia invisível
      // x: '100%', // Removido ou ajustado para evitar deslocamento excessivo
      // y: '100%', // Removido ou ajustado para evitar deslocamento excessivo
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 30,
        duration: 0.3,
      },
    },
    visible: {
      scale: 1, // Expande para o tamanho normal
      opacity: 1, // Torna-se visível
      x: 0, // Posição final (relativa ao flexbox que já o ancorou no canto)
      y: 0, // Posição final
      transition: {
        type: 'spring',
        stiffness: 250,
        damping: 25,
        duration: 0.4,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate={isOpen ? 'visible' : 'hidden'}
      variants={overlayVariants} // Usamos overlayVariants para o fundo
      className="fixed inset-0 bg-black/50 z-50 flex justify-end items-end" // Ancorado no canto inferior direito
      onClick={onClose} // Fecha ao clicar fora
    >
      <motion.div
        variants={contentVariants} // Usamos contentVariants para o conteúdo
        style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          padding: '20px',
          minWidth: '300px',
          maxWidth: '400px',
          width: '90%',
          maxHeight: 'calc(100vh - 48px)', // Ajuste para não encostar no topo (considerando margin-bottom e top)
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)', // Sombra para destaque
          marginRight: '24px', // Margem do lado direito
          marginBottom: '24px', // Margem inferior
          transformOrigin: 'bottom right', // Ponto de origem da transformação (expansão)
          position: 'relative', // Para o z-index interno do conteúdo
        }}
        onClick={(e) => e.stopPropagation()} // Impede que o clique dentro do modal feche-o
      >
        {children}
      </motion.div>
    </motion.div>
  );
};