import { User } from "../types/types";
import { hashPassword } from "../utils/hashPassword";
import { HttpException } from "./httpException";
import { TokenService } from "./token";

class AuthService {
  static async login(user: User) {
    try {
      const token = TokenService.createToken({
        role: user.role,
        id: user.id,
      });
      const userData = {
        id: user.id,
        email: user.email,
        name: user.name,
      };

      return { userData, token };
    } catch (error) {
      throw new HttpException(500, `Error generado en Auth.service: ${error}`);
    }
  }
  static async activateAccount(userId: number, password: string) {
    try {
      // Todo: Chequear que la invitacion exista y no haya sido usada
      // e.g const invitation = await InvitationService.getInvitationByUserId(userId);
      // if (!invitation || invitation.used) {
      //   throw new HttpException(400, "Invitación no válida o ya utilizada.");
      // }
      const hash_password = await hashPassword(password);
      // Todo: Actualizar el usuario en la base de datos con el hash_password
      // Todo: Actualizar el usuario en la base de datos con el estado de activación
      // e.g await UserService.updateUser({userId, hash_password});
      // Todo: Actualizar la invitacion a usada
      // e.g await InvitationService.updateInvitation({userId, used: true});
      // Todo: Retonar mensaje de éxito
    } catch (error) {
      throw new HttpException(500, `Error generado en Auth.service: ${error}`);
    }
  }
}

export { AuthService };
