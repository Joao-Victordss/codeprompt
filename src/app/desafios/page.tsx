// src/app/desafios/page.tsx
import { ChallengeListing } from '../../components/ChallengeListing'; // Importe ChallengeListing

export default function DesafiosPage() {
  return (
    // ChallengeListing já tem seu próprio padding interno, então não precisamos de um div extra aqui
    <ChallengeListing />
  )
}