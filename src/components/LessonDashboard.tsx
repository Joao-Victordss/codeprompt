'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { BookOpen, Lightbulb, GraduationCap, Code, Layers, MessageSquare, PlayCircle, Clock, CheckCircle } from 'lucide-react'

// Dados mockados de aulas e conceitos
const mockLessons = [
  {
    id: 'l1',
    title: 'Fundamentos de Python: Variáveis e Tipos de Dados',
    description: 'Aprenda os blocos construtivos do Python: como declarar variáveis e os tipos de dados essenciais.',
    duration: '15 min',
    concepts: ['Variáveis', 'Inteiros', 'Strings', 'Booleanos', 'Tipagem Dinâmica'],
    status: 'in-progress',
    tags: ['Python', 'Iniciante', 'Lógica'],
    progress: 60,
  },
  {
    id: 'l2',
    title: 'Estrutura do HTML: Tags Básicas',
    description: 'Entenda a espinha dorsal da web: as tags HTML mais importantes para construir uma página.',
    duration: '10 min',
    concepts: ['HTML', 'Tags', 'Elementos', 'Atributos', 'Estrutura de Página'],
    status: 'pending',
    tags: ['HTML', 'Iniciante', 'Web'],
    progress: 0,
  },
  {
    id: 'l3',
    title: 'Seletores CSS Essenciais',
    description: 'Domine a arte de estilizar seus elementos com os seletores CSS mais utilizados.',
    duration: '20 min',
    concepts: ['CSS', 'Seletores', 'Classes', 'IDs', 'Pseudo-classes'],
    status: 'completed',
    tags: ['CSS', 'Intermediário', 'Web'],
    progress: 100,
  },
  {
    id: 'l4',
    title: 'Introdução a Funções em JavaScript',
    description: 'Crie blocos de código reutilizáveis: aprenda a definir e chamar funções em JavaScript.',
    duration: '18 min',
    concepts: ['Funções', 'Parâmetros', 'Retorno', 'Escopo', 'Arrow Functions'],
    status: 'pending',
    tags: ['JavaScript', 'Iniciante', 'Lógica'],
    progress: 0,
  },
];

