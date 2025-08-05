


"use client"; 

import React, { useState } from "react";
import { useLanguage } from "@/app/LanguageContext"; // Подключаем контекст для языка
import Image from "next/image";
import NoAutorazeMenu from "@/app/components/NoAutorazeMenu"; // Используем уже существующий NoAutorazeMenu
import styles from "@/app/styles/Header.styles.module.scss";
import Menu from "./Menu";
import Link from "next/link";

// Добавляем переводы для текста
const translations = {
  ua: "Подобова оренда житла (Квартири, Готелі, Готелі для тварин, Хостели, Будинки, Сауни/Бані, Глемпінг, Пансіонат, Котедж для компній, Коворкінг, Автокемпінг, Бази відпочинку) по всій Україні без посередників.",
  ru: " Посуточная аренда жилья (Квартиры, Гостиницы, Гостинница для животных, Хостелы, Дома, Сауны/Бани, Глемпинг, Пансионат, Котедж для компаний, Коворкинг, Автокемпинг, Базы отдыха) по всей Украине без посредников.",
};

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentLanguage } = useLanguage(); // Извлекаем текущий язык из контекста

  const toggleMenu = () => setIsMenuOpen(prev => !prev);

  return (
    <>
      <header>
        <div className={styles.headerContainer}>
          {/* <h1 className={styles.homLogo}>NaDoby.com.ua</h1> */}
          <h1 className={styles.homLogo}>
          <Link href="/">NaDoby.com.ua</Link>
          </h1>

          <div className={styles.headerDiv}>
            <Image
              src="/burger.svg"
              alt="Меню"
              className={styles.burgerIcon}
              onClick={toggleMenu}
              width={24}
              height={24}
              style={{ cursor: 'pointer' }}></Image>
            </div>
        </div>
        
        {/* Отображаем текст в зависимости от текущего языка */}
        <p className={styles.homSlogan}>
          {translations[currentLanguage]} {/* Используем перевод в зависимости от языка */}
        </p>
      </header>
      
      {isMenuOpen && <Menu />} {/* Меню отображается, когда оно открыто */}
    </>
  );
}




     