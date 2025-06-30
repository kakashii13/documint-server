import { Response, Request, NextFunction } from "express";
import { InvitationService } from "../services/invitation";
import { UserService } from "../services/users";
import { RequestCustom } from "../types/types";
import { SendEmail } from "../utils/mailService";
import { HttpException } from "../services/httpException";

/*
model Invitation {
  id         Int      @id @default(autoincrement())
  token      String   @unique
  expiresAt  DateTime
  used       Boolean  @default(false)
  userId     Int      @unique
  user       User     @relation(fields: [userId], references: [id])
}
 */

class InvitationController {
  static async createInvitation(
    req: RequestCustom,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { user } = req.body;
      // Todo: Crear el usuario en la base de datos
      const userCreated = await UserService.createUser(user);
      // Todo: Crear la invitacion en la base de datos
      const tokenCreated = await InvitationService.createInvitation(
        userCreated.id
      );
      const link = `${process.env.FRONTEND_URL}/activate/${tokenCreated}`;
      // Todo: Enviar un email al usuario con la invitacion
      const invitationEmail = await SendEmail.sendInvitation(
        userCreated.email || "",
        userCreated.name || "Usuario Invitado",
        link
      );

      if (invitationEmail) {
        res.status(201).json({
          message: "Invitación creada y enviada por correo electrónico.",
        });
      }
    } catch (error) {
      throw new HttpException(500, `Error en InvitationController: ${error}`);
    }
  }
}

export { InvitationController };
