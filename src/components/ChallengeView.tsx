'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Bug, Code, AlertCircle, Zap, TrendingUp, CheckCircle } from 'lucide-react'
import { SimpleButton, SimpleCard } from './ChallengeListing'; // Reutilizando componentes simples

// Dados do desafio fixo para visualização no protótipo
const fixedChallenge = {
  id: 'c1',
  title: 'Erro de Indentação em Python',
  description: 'Encontre e corrija o erro de identação para que o código seja executado corretamente.',
  code: `def saudacao(nome):\n    print("Olá, " + nome)\n\nsaudacao("João")`,
  difficulty: 'Iniciante',
  language: 'Python',
  points: 10,
  status: 'pending',
  type: 'bug',
  hint: 'Verifique os espaços no início da linha dentro da função.',
};


export function ChallengeView() { // Não recebe mais prop challengeId
  const [diagnosisText, setDiagnosisText] = useState('');
  const [feedback, setFeedback] = useState(null); // { correct: boolean, message: string, confidence: number, points: number }
  const [history, setHistory] = useState([]); // Array de tentativas

  const handleSubmitDiagnosis = () => {
    // Lógica simulada de feedback da IA
    let isCorrect = false;
    let message = '';
    let confidence = 0;
    let awardedPoints = 0;

    if (diagnosisText.toLowerCase().includes('indentação') && diagnosisText.toLowerCase().includes('espaços')) {
      isCorrect = true;
      message = 'Excelente! Você identificou corretamente o erro de indentação. Blocos de código em Python dependem da identação correta para funcionar.';
      confidence = 95;
      awardedPoints = fixedChallenge.points;
    } else if (diagnosisText.toLowerCase().includes('função') || diagnosisText.toLowerCase().includes('print')) {
      isCorrect = false;
      message = 'Você está no caminho certo ao olhar para a função, mas o problema é mais específico. Pense em como o Python organiza os blocos de código.';
      confidence = 60;
      awardedPoints = 0;
    } else {
      isCorrect = false;
      message = 'Hmm, seu diagnóstico não parece estar no ponto. Tente analisar a estrutura do código e como as linhas se relacionam.';
      confidence = 30;
      awardedPoints = 0;
    }

    const newFeedback = { correct: isCorrect, message, confidence, points: awardedPoints };
    setFeedback(newFeedback);
    setHistory([...history, { text: diagnosisText, score: awardedPoints, time: 'Agora', correct: isCorrect }]);
  };


  return (
    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <header style={{ marginBottom: '16px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#000', marginBottom: '8px' }}>Desafio: {fixedChallenge.title}</h1>
        <p style={{ color: '#6b7280' }}>
          {fixedChallenge.description}
        </p>
      </header>

      {/* Challenge Card - Código com Erro */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: '#fff',
          border: '1px solid #e5e7eb',
          borderRadius: '12px',
          boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)',
        }}
      >
        {/* Gradient accent */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: 'linear-gradient(to right, #ef4444, #f97316, #facc15)'
        }} />
        
        <div style={{ padding: '24px' }}>
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <motion.div
                whileHover={{ rotate: 10, scale: 1.05 }}
                style={{ position: 'relative' }}
              >
                <div style={{
                  width: '48px',
                  height: '48px',
                  backgroundColor: '#fef2f2',
                  border: '2px solid #fecaca',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Bug style={{ width: '24px', height: '24px', color: '#dc2626' }} />
                </div>
                <div style={{
                  position: 'absolute',
                  top: '-4px',
                  right: '-4px',
                  width: '20px',
                  height: '20px',
                  backgroundColor: '#ef4444',
                  borderRadius: '9999px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <AlertCircle style={{ width: '12px', height: '12px', color: '#fff' }} />
                </div>
              </motion.div>
              
              <div>
                <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#000', marginBottom: '4px' }}>Código com Erro</h2>
                <p style={{ fontSize: '14px', color: '#6b7280' }}>Encontre e diagnostique o problema</p>
              </div>
            </div>
            
            <div style={{ textAlign: 'right' }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                padding: '4px 8px',
                backgroundColor: '#fef2f2',
                color: '#b91c1c',
                fontSize: '12px',
                fontWeight: '500',
                borderRadius: '9999px',
                border: '1px solid #fecaca'
              }}>
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  style={{ width: '6px', height: '6px', backgroundColor: '#ef4444', borderRadius: '9999px' }}
                />
                Bug Ativo
              </div>
            </div>
          </div>

          {/* Code Block */}
          <motion.div
            whileHover={{ scale: 1.005 }}
            style={{ position: 'relative', transition: 'transform 0.1s ease-in-out' }}
          >
            <div style={{ backgroundColor: '#f8fafc', border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
              {/* Terminal Header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', backgroundColor: '#f1f5f9', borderBottom: '1px solid #e5e7eb' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <div style={{ width: '12px', height: '12px', backgroundColor: '#ef4444', borderRadius: '9999px' }} />
                    <div style={{ width: '12px', height: '12px', backgroundColor: '#facc15', borderRadius: '9999px' }} />
                    <div style={{ width: '12px', height: '12px', backgroundColor: '#22c55e', borderRadius: '9999px' }} />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Code style={{ width: '16px', height: '16px', color: '#6b7280' }} />
                    <span style={{ fontSize: '14px', fontFamily: 'monospace', color: '#000' }}>main.py</span>
                  </div>
                </div>
                <div style={{ fontSize: '12px', color: '#6b7280', fontFamily: 'monospace' }}>Python 3.11</div>
              </div>
              
              {/* Code Content */}
              <div style={{ padding: '16px', backgroundColor: '#fff' }}>
                <pre style={{ fontSize: '14px', fontFamily: 'monospace', color: '#333', lineHeight: '24px', overflowX: 'auto' }}>
                  <code style={{ /* syntax highlighting */ }}>{fixedChallenge.code}</code>
                </pre>
              </div>
            </div>
          </motion.div>

          {/* Footer */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <motion.div 
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{ width: '8px', height: '8px', backgroundColor: '#ef4444', borderRadius: '9999px' }}
              />
              <span style={{ fontSize: '14px', fontWeight: '500', color: '#b91c1c' }}>Erro de indentação detectado</span>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '12px', color: '#6b7280' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Zap style={{ width: '12px', height: '12px' }} />
                <span>Nível: {fixedChallenge.difficulty}</span>
              </div>
              <div style={{ width: '4px', height: '4px', backgroundColor: '#6b7280', borderRadius: '9999px' }} />
              <span>{fixedChallenge.points} pontos</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Chat Feedback */}
      {feedback && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            backgroundColor: '#fff',
            border: '1px solid #e5e7eb',
            borderRadius: '12px',
            boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)',
            padding: '24px'
          }}
        >
          <div style={{ display: 'flex', gap: '16px' }}>
            <motion.div 
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
              style={{
                width: '40px',
                height: '40px',
                backgroundColor: '#eff6ff',
                border: '2px solid #bfdbfe',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}
            >
              <span style={{ fontSize: '18px' }}>🤖</span>
            </motion.div>
            
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <h3 style={{ fontWeight: '600', color: '#000' }}>IA Assistant</h3>
                <div style={{ width: '8px', height: '8px', backgroundColor: '#22c55e', borderRadius: '9999px' }} />
                <span style={{ fontSize: '12px', color: '#6b7280' }}>Online</span>
              </div>
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                style={{
                  backgroundColor: feedback.correct ? '#ecfdf5' : '#fef2f2',
                  border: `1px solid ${feedback.correct ? '#d1fae5' : '#fecaca'}`,
                  borderRadius: '8px',
                  padding: '16px'
                }}
              >
                <p style={{ fontSize: '14px', color: '#000', lineHeight: '24px', marginBottom: '12px' }}>
                  {feedback.message}
                </p>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: '500' }}>Confiança:</span>
                  <div style={{ flex: 1, backgroundColor: '#e2e8f0', borderRadius: '9999px', height: '8px' }}>
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${feedback.confidence}%` }}
                      transition={{ duration: 1.2, delay: 0.5 }}
                      style={{
                        background: 'linear-gradient(to right, #22c55e, #3b82f6)',
                        height: '100%',
                        borderRadius: '9999px'
                      }}
                    />
                  </div>
                  <span style={{ fontSize: '12px', fontWeight: '600', color: feedback.correct ? '#16a34a' : '#b91c1c' }}>{feedback.confidence}%</span>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Error Hint Box */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        style={{
          backgroundColor: '#fffbeb',
          border: '1px solid #fcd34d',
          borderRadius: '12px',
          boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)',
          padding: '24px'
        }}
      >
        <div style={{ display: 'flex', gap: '16px' }}>
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            style={{
              width: '48px',
              height: '48px',
              backgroundColor: '#fffbeb',
              border: '2px solid #fbbf24',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}
          >
            <span style={{ fontSize: '20px' }}>💡</span>
          </motion.div>
          
          <div style={{ flex: 1 }}>
            <h3 style={{ fontWeight: '600', color: '#78350f', marginBottom: '8px' }}>Dica Inteligente</h3>
            <p style={{ fontSize: '14px', color: '#92400e', lineHeight: '24px', marginBottom: '12px' }}>
              {fixedChallenge.hint}
            </p>
            
            <motion.div 
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              <div style={{ width: '6px', height: '6px', backgroundColor: '#f97316', borderRadius: '9999px' }} />
              <span style={{ fontSize: '12px', color: '#b45309', fontWeight: '500' }}>Dificuldade: {fixedChallenge.difficulty}</span>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Prompt Input */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        style={{
          backgroundColor: '#fff',
          border: '1px solid #e5e7eb',
          borderRadius: '12px',
          boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)',
          padding: '24px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
          <div style={{
            width: '40px',
            height: '40px',
            backgroundColor: '#f1f5f9',
            border: '2px solid #e2e8f0',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <span style={{ fontSize: '18px' }}>✍️</span>
          </div>
          <div>
            <h3 style={{ fontWeight: '600', color: '#000' }}>Seu Diagnóstico</h3>
            <p style={{ fontSize: '14px', color: '#6b7280' }}>Descreva o erro e a solução</p>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ position: 'relative' }}>
            <textarea
              style={{
                width: '100%',
                height: '128px',
                padding: '16px',
                backgroundColor: '#f8fafc',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                color: '#000',
                resize: 'vertical',
                outline: 'none',
                transition: 'all 0.15s ease-in-out',
              }}
              placeholder="Ex: O erro está na indentação da linha 2. A função precisa ter o código interno identado com 4 espaços..."
              value={diagnosisText}
              onChange={(e) => setDiagnosisText(e.target.value)}
              onFocus={(e) => { e.target.style.boxShadow = '0 0 0 2px #3b82f6'; e.target.style.borderColor = 'transparent'; }}
              onBlur={(e) => { e.target.style.boxShadow = 'none'; e.target.style.borderColor = '#e5e7eb'; }}
            />
            <div style={{
              position: 'absolute',
              bottom: '12px',
              right: '12px',
              fontSize: '12px',
              color: '#6b7280'
            }}>
              {diagnosisText.length}/500
            </div>
          </div>

          <SimpleButton style={{ width: '100%', backgroundColor: '#2563eb' }} onClick={handleSubmitDiagnosis}>
            <span>🚀</span>
            Enviar Diagnóstico
          </SimpleButton>
        </div>
      </motion.div>

      {/* History */}
      {history.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{
            backgroundColor: '#fff',
            border: '1px solid #e5e7eb',
            borderRadius: '12px',
            boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)',
            padding: '24px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              backgroundColor: '#f5f3ff',
              border: '2px solid #ddd6fe',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <span style={{ fontSize: '18px' }}>📚</span>
            </div>
            <div>
              <h3 style={{ fontWeight: '600', color: '#000' }}>Histórico de Tentativas</h3>
              <p style={{ fontSize: '14px', color: '#6b7280' }}>Suas tentativas anteriores</p>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {history.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + (i * 0.1) }}
                whileHover={{ scale: 1.01 }}
                style={{
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  padding: '16px',
                  transition: 'all 0.15s ease-in-out',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#f1f5f9'; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#f8fafc'; }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px' }}>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: '14px', color: '#000', lineHeight: '24px' }}>{item.text}</p>
                    <p style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>{item.time}</p>
                  </div>
                  <div style={{
                    padding: '4px 12px',
                    borderRadius: '9999px',
                    fontSize: '12px',
                    fontWeight: '500',
                    border: '1px solid',
                    backgroundColor: item.correct ? '#dcfce7' : '#fee2e2',
                    color: item.correct ? '#16a34a' : '#b91c1c',
                    borderColor: item.correct ? '#bbf7d0' : '#fecaca'
                  }}>
                    {item.correct ? `+${item.score} pts` : 'Incorreto'}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div style={{ marginTop: '16px', textAlign: 'center' }}>
            <button style={{
              fontSize: '14px',
              color: '#2563eb',
              fontWeight: '500',
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              transition: 'color 0.15s ease-in-out',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = '#1d4ed8'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = '#2563eb'; }}
            >
              Ver histórico completo →
            </button>
          </div>
        </motion.div>
      )}

      {/* Score Badge (após um diagnóstico correto) */}
      {feedback && feedback.correct && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          style={{
            background: 'linear-gradient(to bottom right, #ecfdf5, #f0fdf4)',
            border: '1px solid #d1fae5',
            borderRadius: '12px',
            boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)',
            padding: '24px'
          }}
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            style={{ textAlign: 'center', transition: 'transform 0.15s ease-in-out' }}
          >
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              backgroundColor: '#fff',
              border: '1px solid #d1fae5',
              padding: '16px 24px',
              borderRadius: '12px',
              boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)',
              marginBottom: '16px'
            }}>
              <motion.span
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                style={{ fontSize: '24px' }}
              >
                ✅
              </motion.span>
              <div style={{ textAlign: 'left' }}>
                <p style={{ fontWeight: '600', color: '#065f46', fontSize: '18px' }}>Diagnóstico Aceito!</p>
                <p style={{ color: '#16a34a', fontSize: '14px' }}>+{feedback.points} pontos conquistados</p>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '75%' }} // Simulação de progresso no nível
                transition={{ duration: 1.5, delay: 0.8 }}
                style={{
                  height: '8px',
                  background: 'linear-gradient(to right, #22c55e, #3b82f6)',
                  borderRadius: '9999px',
                  margin: '0 auto'
                }}
              />
              <p style={{ fontSize: '12px', color: '#6b7280' }}>Progresso no nível atual</p>
            </div>
          </motion.div>
        </motion.div>
      )}

    </div>
  )
}