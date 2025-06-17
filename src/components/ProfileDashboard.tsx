'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Award, Lightbulb, Bell, CheckCircle, Trophy, TrendingUp, BookOpen, Clock, Target, Code, Layers } from 'lucide-react' // Adicionado 'Code' e 'Layers' aqui

// Dados mockados do perfil e recomendações
const mockUserProfile = {
  name: 'João Silva',
  course: 'Análise e Desenvolvimento de Sistemas',
  level: '5',
  xp: 250,
  xpToNextLevel: 150,
  learningStyle: 'Prático e Visual',
  bio: 'Estudante apaixonado por lógica de programação e sempre em busca de novos desafios. Acredito que a melhor forma de aprender é colocando a mão na massa e depurando erros!',
  avatarInitials: 'JS',
  streak: 5,
  totalPoints: 1250,
  accuracy: 87, // Média de acerto
  challengesSolved: 24, // Desafios resolvidos
  conceptsMastered: 392, // Conceitos dominados (similar ao masteredCards)
  nextReview: 'Funções Recursivas (Python)', // Exemplo de próxima revisão
};

const mockRecommendations = [
  {
    id: 'r1',
    topic: 'Fundamentos de Estruturas de Dados (Listas e Dicionários)',
    reason: 'Com base nos seus últimos desafios, você pode reforçar como manipular listas e dicionários de forma eficiente em Python.',
    language: 'Python',
    icon: <BookOpen style={{ width: '20px', height: '20px', color: '#2563eb' }} />
  },
  {
    id: 'r2',
    topic: 'Depuração de JavaScript no Navegador',
    reason: 'Você teve dificuldades em um desafio recente de JavaScript. Entender as ferramentas de depuração do navegador será útil.',
    language: 'JavaScript',
    icon: <Code style={{ width: '20px', height: '20px', color: '#ef4444' }} />
  },
  {
    id: 'r3',
    topic: 'Introdução a Flexbox (CSS)',
    reason: 'Para aprimorar seus layouts web, sugerimos revisar conceitos de Flexbox que facilitam o alinhamento de elementos.',
    language: 'CSS',
    icon: <Layers style={{ width: '20px', height: '20px', color: '#10b981' }} />
  },
];

const mockAchievements = [
  { id: 'a1', title: 'Mestre da Constância', description: 'Manteve uma sequência de 5 dias de estudo!', date: 'Hoje', icon: <Award style={{ width: '20px', height: '20px', color: '#f59e0b' }} /> },
  { id: 'a2', title: 'Resolvedor Ágil', description: 'Completou 10 desafios de bug em menos de 24 horas.', date: '3 dias atrás', icon: <CheckCircle style={{ width: '20px', height: '20px', color: '#22c55e' }} /> },
  { id: 'a3', title: 'Curioso Python', description: 'Explorou 5 módulos avançados de Python.', date: '1 semana atrás', icon: <Lightbulb style={{ width: '20px', height: '20px', color: '#3b82f6' }} /> },
  { id: 'a4', title: 'Desbravador Web', description: 'Completou seu primeiro desafio com HTML e CSS.', date: '2 semanas atrás', icon: <Code style={{ width: '20px', height: '20px', color: '#a855f7' }} /> },
];


// Componente Card Simples (reutilizado)
const SimpleCard = ({ children, style = {} }) => (
  <div style={{
    backgroundColor: '#fff',
    border: '1px solid #e5e7eb',
    borderRadius: '12px',
    padding: '24px',
    boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)',
    ...style
  }}>
    {children}
  </div>
);

// Componente de Botão Simples (reutilizado)
const SimpleButton = ({ children, onClick, variant = "default", style = {} }) => {
  let buttonStyles = {
    padding: '10px 18px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: '500',
    transition: 'background-color 0.15s ease-in-out, color 0.15s ease-in-out, border-color 0.15s ease-in-out',
    ...style
  };

  if (variant === "default") {
    buttonStyles = { ...buttonStyles, backgroundColor: '#2563eb', color: '#fff' };
  } else if (variant === "outline") {
    buttonStyles = { ...buttonStyles, backgroundColor: 'transparent', color: '#2563eb', border: '1px solid #2563eb' };
  } else if (variant === "secondary") {
    buttonStyles = { ...buttonStyles, backgroundColor: '#e2e8f0', color: '#000' };
  }

  return (
    <button style={buttonStyles} onClick={onClick}>
      {children}
    </button>
  );
};


