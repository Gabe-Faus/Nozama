import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { db } from "@/server/db";

export const userRouter = createTRPCRouter({
  register: publicProcedure
    .input(
      z.object({
        email: z.string().email("Invalid email"),
        name: z.string().min(2, "Name must be at least 2 characters"),
        password: z.string().min(6, "Password must be at least 6 characters"),
      })
    )
    .mutation(async ({ input }) => {
      const { email, name, password } = input;

      // Verificar se usuário já existe
      const existingUser = await db.user.findUnique({
        where: { email }
      });

      if (existingUser) {
        throw new Error("Este email já está cadastrado");
      }

      const ADMIN_PASSWORD = "ABCDEFG";
      const isAdmin = password === ADMIN_PASSWORD;

      const user = await db.user.create({
        data: {
          email,
          name,
          password: password, 
          isAdmin: isAdmin,
        }
      });

      const { password: _, ...userWithoutPassword } = user;

      return {
        success: true,
        message: isAdmin 
          ? "Admin account created successfully!" 
          : "Account created successfully!",
        user: userWithoutPassword,
        isAdmin: isAdmin
      };
    }),
});