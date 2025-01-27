"use client"; 
import { Inter } from 'next/font/google';
import { Provider } from 'react-redux';
import { store } from './store/store';
import './globals.css'; 
const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://domain.com" />
      </head>
      <body className={inter.className}>
        <Provider store={store}>
          {children}
        </Provider>
      </body>
    </html>
  );
}