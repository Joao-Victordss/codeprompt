'use client'

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Lightbulb, MessageSquare, BookOpen, Code, Search } from 'lucide-react'; // Ícones úteis

interface StudyAssistantProps {
  onClose: () => void;
}

export const StudyAssistant: React.FC<StudyAssistantProps> = ({ onClose }) => {
  const [prompt, setPrompt] = useState('');
  const [chatHistory, setChatHistory] = useState<Array<{ sender: 'user' | 'ai', message: string }>>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = () => {
    if (prompt.trim() === '') return;

    const userMessage = { sender: 'user', message: prompt };
    setChatHistory((prev) => [...prev, userMessage]);
    setPrompt('');
    setIsLoading(true);

    // Simulação de resposta da IA
    setTimeout(() => {
      const aiMessage = {
        sender: 'ai',
        message: `Olá! Entendi que você está no ambiente de estudos. Por favor, especifique o que gostaria que eu explicasse ou sobre qual tópico você tem dúvidas relacionadas à página atual. As opções que você mencionou anteriormente (Resumir, Extrair Ações, Traduzir) estão prontas para ajudar.`,
      };
      setChatHistory((prev) => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleQuickAction = (action: string) => {
    setPrompt(action);
    handleSendMessage(); // Envia a ação rápida como uma mensagem
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      maxHeight: '80vh', // Limita a altura do modal para não ser muito grande
      backgroundColor: '#fff',
      borderRadius: '8px',
      overflow: 'hidden',
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px 20px',
        borderBottom: '1px solid #e5e7eb',
        backgroundColor: '#f8fafc',
      }}>
        <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#000' }}>Assistente de Estudos (IA)</h2>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          style={{
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: '8px',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <X style={{ width: '20px', height: '20px', color: '#6b7280' }} />
        </motion.button>
      </div>

      <div style={{ flex: 1, padding: '20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {/* Mensagem de Boas-vindas Inicial ou Histórico */}
        {chatHistory.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              backgroundColor: '#eff6ff',
              borderRadius: '8px',
              padding: '16px',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px',
              marginBottom: '16px'
            }}
          >
            <Lightbulb style={{ width: '24px', height: '24px', color: '#2563eb', flexShrink: 0 }} />
            <div>
              <p style={{ fontWeight: '600', color: '#1d4ed8', marginBottom: '4px' }}>Como posso ajudar?</p>
              <p style={{ fontSize: '14px', color: '#4b5563' }}>Sou seu assistente de estudos de IA. Posso te ajudar a entender o conteúdo da tela, resumir informações, extrair ações e muito mais!</p>
            </div>
          </motion.div>
        ) : (
          // Histórico de conversas
          chatHistory.map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              style={{
                alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                backgroundColor: msg.sender === 'user' ? '#dbeafe' : '#e0f2f7', // bg-blue-100 ou bg-cyan-50
                color: msg.sender === 'user' ? '#1e40af' : '#06748f', // text-blue-800 ou text-cyan-800
                padding: '10px 15px',
                borderRadius: '16px',
                maxWidth: '80%',
                wordBreak: 'break-word',
              }}
            >
              {msg.message}
            </motion.div>
          ))
        )}

        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ repeat: Infinity, duration: 0.8, ease: "easeInOut" }}
            style={{
              alignSelf: 'flex-start',
              backgroundColor: '#e0f2f7',
              padding: '10px 15px',
              borderRadius: '16px',
              maxWidth: '80%',
            }}
          >
            Digitando...
          </motion.div>
        )}

        {/* Ações Rápidas - Abaixo do histórico ou mensagem inicial */}
        {!isLoading && (
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px',
            marginTop: chatHistory.length === 0 ? '0' : '16px', // Espaçamento condicional
            alignSelf: 'flex-start' // Alinha as ações rápidas à esquerda
          }}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleQuickAction('Resumir esta página')}
              style={{ ...quickActionButtonStyles }}
            >
              <MessageSquare style={{ width: '16px', height: '16px', marginRight: '4px' }} />
              Resumir esta página
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleQuickAction('Extrair ações necessárias')}
              style={{ ...quickActionButtonStyles }}
            >
              <Code style={{ width: '16px', height: '16px', marginRight: '4px' }} />
              Extrair ações necessárias
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleQuickAction('Traduzir esta página para o inglês')}
              style={{ ...quickActionButtonStyles }}
            >
              <BookOpen style={{ width: '16px', height: '16px', marginRight: '4px' }} />
              Traduzir esta página
            </motion.button>
             <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleQuickAction('Explicar este desafio')}
              style={{ ...quickActionButtonStyles }}
            >
              <Lightbulb style={{ width: '16px', height: '16px', marginRight: '4px' }} />
              Explicar este desafio
            </motion.button>
          </div>
        )}
      </div>

      <div style={{ padding: '16px 20px', borderTop: '1px solid #e5e7eb', backgroundColor: '#f8fafc' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '8px 12px' }}>
          <Search style={{ width: '20px', height: '20px', color: '#9ca3af' }} />
          <input
            type="text"
            placeholder="Peça qualquer coisa à IA..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') handleSendMessage();
            }}
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              fontSize: '14px',
              padding: '4px 0',
              backgroundColor: 'transparent',
            }}
          />
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleSendMessage}
            disabled={isLoading || prompt.trim() === ''}
            style={{
              backgroundColor: '#2563eb',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              padding: '8px 12px',
              cursor: 'pointer',
              fontWeight: '500',
              transition: 'background-color 0.2s',
              opacity: (isLoading || prompt.trim() === '') ? 0.6 : 1,
            }}
          >
            Enviar
          </motion.button>
        </div>
      </div>
    </div>
  );
};

const quickActionButtonStyles = {
  backgroundColor: '#e0e7ff', // bg-indigo-100
  color: '#4f46e5', // text-indigo-700
  fontSize: '12px',
  padding: '8px 12px',
  borderRadius: '20px', // rounded-full
  border: '1px solid #c7d2fe', // border-indigo-200
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  whiteSpace: 'nowrap', // Impede que o texto quebre
  transition: 'background-color 0.2s, transform 0.2s',
};