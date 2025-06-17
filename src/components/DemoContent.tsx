'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
// Ícones do Lucide React
import {
  BarChart2, Calendar, Clock, Award, TrendingUp, Target, BookOpen, BrainCircuit, AlertCircle
} from 'lucide-react' // Estes são os ÍCONES, corretos de lucide-react

// Componentes de gráfico do Recharts (estes DEVEM vir de 'recharts')
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts'; // <--- CORREÇÃO AQUI: Importa de 'recharts'

// Dados simulados adaptados para CodePrompt
const userData = {
  name: "João Silva",
  studyStreak: 5, // Dias consecutivos de estudo
  totalChallenges: 250,
  solvedChallenges: 24, // Desafios Resolvidos
  learningConcepts: 17,
  newConcepts: 8,
  todaySolved: 3, // Desafios resolvidos hoje
  weeklyGoal: 10, // Meta de desafios semanais
  weeklyCompleted: 7, // Desafios completados esta semana
  averageAccuracy: 87, // Taxa de acerto em diagnósticos
  studyTime: {
    today: 45, // minutos
    week: 240,
    month: 1200
  },
  languages: [ // Adaptado de "subjects" para "languages"
    { name: "Python", challenges: 120, mastery: 75, color: "#3B82F6" },
    { name: "HTML", challenges: 90, mastery: 62, color: "#10B981" },
    { name: "CSS", challenges: 75, mastery: 48, color: "#F59E0B" },
    { name: "JavaScript", challenges: 110, mastery: 88, color: "#EC4899" }
  ],
  weeklyActivity: [ // Adaptado para desafios resolvidos e tempo
    { day: "Dom", solved: 5, time: 25 },
    { day: "Seg", solved: 8, time: 40 },
    { day: "Ter", solved: 3, time: 20 },
    { day: "Qua", solved: 7, time: 35 },
    { day: "Qui", solved: 4, time: 25 },
    { day: "Sex", solved: 0, time: 0 },
    { day: "Sáb", solved: 6, time: 45 }
  ],
  monthlyRetention: [ // Adapte para "retenção de conceitos"
    { date: "01/06", retention: 65 },
    { date: "08/06", retention: 68 },
    { date: "15/06", retention: 72 },
    { date: "22/06", retention: 76 },
    { date: "29/06", retention: 81 },
  ],
  challengeDifficulty: [ // Adaptado de cardsDifficulty
    { name: "Fácil", value: 45 },
    { name: "Médio", value: 35 },
    { name: "Difícil", value: 20 },
  ],
  recentAchievements: [ // Conquistas
    { icon: <Award style={{ height: '20px', width: '20px' }} />, title: "Mestre da Constância", description: "5 dias seguidos de estudo", date: "Hoje" }, // Adaptei para 5 dias, baseado no streak
    { icon: <Target style={{ height: '20px', width: '20px' }} />, title: "Meta Semanal Batida", description: "10 desafios resolvidos em uma semana", date: "2 dias atrás" },
    { icon: <TrendingUp style={{ height: '20px', width: '20px' }} />, title: "Evolução Notável", description: "87% de acerto em Python", date: "1 semana atrás" }
  ]
};

// Cores para os gráficos (agora usadas em Recharts Cells e outros)
const COLORS_DIFFICULTY = ['#10B981', '#F59E0B', '#EF4444']; // Verde, Laranja, Vermelho

// Componente Card Simples (Substitui Card do Shadcn)
const SimpleCard = ({ children, title, description, style = {} }) => (
  <div style={{
    backgroundColor: '#fff',
    border: '1px solid #e5e7eb', // border-border
    borderRadius: '12px', // rounded-xl
    padding: '24px', // p-6
    boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)', // shadow-sm
    ...style
  }}>
    {title && <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#000', marginBottom: '8px' }}>{title}</h3>}
    {description && <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '16px' }}>{description}</p>}
    {children}
  </div>
);

// Componente de ProgressBar Simples (Substitui Progress do Shadcn)
const SimpleProgressBar = ({ value, max = 100, label = "", color = "#3b82f6" }) => {
  const percentage = (value / max) * 100;
  return (
    <div style={{ width: '100%', backgroundColor: '#e5e7eb', borderRadius: '9999px', height: '8px', position: 'relative' }}>
      <div
        style={{
          width: `${percentage}%`,
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

// Componente de Botão Simples (Substitui Button do Shadcn)
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
    buttonStyles = { ...buttonStyles, backgroundColor: '#2563eb', color: '#fff' }; // bg-blue-600 text-white
  } else if (variant === "outline") {
    buttonStyles = { ...buttonStyles, backgroundColor: 'transparent', color: '#2563eb', border: '1px solid #2563eb' }; // bg-transparent text-blue-600 border border-blue-600
  }

  return (
    <button style={buttonStyles} onClick={onClick}>
      {children}
    </button>
  );
};

// Componente de Select Simples (Substitui Select do Shadcn)
const SimpleSelect = ({ value, onValueChange, children }) => (
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
    }}
  >
    {children}
  </select>
);


