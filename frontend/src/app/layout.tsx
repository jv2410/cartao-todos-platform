import type { Metadata } from 'next';
import './globals.css';
import { SessionProvider } from '../components/session-provider';

export const metadata: Metadata = {
  title: 'Cartão Todos - Plataforma de Mensagens Meta',
  description: 'Sistema de gerenciamento para WhatsApp Business API',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
