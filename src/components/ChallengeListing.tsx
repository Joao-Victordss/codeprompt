'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Bug, Code, AlertCircle, Zap, TrendingUp, Filter, BarChart2, CheckCircle } from 'lucide-react'

// Dados mockados de múltiplos desafios
const mockChallenges = [
  {
    id: 'c1',
    title: 'Erro de Indentação em Python',
    description: 'Encontre e corrija o erro de identação para que o código seja executado corretamente.',
    code: `def saudacao(nome):\n    print("Olá, " + nome)\n\nsaudacao("João")`,
    difficulty: 'Iniciante',
    language: 'Python',
    points: 10,
    status: 'pending', // pending, solved, in-progress
    type: 'bug', // bug, algorithm, syntax
    hint: 'Verifique os espaços no início da linha dentro da função.'
  },
  {
    id: 'c2',
    title: 'Loop Infinito em JavaScript',
    description: 'Identifique e resolva o loop infinito no código fornecido.',
    code: `let i = 0;\nwhile(i < 5){\n  console.log(i);\n  // O que falta aqui?\n}`,
    difficulty: 'Iniciante',
    language: 'JavaScript',
    points: 15,
    status: 'pending',
    type: 'bug',
    hint: 'Você precisa de algo para parar o loop.'
  },
  {
    id: 'c3',
    title: 'Cálculo de Fatorial Recursivo',
    description: 'Implemente uma função recursiva para calcular o fatorial de um número.',
    code: `function fatorial(n) {\n  // Sua implementação aqui\n}\n\nconsole.log(fatorial(5));`,
    difficulty: 'Intermediário',
    language: 'JavaScript',
    points: 25,
    status: 'pending',
    type: 'algorithm',
    hint: 'Lembre-se do caso base da recursão.'
  },
  {
    id: 'c4',
    title: 'Centralizar Div com CSS',
    description: 'Faça a `div` filha centralizar horizontal e verticalmente dentro da `div` pai.',
    code: `<div class="pai">\n  <div class="filha"></div>\n</div>\n\n<style>\n.pai {\n  width: 300px;\n  height: 200px;\n  border: 1px solid black;\n  /* Seu CSS aqui */\n}\n.filha {\n  width: 50px;\n  height: 50px;\n  background-color: blue;\n}\n</style>`,
    difficulty: 'Iniciante',
    language: 'CSS',
    points: 10,
    status: 'solved', // Exemplo de desafio já resolvido
    type: 'syntax',
    hint: 'Flexbox ou Grid são suas amigas para centralização.'
  },
  {
    id: 'c5',
    title: 'Busca Binária em Python',
    description: 'Implemente o algoritmo de busca binária em uma lista ordenada.',
    code: `def busca_binaria(lista, elemento):\n  # Sua implementação aqui\n\nprint(busca_binaria([1,2,3,4,5], 3))`,
    difficulty: 'Avançado',
    language: 'Python',
    points: 40,
    status: 'pending',
    type: 'algorithm',
    hint: 'Divida e conquiste!'
  }
];

// Componente Card Simples (reutilizado do DemoContent)
const SimpleCard = ({ children, style = {} }) => (
  <div style={{
    backgroundColor: '#fff',
    border: '1px solid #e5e7eb', // border-border
    borderRadius: '12px', // rounded-xl
    padding: '24px', // p-6
    boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)', // shadow-sm
    ...style
  }}>
    {children}
  </div>
);

// Componente de Botão Simples (reutilizado do DemoContent)
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

// Componente de Select Simples (reutilizado do DemoContent)
const SimpleSelect = ({ value, onValueChange, children, style = {} }) => (
  <select
    value={value}
    onChange={(e) => onValueChange(e.target.value)}
    style={{
      padding: '8px 12px',
      borderRadius: '8px',
      border: '1px solid #e5e7eb',
      backgroundColor: '#fff',
      color: '#000',
      fontSize: '14px',
      cursor: 'pointer',
      outline: 'none',
      ...style
    }}
  >
    {children}
  </select>
);


