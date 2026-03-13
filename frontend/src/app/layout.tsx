import type { Metadata } from 'next';
import './globals.css';
import { SessionProvider } from '../components/session-provider';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  title: 'Cartão Todos - Plataforma de Mensagens Meta',
  description: 'Sistema de gerenciamento para WhatsApp Business API',
  icons: {
    icon: [
      { url: '/assets/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/assets/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' }
    ],
    apple: '/assets/favicon/apple-touch-icon.png',
    other: [
      {
        rel: 'mask-icon',
        url: '/assets/favicon/safari-pinned-tab.svg',
      }
    ]
  },
  themeColor: '#00A988',
  openGraph: {
    title: 'Cartão Todos - Plataforma de Mensagens Meta',
    description: 'Sistema de gerenciamento para WhatsApp Business API',
    images: ['/og-image.png'],
    locale: 'pt_BR',
    type: 'website',
  }
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