export function ProfileDashboard() {
  const [studyReminderEnabled, setStudyReminderEnabled] = useState(false);

  return (
    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <header style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#000', marginBottom: '8px' }}>Seu Perfil de Aprendizagem</h1>
        <p style={{ color: '#6b7280' }}>
          Visão geral do seu progresso, recomendações e conquistas.
        </p>
      </header>

      {/* Seção de Informações do Perfil */}
      <SimpleCard>
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '24px' }}>
          <motion.div
            whileHover={{ scale: 1.05 }}
            style={{
              width: '96px', // w-24 (simulado)
              height: '96px', // h-24 (simulado)
              background: 'linear-gradient(to bottom right, #a855f7, #9333ea)', // from-purple-500 to-purple-600
              borderRadius: '9999px', // rounded-full
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)'
            }}
          >
            <span style={{ fontSize: '48px', fontWeight: 'bold', color: '#fff' }}>{mockUserProfile.avatarInitials}</span>
          </motion.div>
          <div>
            <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#000', marginBottom: '4px' }}>{mockUserProfile.name}</h2>
            <p style={{ fontSize: '16px', color: '#6b7280', marginBottom: '8px' }}>{mockUserProfile.course}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#6b7280' }}>
              <User style={{ width: '16px', height: '16px' }} />
              <span>Nível {mockUserProfile.level} ({mockUserProfile.learningStyle})</span>
            </div>
            <p style={{ fontSize: '14px', color: '#4b5563', marginTop: '16px', lineHeight: '24px' }}>"{mockUserProfile.bio}"</p>
          </div>
        </div>

        {/* Barra de Progresso de XP */}
        <div style={{
          background: 'linear-gradient(to right, #ecfdf5, #eff6ff)',
          border: '1px solid #d1fae5',
          borderRadius: '8px',
          padding: '16px',
          marginBottom: '24px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <div style={{ width: '32px', height: '32px', backgroundColor: '#22c55e', borderRadius: '9999px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Trophy style={{ width: '16px', height: '16px', color: '#fff' }} />
            </div>
            <div>
              <p style={{ fontSize: '14px', fontWeight: '600', color: '#000' }}>Nível {mockUserProfile.level}</p>
              <p style={{ fontSize: '12px', color: '#6b7280' }}>{mockUserProfile.xp} XP</p>
            </div>
          </div>
          <div style={{ width: '100%', backgroundColor: '#e5e7eb', borderRadius: '9999px', height: '8px' }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(mockUserProfile.xp / (mockUserProfile.xp + mockUserProfile.xpToNextLevel)) * 100}%` }}
              transition={{ duration: 1, delay: 0.5 }}
              style={{
                background: 'linear-gradient(to right, #22c55e, #3b82f6)',
                height: '100%',
                borderRadius: '9999px'
              }}
            />
          </div>
          <p style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>{mockUserProfile.xpToNextLevel} XP para próximo nível</p>
        </div>

        {/* Stats Resumidos */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '16px' }}>
          <div style={{ backgroundColor: '#f0f9ff', padding: '16px', borderRadius: '8px', border: '1px solid #bfdbfe' }}>
            <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Desafios Resolvidos</p>
            <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#000' }}>{mockUserProfile.challengesSolved}</p>
          </div>
          <div style={{ backgroundColor: '#fef2f2', padding: '16px', borderRadius: '8px', border: '1px solid #fecaca' }}>
            <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Pontos Totais</p>
            <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#000' }}>{mockUserProfile.totalPoints}</p>
          </div>
          <div style={{ backgroundColor: '#ecfdf5', padding: '16px', borderRadius: '8px', border: '1px solid #d1fae5' }}>
            <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Streak Atual</p>
            <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#000' }}>{mockUserProfile.streak} dias</p>
          </div>
          <div style={{ backgroundColor: '#f5f3ff', padding: '16px', borderRadius: '8px', border: '1px solid #ddd6fe' }}>
            <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Taxa de Acerto</p>
            <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#000' }}>{mockUserProfile.accuracy}%</p>
          </div>
        </div>
      </SimpleCard>

      {/* Seção de Recomendações Personalizadas */}
      <SimpleCard>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#000', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Lightbulb style={{ width: '24px', height: '24px', color: '#f59e0b' }} />
          Recomendações para Você
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {mockRecommendations.map((rec, i) => (
            <motion.div
              key={rec.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{
                backgroundColor: '#f8fafc',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                padding: '16px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '16px',
                boxShadow: '0 1px 2px rgba(0,0,0,0.02)'
              }}
            >
              <div style={{ flexShrink: 0, padding: '8px', borderRadius: '8px', backgroundColor: '#e0effe', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {rec.icon}
              </div>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#000', marginBottom: '4px' }}>{rec.topic}</h3>
                <p style={{ fontSize: '14px', color: '#6b7280' }}>{rec.reason}</p>
                <div style={{ fontSize: '12px', color: '#4b5563', marginTop: '8px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Code style={{ width: '12px', height: '12px' }} />
                  <span>{rec.language}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <SimpleButton variant="outline" style={{ width: '100%', marginTop: '24px' }} onClick={() => alert('Ver mais recomendações')}>
          Ver Mais Recomendações
        </SimpleButton>
      </SimpleCard>

      {/* Seção de Conquistas */}
      <SimpleCard>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#000', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Trophy style={{ width: '24px', height: '24px', color: '#22c55e' }} />
          Suas Conquistas
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
          {mockAchievements.map((achievement, i) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              style={{
                backgroundColor: '#fff',
                border: '1px solid #d1fae5', // border-green-200 (simulado para sucesso)
                borderRadius: '12px',
                padding: '16px',
                boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center'
              }}
            >
              <motion.div
                whileHover={{ rotate: 10, scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                style={{
                  width: '64px', height: '64px',
                  backgroundColor: '#f0fdf4', // bg-green-50
                  borderRadius: '9999px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: '16px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}
              >
                {achievement.icon}
              </motion.div>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#000', marginBottom: '8px' }}>{achievement.title}</h3>
              <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '8px' }}>{achievement.description}</p>
              <p style={{ fontSize: '12px', color: '#4b5563', fontStyle: 'italic' }}>Conquistado: {achievement.date}</p>
            </motion.div>
          ))}
        </div>
        <SimpleButton variant="outline" style={{ width: '100%', marginTop: '24px' }} onClick={() => alert('Ver todas as conquistas')}>
          Ver Todas as Conquistas
        </SimpleButton>
      </SimpleCard>

      {/* Toggle de Lembrete de Estudo */}
      <SimpleCard>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#000', marginBottom: '4px' }}>Lembrete Semanal de Estudo</h2>
            <p style={{ fontSize: '14px', color: '#6b7280' }}>Receba notificações para manter sua consistência.</p>
          </div>
          <motion.button
            onClick={() => setStudyReminderEnabled(!studyReminderEnabled)}
            initial={{ backgroundColor: studyReminderEnabled ? '#22c55e' : '#e5e7eb' }}
            animate={{ backgroundColor: studyReminderEnabled ? '#22c55e' : '#e5e7eb' }}
            transition={{ duration: 0.2 }}
            style={{
              width: '60px',
              height: '30px',
              borderRadius: '9999px',
              border: 'none',
              cursor: 'pointer',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              padding: '0 4px',
              boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)'
            }}
          >
            <motion.div
              layout // Habilita animação de layout com Framer Motion
              transition={{ type: 'spring', stiffness: 700, damping: 30 }}
              style={{
                width: '22px',
                height: '22px',
                backgroundColor: '#fff',
                borderRadius: '9999px',
                boxShadow: '0 1px 2px rgba(0,0,0,0.2)',
                x: studyReminderEnabled ? 28 : 0, // Move o "thumb"
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}
            >
              {studyReminderEnabled ? (
                <Bell style={{ width: '16px', height: '16px', color: '#22c55e' }} />
              ) : (
                <Bell style={{ width: '16px', height: '16px', color: '#6b7280' }} />
              )}
            </motion.div>
          </motion.button>
        </div>
      </SimpleCard>

    </div>
  )
}