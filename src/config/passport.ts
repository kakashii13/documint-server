import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { prisma } from "../prismaClient";
import dotenv from "dotenv";
import { UserService } from "../services/users";
import { HttpException } from "../services/httpException";

dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: `${process.env.SERVER_URL}/auth/google/callback`,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0].value;
        const googleId = profile?.id;

        // Buscar usuario existente por email
        if (!email) {
          return done(null, false, {
            message:
              "No pudimos obtener tu email desde Google. Intenta nuevamente o usa otro método de acceso",
          });
        }
        let user = await UserService.getUserByEmail(email);

        if (!user) {
          return done(null, false, {
            message: "No se pudo iniciar sesión con tu cuenta de Google.",
          });
        }

        // Si el usuario no tiene googleId lo guardo
        if (!user.googleId) {
          user = await UserService.updateUser(user.id, { googleId });
        }
        return done(null, user);
      } catch (error) {
        return done(null, false, {
          message: "Error en la autenticación con Google",
        });
      }
    }
  )
);
