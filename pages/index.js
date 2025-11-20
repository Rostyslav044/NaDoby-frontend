// pages/index.js
'use client';

import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { store } from "@/app/store";
import {  useLanguage } from "@/app/LanguageContext";
import { LanguageProvider } from "@/app/LanguageContext";
import { SessionProvider } from "next-auth/react";
import Header from "@/app/components/Header";
import Search from "@/app/components/Search";
import Apartments from "@/app/components/Apartments";
import Blog from "./blog";
import Head from "next/head";
import AuthLogic from "@/app/components/AuthLogic";

import Footer from "@/app/components/Footer";


const TRANSLATIONS = {
  ua: {
    metaTitle: "Оренда квартир, будинків і готелів | NaDoby",
    metaDescription:
      "Знайдіть житло для оренди на короткий або тривалий термін. Квартири, готелі, будинки, сауни — усе в одному місці.",
    welcome: "Вітаємо на NaDoby!",
    loading: "Завантаження даних користувача...",
  },
  ru: {
    metaTitle: "Аренда квартир, домов и гостиниц | NaDoby",
    metaDescription:
      "Найдите жильё для аренды на короткий или длительный срок. Квартиры, гостиницы, дома, сауны — всё в одном месте.",
    welcome: "Добро пожаловать на NaDoby!",
    loading: "Загрузка данных пользователя...",
  },
};

function HomeContent() {
  const { currentLanguage } = useLanguage();
  const t = TRANSLATIONS[currentLanguage];

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem("auth_token");

    if (!token) {
      setLoading(false);
      return;
    }

    (async () => {
      try {
        const response = await fetch("http://localhost:3000/api/v1/auth/me", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        // if (!response.ok)
        //   throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();
        console.log("Отримано користувача:", data);
        setUser(data);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Fetch error:", error);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <>
        <Head>
          <title>{t.metaTitle}</title>
          <meta name="description" content={t.metaDescription} />
        </Head>
        <p style={{ textAlign: "center", marginTop: "40px" }}>{t.loading}</p>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{t.metaTitle}</title>
        <meta name="description" content={t.metaDescription} />
      </Head>
<AuthLogic /> 
      <Header />
      <Search />
      <main style={{ padding: "20px" }}>
      

        <Apartments />
        <Blog />
      

        {/* <Footer/> */}
        
      </main>
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {
      generatedAt: new Date().toISOString(),
    },
    revalidate: 86400,
  };
}

export default function HomePage() {
  return (
       <SessionProvider>
    <Provider store={store}>
      <LanguageProvider>
        
        <HomeContent />
      </LanguageProvider>
    </Provider>
    </SessionProvider>
  );
}