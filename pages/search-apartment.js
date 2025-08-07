'use client';
import { LanguageProvider } from "@/app/LanguageContext";
import { Box } from '@mui/material';

import Header from "@/app/components/Header";
import { store } from "@/app/store";
import { Provider } from "react-redux";

import Search from "@/app/components/Search";
import Blog from "./blog";


export default function 
SearchApartment
() {
    return (
      <div>
        <Provider store={store}>
        <LanguageProvider>
           <Header />
          {/* <h1>search-apartment</h1> */}
         <Search/>
         <Box sx={{ mt: '-140px' }}>  {/* или любое другое значение */}
          <Blog />
        </Box>

         </LanguageProvider>
         </Provider>
      </div>
    );
  }

 