// Dados mockados de flashcards
const mockFlashcards = [
  { id: 'f1', question: 'Qual a palavra-chave para definir uma função em Python?', answer: 'def', tags: ['Python', 'Funções'], mastery: 3 },
  { id: 'f2', question: 'Qual tag HTML cria um parágrafo?', answer: '<p>', tags: ['HTML', 'Tags'], mastery: 5 },
  { id: 'f3', question: 'Como selecionar um elemento com a classe "container" em CSS?', answer: '.container', tags: ['CSS', 'Seletores'], mastery: 4 },
  { id: 'f4', question: 'Qual o tipo de dado para verdadeiro/falso em Python?', answer: 'bool (booleano)', tags: ['Python', 'Tipos'], mastery: 2 },
  { id: 'f5', question: 'Como declarar uma variável constante em JavaScript?', answer: 'const', tags: ['JavaScript', 'Variáveis'], mastery: 1 },
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

// Componente de ProgressBar Simples (reutilizado)
const SimpleProgressBar = ({ value, label = "", color = "#3b82f6" }) => {
  return (
    <div style={{ width: '100%', backgroundColor: '#e5e7eb', borderRadius: '9999px', height: '8px', position: 'relative' }}>
      <div
        style={{
          width: `${value}%`,
          backgroundColor: color,
          height: '100%',
          borderRadius: 'inherit',
          transition: 'width 0.5s ease-out'
        }}
      ></div>
      {label && <span style={{ position: 'absolute', right: '0', top: '10px', fontSize: '12px', color: '#6b7280' }}>{label}</span>}
    </div>
  );
};

export function LessonDashboard() {
  const [selectedFlashcard, setSelectedFlashcard] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);

  const handleFlipFlashcard = (flashcard) => {
    setSelectedFlashcard(flashcard);
    setShowAnswer(false);
  };

  return (
    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <header style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#000', marginBottom: '8px' }}>Módulos e Aulas</h1>
        <p style={{ color: '#6b7280' }}>
          Explore nossos módulos de aprendizado, revise com flashcards e visualize conceitos.
        </p>
      </header>

      {/* Seção de Aulas (Lesson Cards) */}
      <SimpleCard>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#000', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <GraduationCap style={{ width: '24px', height: '24px', color: '#2563eb' }} />
          Suas Aulas
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          {mockLessons.map((lesson, i) => (
            <motion.div
              key={lesson.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <SimpleCard style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#000' }}>{lesson.title}</h3>
                    <div style={{
                      fontSize: '12px',
                      fontWeight: '500',
                      padding: '4px 8px',
                      borderRadius: '9999px',
                      backgroundColor: lesson.status === 'completed' ? '#dcfce7' : lesson.status === 'in-progress' ? '#fefce8' : '#eff6ff',
                      color: lesson.status === 'completed' ? '#16a34a' : lesson.status === 'in-progress' ? '#a16207' : '#2563eb',
                      border: '1px solid',
                      borderColor: lesson.status === 'completed' ? '#bbf7d0' : lesson.status === 'in-progress' ? '#fde68a' : '#bfdbfe',
                      display: 'flex', alignItems: 'center', gap: '4px'
                    }}>
                      {lesson.status === 'completed' && <CheckCircle style={{ width: '14px', height: '14px' }} />}
                      {lesson.status === 'in-progress' && <Clock style={{ width: '14px', height: '14px' }} />}
                      {lesson.status === 'pending' && <BookOpen style={{ width: '14px', height: '14px' }} />}
                      {lesson.status === 'pending' ? 'Pendente' : lesson.status === 'completed' ? 'Completo' : 'Em Progresso'}
                    </div>
                  </div>
                  <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '16px' }}>{lesson.description}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#6b7280', marginBottom: '16px' }}>
                    <PlayCircle style={{ width: '14px', height: '14px' }} />
                    <span>Duração: {lesson.duration}</span>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
                    {lesson.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} style={{
                        backgroundColor: '#e0e7ff', // bg-indigo-100 (simulado)
                        color: '#4f46e5', // text-indigo-700 (simulado)
                        fontSize: '12px',
                        padding: '4px 8px',
                        borderRadius: '6px',
                        fontWeight: '500'
                      }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  <SimpleProgressBar value={lesson.progress} label={`${lesson.progress}%`} color="#2563eb" />
                </div>
                <SimpleButton style={{ width: '100%', marginTop: '24px' }} onClick={() => alert(`Iniciar aula: ${lesson.title}`)}>
                  {lesson.status === 'completed' ? 'Revisar Aula' : 'Continuar Aprendendo'}
                </SimpleButton>
              </SimpleCard>
            </motion.div>
          ))}
        </div>
      </SimpleCard>

      {/* Seção de Flashcards */}
      <SimpleCard>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#000', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Lightbulb style={{ width: '24px', height: '24px', color: '#f59e0b' }} />
          Flashcards Rápidos
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px' }} className="md-grid-cols-2">
          {/* Flashcard Ativo / Selecionado */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            style={{
              backgroundColor: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '12px',
              padding: '24px',
              boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '200px',
              textAlign: 'center',
              perspective: '1000px', // Para o efeito flip
              position: 'relative'
            }}
          >
            {selectedFlashcard ? (
              <motion.div
                key={selectedFlashcard.id} // Key para animação de troca
                initial={{ rotateY: 0 }}
                animate={{ rotateY: showAnswer ? 180 : 0 }}
                transition={{ duration: 0.6 }}
                style={{
                  transformStyle: 'preserve-3d',
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'relative'
                }}
              >
                <div style={{
                  position: 'absolute',
                  backfaceVisibility: 'hidden',
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: '16px',
                }}>
                  <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#000', marginBottom: '16px' }}>{selectedFlashcard.question}</p>
                  <p style={{ fontSize: '14px', color: '#6b7280' }}>
                    {selectedFlashcard.tags.map(tag => `#${tag}`).join(' ')}
                  </p>
                </div>
                <div style={{
                  position: 'absolute',
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: '16px',
                  backgroundColor: '#f0fdf4', // Fundo levemente diferente para a resposta
                  borderRadius: '12px'
                }}>
                  <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#059669', marginBottom: '16px' }}>{selectedFlashcard.answer}</p>
                  <p style={{ fontSize: '14px', color: '#6b7280' }}>
                    {selectedFlashcard.tags.map(tag => `#${tag}`).join(' ')}
                  </p>
                </div>
              </motion.div>
            ) : (
              <p style={{ fontSize: '18px', color: '#6b7280' }}>Selecione um flashcard para começar!</p>
            )}
          </motion.div>

          {/* Lista de Flashcards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {mockFlashcards.map((fc, i) => (
              <motion.div
                key={fc.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                onClick={() => handleFlipFlashcard(fc)}
                style={{
                  backgroundColor: selectedFlashcard?.id === fc.id ? '#eff6ff' : '#f8fafc',
                  border: selectedFlashcard?.id === fc.id ? '1px solid #bfdbfe' : '1px solid #e5e7eb',
                  borderRadius: '8px',
                  padding: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease-in-out',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#e0effe'; }}
                onMouseLeave={(e) => { if (selectedFlashcard?.id !== fc.id) e.currentTarget.style.backgroundColor = '#f8fafc'; }}
              >
                <p style={{ fontSize: '14px', fontWeight: '500', color: '#000', marginBottom: '4px' }}>{fc.question.substring(0, 50)}...</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', fontSize: '11px', color: '#6b7280' }}>
                  {fc.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} style={{ backgroundColor: '#e2e8f0', padding: '2px 6px', borderRadius: '4px' }}>{tag}</span>
                  ))}
                </div>
              </motion.div>
            ))}
            {selectedFlashcard && (
              <SimpleButton onClick={() => setShowAnswer(!showAnswer)} style={{ marginTop: '16px', width: '100%' }}>
                {showAnswer ? 'Esconder Resposta' : 'Mostrar Resposta'}
              </SimpleButton>
            )}
          </div>
        </div>
        <SimpleButton variant="outline" style={{ width: '100%', marginTop: '24px' }}>
          Ver todos os Flashcards
        </SimpleButton>
      </SimpleCard>

      {/* Seção de Mapas Mentais (Placeholder) */}
      <SimpleCard style={{ textAlign: 'center' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#000', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
          <Layers style={{ width: '24px', height: '24px', color: '#8b5cf6' }} />
          Mapas Mentais
        </h2>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            backgroundColor: '#f5f3ff',
            border: '1px dashed #ddd6fe',
            borderRadius: '12px',
            padding: '48px',
            minHeight: '250px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '24px'
          }}
        >
          <MessageSquare style={{ width: '48px', height: '48px', color: '#a78bfa', marginBottom: '16px' }} />
          <p style={{ fontSize: '18px', fontWeight: '500', color: '#6d28d9', marginBottom: '8px' }}>
            Visualização de Mapas Mentais em Breve!
          </p>
          <p style={{ fontSize: '14px', color: '#8b5cf6' }}>
            Conecte conceitos e entenda a lógica por trás de cada tópico.
          </p>
        </motion.div>
        <SimpleButton variant="outline" onClick={() => alert('Abrir o visualizador de mapas mentais.')}>
          Explorar Mapas
        </SimpleButton>
      </SimpleCard>
    </div>
  )
}