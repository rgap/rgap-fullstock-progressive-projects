import { type User } from "@/models/user.model";
import { getUserByEmail, getUserById } from "@/services/user.service";
import { getUsers, saveUsers } from "@/services/user.service";

const MOCK_PASSWORD = "letmein";
const SESSION_COOKIE = "full-stock-session";
const SESSION_DURATION_MS = 24 * 60 * 60 * 1000; // 24 hours

type Session = {
  userId: number;
  expiresAt: number;
};

function getSessionCookie(): Session | null {
  const found = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${SESSION_COOKIE}=`));
  if (!found) return null;
  try {
    return JSON.parse(decodeURIComponent(found.split("=")[1]));
  } catch {
    return null;
  }
}

function setSessionCookie(session: Session): void {
  const cookieValue = encodeURIComponent(JSON.stringify(session));
  const maxAge = SESSION_DURATION_MS / 1000;
  document.cookie = `${SESSION_COOKIE}=${cookieValue}; path=/; max-age=${maxAge}`;
}

export async function getCurrentUser(): Promise<User | null> {
  const session = getSessionCookie();
  if (!session || session.expiresAt < Date.now()) return null;
  return getUserById(session.userId);
}

export function login(email: string, password: string): Promise<User> {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      const user = await getUserByEmail(email);
      if (user && password === MOCK_PASSWORD) {
        setSessionCookie({
          userId: user.id,
          expiresAt: Date.now() + SESSION_DURATION_MS,
        });
        resolve(user);
      } else {
        reject(new Error("Correo electrónico o contraseña incorrectos"));
      }
    }, 500);
  });
}

export function signup(email: string, _password: string): Promise<User> {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      const existingUser = await getUserByEmail(email);
      if (existingUser) {
        reject(new Error("Ya existe una cuenta con este correo electrónico"));
        return;
      }

      const newUser: User = {
        id: Math.round(Math.random() * 1_000_000),
        email,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const users = getUsers();
      users.push(newUser);
      saveUsers(users);

      // Session is NOT set here yet — the user must log in manually.
      resolve(newUser);
    }, 500);
  });
}

export function logout(): void {
  document.cookie = `${SESSION_COOKIE}=; path=/; max-age=0`;
}
