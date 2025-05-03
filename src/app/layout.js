

'use client'
// app/layout.js
import React from 'react';
import {LanguageProvider} from '@/app/LanguageContext';
import { Roboto, Lato } from 'next/font/google';
import Providers from './providers';
import Profile from './components/testAvtoriz';
import { SessionProvider } from "next-auth/react"
// Применение шрифтов:
const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
});

const lato = Lato({
  weight: ['400', '700'],
  subsets: ['latin'],
});

export default function Layout({ children }) {
  return (
    <html lang="ua">
      <head />
      <body className={lato.className}>
      <SessionProvider>
       
        <LanguageProvider>
        <Providers>
          <main >
         <Profile></Profile>
         
            {children}
           
            </main>

            </Providers>
        </LanguageProvider>
        </SessionProvider>
        </body>
    </html>
  );
}
