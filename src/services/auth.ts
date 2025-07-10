import { compare } from "bcrypt";
import { User } from "../types/types";
import { hashPassword } from "../utils/hashPassword";
import { HttpException } from "./httpException";
import { InvitationService } from "./invitation";
import { TokenService } from "./token";
import { UserService } from "./users";

class AuthService {
  static async login(user: User) {
    try {
      const token = TokenService.createToken({
        role: user.role,
        userId: user.id,
      });
      const userData = {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      };

      return { userData, token };
    } catch (error) {
      throw new HttpException(500, "Error al iniciar sesión.");
    }
  }
  static async activateAccount(token: string, password: string) {
    try {
      const invitation = await InvitationService.getInvitationByToken(token);

      if (!invitation || invitation.used) {
        throw new HttpException(400, "Invitación no válida o ya utilizada.");
      }
      const hash_password = await hashPassword(password);

      await UserService.updateUser({
        userId: invitation.userId,
        hash_password,
      });

      await InvitationService.updateInvitation({
        userId: invitation.userId,
        used: true,
      });
    } catch (error) {
      throw new HttpException(500, `Error generado en Auth.service: ${error}`);
    }
  }
}

export { AuthService };
