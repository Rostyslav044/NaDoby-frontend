// 'use client';
// import { LanguageProvider } from "@/app/LanguageContext";

// import Header from "@/app/components/Header";
// import { store } from "@/app/store";
// import { Provider } from "react-redux";



// export default function Blog() {
//     return (
//       <div>
//         <Provider store={store}>
//         <LanguageProvider>
//            <Header />
       
//          <h1>Blog</h1>
       
       
         
//          </LanguageProvider>
//          </Provider>
//       </div>
//     );
//   }



// 'use client'
// import { LanguageProvider } from "@/app/LanguageContext"
// import Header from "@/app/components/Header"
// import { store } from "@/app/store"
// import { Provider } from "react-redux"
// import { useLanguage } from "@/app/LanguageContext"
// import { Box, Typography, Container, Card, CardContent, Button } from '@mui/material'
// import Image from 'next/image'

// // Контент блога на двух языках
// const BLOG_CONTENT = {
//   ua: {
//     title: "Наш Блог",
//     posts: [
//       {
//         title: "🔑 Як обрати ідеальну квартиру для оренди",
//         content: "Поради по вибору квартири для короткострокової оренди в Україні.",
//         image: "/images/blog-apartment.jpg"
//       },
//       {
//         title: "🏡 Переваги оренди будинку замість готелю",
//         content: "Чому оренда приватного будинку може бути кращим вибором для відпочинку.",
//         image: "/images/blog-house.jpg"
//       }
//     ]
//   },
//   ru: {
//     title: "Наш Блог",
//     posts: [
//       {
//         title: "🔑 Как выбрать идеальную квартиру для аренды",
//         content: "Советы по выбору квартиры для краткосрочной аренды в Украине.",
//         image: "/images/blog-apartment.jpg"
//       },
//       {
//         title: "🏡 Преимущества аренды дома вместо отеля",
//         content: "Почему аренда частного дома может быть лучшим выбором для отдыха.",
//         image: "/images/blog-house.jpg"
//       }
//     ]
//   }
// }

// function BlogContent() {
//   const { currentLanguage } = useLanguage()
//   const content = BLOG_CONTENT[currentLanguage]

//   return (
//     <Box sx={{ p: 4 }}>
//       <Typography variant="h2" component="h1" sx={{ mb: 4 }}>
//         {content.title}
//       </Typography>
      
//       <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 4 }}>
//         {content.posts.map((post, index) => (
//           <Card key={index} sx={{ height: '100%' }}>
//             <Box sx={{ position: 'relative', height: 200 }}>
//               <Image
//                 src={post.image}
//                 alt={post.title}
//                 fill
//                 style={{ objectFit: 'cover' }}
//               />
//             </Box>
//             <CardContent>
//               <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
//                 {post.title}
//               </Typography>
//               <Typography variant="body1" sx={{ mb: 3 }}>
//                 {post.content}
//               </Typography>
//               <Button variant="contained">
//                 {currentLanguage === 'ua' ? 'Читати далі' : 'Читать далее'}
//               </Button>
//             </CardContent>
//           </Card>
//         ))}
//       </Box>
//     </Box>
//   )
// }

// export default function Blog() {
//   return (
//     <Provider store={store}>
//       <LanguageProvider>
//         <Header />
//         <BlogContent />
//       </LanguageProvider>
//     </Provider>
//   )
// }


'use client'

import { LanguageProvider, useLanguage } from "@/app/LanguageContext"
import Header from "@/app/components/Header"
import { store } from "@/app/store"
import { Provider } from "react-redux"
import { Box, Typography, Container, Card, CardContent, Button } from '@mui/material'
import Image from 'next/image'

// Двухъязычный контент для блога
const BLOG_CONTENT = {
  ua: {
    title: "Наш Блог",
    posts: [
      {
        title: " Квартира як новий старт",
        content: "Як короткочасна оренда допомагає перезавантажитися та змінити ритм життя.",
        image: "/apartment.png"
      },
      {
        title: " Готелі з характером",
        content: "На що звертати увагу, щоб готель був не просто зручним, а надихаючим.",
        image: "/hotel.png"
      },
      {
        title: " Хостел — це історії",
        content: "Чому проживання в хостелі — це більше ніж бюджетний варіант.",
        image: "/hostel.png"
      },
      {
        title: " Дім серед тиші",
        content: "Орендуй заміський будинок і влаштуй собі цифровий детокс.",
        image: "/house.png"
      },
      {
        title: " Сауна як ритуал",
        content: "Традиції, переваги та чому варто подарувати тілу спокій.",
        image: "/sauna.png"
      },
      {
        title: " Бази відпочинку - гармонія",
        content: "Як час серед природи змінює стан та світовідчуття.",
        image: "/camp.png"
      }
    ]
  },
  ru: {
    title: "Наш Блог",
    posts: [
      {
        title: " Квартира как новый старт",
        content: "Как краткосрочная аренда помогает перезагрузиться и сменить ритм жизни.",
        image: "/apartment.png"
      },
      {
        title: " Гостиницы с душой",
        content: "На что обращать внимание, чтобы отель был не просто удобным",
        image: "/hotel.png"
      },
      {
        title: " Хостел — это истории",
        content: "Почему проживание в хостеле — больше, чем бюджетный вариант.",
        image: "/hostel.png"
      },
      {
        title: " Дом среди тишины",
        content: "Арендуй загородный дом и устрой себе цифровой детокс.",
        image: "/house.png"
      },
      {
        title: " Сауна как ритуал",
        content: "Традиции, польза и почему стоит подарить телу покой.",
        image: "/sauna.png"
      },
      {
        title: " Базы отдыха - гармония",
        content: "Как время на природе меняет состояние и восприятие.",
        image: "/camp.png"
      }
    ]
  }
}

function BlogContent() {
  const { currentLanguage } = useLanguage()
  const content = BLOG_CONTENT[currentLanguage]

  return (
    <Container sx={{ py: 6 }}>
      <Typography variant="h3" component="h1" sx={{ mb: 4, fontWeight: 'bold' }}>
        {content.title}
      </Typography>

      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 4 }}>
        {content.posts.map((post, index) => (
          <Card key={index} sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ position: 'relative', height: 200 }}>
              <Image
                src={post.image}
                alt={post.title}
                fill
                // style={{ objectFit: 'cover' }}
              />
            </Box>
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography variant="h5" sx={{ mb: 2 }}>
                {post.title}
              </Typography>
              <Typography variant="body1" sx={{ mb: 3 }}>
                {post.content}
              </Typography>
              <Button variant="contained">
                {currentLanguage === 'ua' ? 'Читати далі' : 'Читать далее'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Container>
  )
}

export default function Blog() {
  return (
    <Provider store={store}>
      <LanguageProvider>
        <Header />
        <BlogContent />
      </LanguageProvider>
    </Provider>
  )
}