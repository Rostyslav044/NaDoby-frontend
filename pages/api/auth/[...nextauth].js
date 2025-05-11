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
import CredentialsProvider from "next-auth/providers/credentials"; // або Google, GitHub і т.д.

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      authorize(credentials) {
        // авторизація
    console.log(credentials);
        const user = { id: 1, name: "admin" };
        return user;
      }
    })
  ]
});