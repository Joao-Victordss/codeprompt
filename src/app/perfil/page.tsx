// src/app/perfil/page.tsx
// Nenhuma importação de 'motion' é necessária aqui, pois ProfileDashboard já lida com isso internamente.
import { ProfileDashboard } from '../../components/ProfileDashboard'; // Importe ProfileDashboard

export default function PerfilPage() {
  return (
    // ProfileDashboard já tem seu próprio padding interno, não precisa de um div extra.
    <ProfileDashboard />
  )
}