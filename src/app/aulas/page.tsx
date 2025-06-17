// src/app/aulas/page.tsx
// Nenhuma importação de 'motion' é necessária aqui, pois LessonDashboard já lida com isso internamente.
import { LessonDashboard } from '../../components/LessonDashboard'; // Importe LessonDashboard

export default function AulasPage() {
  return (
    // LessonDashboard já tem seu próprio padding interno, não precisa de um div extra.
    <LessonDashboard />
  )
}