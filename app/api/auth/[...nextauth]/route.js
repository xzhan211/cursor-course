import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { supabase } from "@/lib/supabase";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account.provider === "google") {
        try {
          // Check if user exists
          const { data: existingUser } = await supabase
            .from('users')
            .select()
            .eq('email', user.email)
            .single();

          if (!existingUser) {
            // Insert new user
            const { error } = await supabase
              .from('users')
              .insert({
                email: user.email,
                name: user.name,
                image_url: user.image,
                google_id: user.id,
                created_at: new Date().toISOString(),
                last_login: new Date().toISOString(),
              });

            if (error) throw error;
          } else {
            // Update last login for existing user
            const { error } = await supabase
              .from('users')
              .update({ last_login: new Date().toISOString() })
              .eq('email', user.email);

            if (error) throw error;
          }
        } catch (error) {
          console.error('Error saving user to Supabase:', error);
          return false;
        }
      }
      return true;
    },
    async session({ session, token }) {
      session.user.id = token.sub;
      return session;
    },
  },
});

export { handler as GET, handler as POST }; 