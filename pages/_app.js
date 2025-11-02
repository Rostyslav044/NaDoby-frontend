// pages/_app.js
// import "@/styles/globals.css";
import { useEffect } from "react";
import { Provider } from "react-redux";
import { SessionProvider } from "next-auth/react";
import { LanguageProvider } from "@/app/LanguageContext";
import { store } from "@/app/store";


import Footer from "@/app/components/Footer";
import "@/app/utils/axiosConfig";

export default function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // Можна додати глобову логіку, якщо потрібно
  }, []);

  return (
    <SessionProvider>
      <Provider store={store}>
        <LanguageProvider>
         
          {/* <AuthLogic /> */}
          <Component {...pageProps} />
         
          <Footer />
        </LanguageProvider>
      </Provider>
    </SessionProvider>
  );
}