export function ChallengeListing() {
  const [filterDifficulty, setFilterDifficulty] = useState('all');
  const [filterLanguage, setFilterLanguage] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredChallenges = mockChallenges.filter(challenge => {
    const matchesDifficulty = filterDifficulty === 'all' || challenge.difficulty === filterDifficulty;
    const matchesLanguage = filterLanguage === 'all' || challenge.language === filterLanguage;
    const matchesStatus = filterStatus === 'all' || challenge.status === filterStatus;
    return matchesDifficulty && matchesLanguage && matchesStatus;
  });

  return (
    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <header style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#000', marginBottom: '8px' }}>Explore Desafios</h1>
        <p style={{ color: '#6b7280' }}>
          Encontre desafios de programação para aprimorar suas habilidades.
        </p>
      </header>

      {/* Seção de Filtros */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '16px', // space-x-4 space-y-2
        alignItems: 'center',
        padding: '16px',
        backgroundColor: '#fff',
        border: '1px solid #e5e7eb',
        borderRadius: '12px',
        boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
      }}>
        <span style={{ fontSize: '14px', fontWeight: '500', color: '#000', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Filter style={{ width: '16px', height: '16px', color: '#6b7280' }} />
          Filtros:
        </span>
        <SimpleSelect value={filterDifficulty} onValueChange={setFilterDifficulty} style={{ minWidth: '120px' }}>
          <option value="all">Dificuldade</option>
          <option value="Iniciante">Iniciante</option>
          <option value="Intermediário">Intermediário</option>
          <option value="Avançado">Avançado</option>
        </SimpleSelect>
        <SimpleSelect value={filterLanguage} onValueChange={setFilterLanguage} style={{ minWidth: '120px' }}>
          <option value="all">Linguagem</option>
          <option value="Python">Python</option>
          <option value="JavaScript">JavaScript</option>
          <option value="CSS">CSS</option>
          <option value="HTML">HTML</option>
        </SimpleSelect>
        <SimpleSelect value={filterStatus} onValueChange={setFilterStatus} style={{ minWidth: '120px' }}>
          <option value="all">Status</option>
          <option value="pending">Pendente</option>
          <option value="solved">Resolvido</option>
          <option value="in-progress">Em Progresso</option>
        </SimpleSelect>
        <SimpleButton variant="secondary" onClick={() => { setFilterDifficulty('all'); setFilterLanguage('all'); setFilterStatus('all'); }}>
          Limpar Filtros
        </SimpleButton>
      </div>

      {/* Lista de Desafios */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
        {filteredChallenges.length > 0 ? (
          filteredChallenges.map((challenge, i) => (
            <motion.div
              key={challenge.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <SimpleCard style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#000' }}>{challenge.title}</h3>
                  <div style={{
                    fontSize: '12px',
                    fontWeight: '500',
                    padding: '4px 8px',
                    borderRadius: '9999px',
                    backgroundColor: challenge.status === 'solved' ? '#dcfce7' : challenge.status === 'in-progress' ? '#fefce8' : '#eff6ff',
                    color: challenge.status === 'solved' ? '#16a34a' : challenge.status === 'in-progress' ? '#a16207' : '#2563eb',
                    border: '1px solid',
                    borderColor: challenge.status === 'solved' ? '#bbf7d0' : challenge.status === 'in-progress' ? '#fde68a' : '#bfdbfe',
                    display: 'flex', alignItems: 'center', gap: '4px'
                  }}>
                    {challenge.status === 'solved' && <CheckCircle style={{ width: '14px', height: '14px' }} />}
                    {challenge.status === 'in-progress' && <TrendingUp style={{ width: '14px', height: '14px' }} />}
                    {challenge.status === 'pending' && <Zap style={{ width: '14px', height: '14px' }} />}
                    {challenge.status === 'pending' ? 'Pendente' : challenge.status === 'solved' ? 'Resolvido' : 'Em Progresso'}
                  </div>
                </div>
                <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '16px', flex: 1 }}>{challenge.description}</p>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', color: '#6b7280', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <BarChart2 style={{ width: '14px', height: '14px' }} />
                    <span>Nível: {challenge.difficulty}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Code style={{ width: '14px', height: '14px' }} />
                    <span>Linguagem: {challenge.language}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Zap style={{ width: '14px', height: '14px' }} />
                    <span>{challenge.points} pts</span>
                  </div>
                </div>

                <SimpleButton style={{ width: '100%', backgroundColor: '#2563eb' }}
                  onClick={() => alert(`Iniciar desafio: ${challenge.title}`)}
                >
                  Iniciar Desafio
                </SimpleButton>
              </SimpleCard>
            </motion.div>
          ))
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ textAlign: 'center', padding: '48px', backgroundColor: '#fff', borderRadius: '12px', gridColumn: '1 / -1', border: '1px dashed #e5e7eb' }}
          >
            <AlertCircle style={{ width: '32px', height: '32px', color: '#ef4444', marginBottom: '16px' }} />
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#000', marginBottom: '8px' }}>Nenhum desafio encontrado</h3>
            <p style={{ color: '#6b7280' }}>Ajuste seus filtros ou verifique novamente mais tarde.</p>
          </motion.div>
        )}
      </div>
    </div>
  )
}