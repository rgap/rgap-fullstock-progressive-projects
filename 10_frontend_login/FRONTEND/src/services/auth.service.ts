import { type User } from "@/models/user.model";
import { getUserByEmail } from "@/services/user.service";

// The mock password. In a real app, passwords are hashed and compared server-side.
const MOCK_PASSWORD = "letmein";

export function login(email: string, password: string): Promise<User> {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      const user = await getUserByEmail(email);
      if (user && password === MOCK_PASSWORD) {
        resolve(user);
      } else {
        reject(new Error("Correo electrónico o contraseña incorrectos"));
      }
    }, 500);
  });
}