export function DemoContent() {
  const [timeRange, setTimeRange] = useState("week");
  const [language, setLanguage] = useState("all");

  const filterdWeeklyActivity = language === "all" ? userData.weeklyActivity : userData.weeklyActivity.map(day => ({ ...day, solved: day.solved / 2, time: day.time / 2 })); // Simulação de filtro

  return (
    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <header style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#000', marginBottom: '8px' }}>Seu Progresso de Código</h1>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={{ color: '#6b7280' }}>
            Acompanhe sua evolução e verifique seu desempenho na programação.
          </p>
          <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
            <SimpleSelect value={timeRange} onValueChange={setTimeRange}>
              <option value="week">Esta semana</option>
              <option value="month">Este mês</option>
              <option value="quarter">3 meses</option>
              <option value="year">Este ano</option>
            </SimpleSelect>
            <SimpleSelect value={language} onValueChange={setLanguage}>
              <option value="all">Todas Linguagens</option>
              {userData.languages.map(lang => (
                <option key={lang.name} value={lang.name.toLowerCase()}>{lang.name}</option>
              ))}
            </SimpleSelect>
          </div>
        </div>
      </header>

      {/* Cards de Resumo - Agora lado a lado */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px', marginBottom: '32px' }}> {/* grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 */}
        <SimpleCard>
          <div style={{ display: 'flex', alignItems: 'center', fontSize: '14px', fontWeight: '500', color: '#6b7280', marginBottom: '8px' }}>
            <Clock style={{ marginRight: '8px', height: '16px', width: '16px', color: '#059669' }} /> {/* text-emerald-500 */}
            Tempo de Estudo
          </div>
          <div style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '4px', color: '#000' }}>{userData.studyTime[timeRange]} min</div>
          <div style={{ fontSize: '12px', color: '#6b7280' }}>
            +15% comparado ao período anterior
          </div>
        </SimpleCard>
        
        <SimpleCard>
          <div style={{ display: 'flex', alignItems: 'center', fontSize: '14px', fontWeight: '500', color: '#6b7280', marginBottom: '8px' }}>
            <BookOpen style={{ marginRight: '8px', height: '16px', width: '16px', color: '#3b82f6' }} /> {/* text-blue-500 */}
            Desafios Resolvidos
          </div>
          <div style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '4px', color: '#000' }}>{userData.todaySolved}</div>
          <div style={{ display: 'flex', alignItems: 'center', fontSize: '12px' }}>
            <SimpleProgressBar value={(userData.weeklyCompleted / userData.weeklyGoal) * 100} label={`${userData.weeklyCompleted}/${userData.weeklyGoal}`} color="#3b82f6" />
          </div>
        </SimpleCard>
        
        <SimpleCard>
          <div style={{ display: 'flex', alignItems: 'center', fontSize: '14px', fontWeight: '500', color: '#6b7280', marginBottom: '8px' }}>
            <Calendar style={{ marginRight: '8px', height: '16px', width: '16px', color: '#9333ea' }} /> {/* text-purple-500 */}
            Sequência de Estudo
          </div>
          <div style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '4px', color: '#000' }}>{userData.studyStreak} dias</div>
          <div style={{ fontSize: '12px', color: '#6b7280' }}>
            Seu recorde: 12 dias consecutivos
          </div>
        </SimpleCard>
        
        <SimpleCard>
          <div style={{ display: 'flex', alignItems: 'center', fontSize: '14px', fontWeight: '500', color: '#6b7280', marginBottom: '8px' }}>
            <Award style={{ marginRight: '8px', height: '16px', width: '16px', color: '#f59e0b' }} /> {/* text-amber-500 */}
            Taxa de Acerto
          </div>
          <div style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '4px', color: '#000' }}>{userData.averageAccuracy}%</div>
          <div style={{ fontSize: '12px', color: '#6b7280' }}>
            +2% esta semana
          </div>
        </SimpleCard>
      </div>

      {/* Tabs para as seções de progresso */}
      {/* Recriando as Tabs do Shadcn com divs e JS simples */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', borderBottom: '1px solid #e5e7eb' }}>
          {['overview', 'languages', 'retention', 'achievements'].map((tab) => (
            <motion.button
              key={tab}
              onClick={() => { /* Lógica para mudar a aba aqui, se for implementada */ }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                padding: '12px 16px',
                border: 'none',
                backgroundColor: 'transparent',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
                color: '#6b7280',
                borderBottom: '2px solid transparent',
                transition: 'all 0.15s ease-in-out',
                textTransform: 'capitalize'
              }}
              // Para um protótipo, não vamos implementar a lógica completa de mudança de aba, apenas o visual
            >
              {tab === 'overview' ? 'Visão Geral' : tab === 'languages' ? 'Linguagens' : tab === 'retention' ? 'Retenção' : 'Conquistas'}
            </motion.button>
          ))}
        </div>
        {/* Conteúdo da Visão Geral */}
        <div style={{ paddingTop: '24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px' }} className="lg-grid-cols-3"> {/* grid grid-cols-1 lg:grid-cols-3 gap-6 */}
            
            {/* Gráfico de Atividade Semanal */}
            <SimpleCard style={{ gridColumn: 'span 1' }} className="lg-col-span-2">
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#000', marginBottom: '4px' }}>Atividade Semanal</h3>
              <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '16px' }}>Acompanhe seus estudos nos últimos 7 dias</p>
              <div style={{ height: '320px' }}> {/* h-80 */}
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={filterdWeeklyActivity}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="day" axisLine={{ stroke: '#e5e7eb' }} tickLine={{ stroke: '#e5e7eb' }} />
                    <YAxis yAxisId="left" orientation="left" stroke="#3B82F6" axisLine={{ stroke: '#e5e7eb' }} tickLine={{ stroke: '#e5e7eb' }} />
                    <YAxis yAxisId="right" orientation="right" stroke="#10B981" axisLine={{ stroke: '#e5e7eb' }} tickLine={{ stroke: '#e5e7eb' }} />
                    <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '8px' }} />
                    <Legend wrapperStyle={{ paddingTop: '16px' }} />
                    <Bar yAxisId="left" dataKey="solved" name="Desafios Resolvidos" fill="#3B82F6" />
                    <Bar yAxisId="right" dataKey="time" name="Tempo (min)" fill="#10B981" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </SimpleCard>

            {/* Distribuição de Conceitos/Desafios */}
            <SimpleCard>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#000', marginBottom: '4px' }}>Seus Conceitos de Código</h3>
              <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '16px' }}>Status atual dos conceitos que você estuda</p>
              <div style={{ height: '208px' }}> {/* h-52 */}
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'Dominados', value: userData.solvedChallenges },
                        { name: 'Aprendendo', value: userData.learningConcepts },
                        { name: 'Novos', value: userData.newConcepts },
                      ]}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      <Cell fill="#10B981" /> {/* Verde */}
                      <Cell fill="#3B82F6" /> {/* Azul */}
                      <Cell fill="#9CA3AF" /> {/* Cinza */}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '8px' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginTop: '16px' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '12px', color: '#6b7280' }}>Dominados</div>
                  <div style={{ fontWeight: 'bold', color: '#059669' }}>{Math.round((userData.solvedChallenges / userData.totalChallenges) * 100)}%</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '12px', color: '#6b7280' }}>Aprendendo</div>
                  <div style={{ fontWeight: 'bold', color: '#2563eb' }}>{Math.round((userData.learningConcepts / userData.totalChallenges) * 100)}%</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '12px', color: '#6b7280' }}>Novos</div>
                  <div style={{ fontWeight: 'bold', color: '#4b5563' }}>{Math.round((userData.newConcepts / userData.totalChallenges) * 100)}%</div>
                </div>
              </div>
            </SimpleCard>

            {/* Desafios por Dificuldade */}
            <SimpleCard>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#000', marginBottom: '4px' }}>Nível de Dificuldade dos Desafios</h3>
              <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '16px' }}>Como você classifica seus desafios</p>
              <div style={{ height: '208px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={userData.challengeDifficulty}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      dataKey="value"
                    >
                      {userData.challengeDifficulty.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS_DIFFICULTY[index % COLORS_DIFFICULTY.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '8px' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '16px' }}>
                {userData.challengeDifficulty.map((item, index) => (
                  <div key={item.name} style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ width: '12px', height: '12px', borderRadius: '9999px', marginRight: '4px', backgroundColor: COLORS_DIFFICULTY[index] }}></div>
                    <span style={{ fontSize: '12px', color: '#6b7280' }}>{item.name}: {item.value}%</span>
                  </div>
                ))}
              </div>
            </SimpleCard>

            {/* Desempenho por Linguagem de Programação */}
            <SimpleCard style={{ gridColumn: 'span 1' }} className="lg-col-span-2">
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#000', marginBottom: '4px' }}>Desempenho por Linguagem</h3>
              <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '16px' }}>Taxa de domínio por linguagem de programação</p>
              <div style={{ height: '320px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    layout="vertical"
                    data={userData.languages}
                    margin={{ top: 5, right: 30, left: 60, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis type="number" domain={[0, 100]} axisLine={{ stroke: '#e5e7eb' }} tickLine={{ stroke: '#e5e7eb' }} />
                    <YAxis type="category" dataKey="name" axisLine={{ stroke: '#e5e7eb' }} tickLine={{ stroke: '#e5e7eb' }} />
                    <Tooltip formatter={(value) => [`${value}%`, 'Domínio']} contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '8px' }} />
                    <Legend wrapperStyle={{ paddingTop: '16px' }} />
                    <Bar dataKey="mastery" name="Domínio (%)" fill="#8884d8" radius={[0, 4, 4, 0]}>
                      {userData.languages.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </SimpleCard>

            {/* Próximos Desafios/Revisões */}
            <SimpleCard>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#000', marginBottom: '4px' }}>Próximos Desafios Sugeridos</h3>
              <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '16px' }}>Baseado no seu progresso e pontos fracos</p>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}> {/* space-y-4 */}
                <li style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', backgroundColor: '#eff6ff', borderRadius: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ backgroundColor: '#bfdbfe', padding: '8px', borderRadius: '6px', marginRight: '12px' }}>
                      <BrainCircuit style={{ height: '20px', width: '20px', color: '#2563eb' }} />
                    </div>
                    <div>
                      <p style={{ fontWeight: '500', fontSize: '14px', color: '#000' }}>Erro de Indentação em Python</p>
                      <p style={{ fontSize: '12px', color: '#6b7280' }}>Dificuldade: Iniciante</p>
                    </div>
                  </div>
                  <p style={{ fontSize: '12px', fontWeight: '500', color: '#2563eb' }}>Hoje</p>
                </li>
                
                <li style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', backgroundColor: '#f5f3ff', borderRadius: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ backgroundColor: '#ddd6fe', padding: '8px', borderRadius: '6px', marginRight: '12px' }}>
                      <BrainCircuit style={{ height: '20px', width: '20px', color: '#9333ea' }} />
                    </div>
                    <div>
                      <p style={{ fontWeight: '500', fontSize: '14px', color: '#000' }}>Seletores CSS Complexos</p>
                      <p style={{ fontSize: '12px', color: '#6b7280' }}>Dificuldade: Intermediário</p>
                    </div>
                  </div>
                  <p style={{ fontSize: '12px', fontWeight: '500', color: '#9333ea' }}>Amanhã</p>
                </li>
                
                <li style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', backgroundColor: '#ecfdf5', borderRadius: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ backgroundColor: '#d1fae5', padding: '8px', borderRadius: '6px', marginRight: '12px' }}>
                      <BrainCircuit style={{ height: '20px', width: '20px', color: '#16a34a' }} />
                    </div>
                    <div>
                      <p style={{ fontWeight: '500', fontSize: '14px', color: '#000' }}>Manipulação de Strings em JavaScript</p>
                      <p style={{ fontSize: '12px', color: '#6b7280' }}>Dificuldade: Iniciante</p>
                    </div>
                  </div>
                  <p style={{ fontSize: '12px', fontWeight: '500', color: '#16a34a' }}>Em 3 dias</p>
                </li>
              </ul>

              <SimpleButton variant="outline" style={{ width: '100%', marginTop: '16px' }}>
                Ver todos os desafios sugeridos
              </SimpleButton>
            </SimpleCard>
          </div>
        </div>
        
        {/* Aba: Linguagens (Conteúdo duplicado da Visão Geral, para fins de protótipo) */}
        {/* Em um app real, você teria lógica para renderizar conteúdo diferente para cada aba */}
        {/* Por enquanto, vamos manter a Visão Geral para o propósito do protótipo */}

        {/* Aba: Retenção */}
        {/* Em um app real, você teria lógica para renderizar conteúdo diferente para cada aba */}

        {/* Aba: Conquistas */}
        {/* Em um app real, você teria lógica para renderizar conteúdo diferente para cada aba */}
      </div>
    </div>
  );
}