// import NextAuth from "next-auth"
// import GoogleProvider from "next-auth/providers/google"

// const handler = NextAuth({
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     }),
//   ],
//   secret: process.env.NEXTAUTH_SECRET,
// })

// export { handler as GET, handler as POST }




import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  providers: [
  GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID,
clientSecret: process.env.GOOGLE_CLIENT_SECRET,

  }),
],
  secret: process.env.NEXTAUTH_SECRET,
  
});