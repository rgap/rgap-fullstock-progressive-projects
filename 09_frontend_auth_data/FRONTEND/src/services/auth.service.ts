import { User } from "@/models/user.model";
import { getUserById, getUsers, saveUsers } from "@/services/user.service";
import { getUserByEmail } from "@/services/user.service";

type Session = {
  userId: number;
  expiresAt: number;
};

function getSessionCookie(): Session | null {
  const found = document.cookie
    .split("; ")
    .find((row) => row.startsWith("full-stock-session="));
  if (!found) return null;
  try {
    return JSON.parse(decodeURIComponent(found.split("=")[1]));
  } catch {
    return null;
  }
}

function setSessionCookie(session: Session): void {
  const cookieValue = encodeURIComponent(JSON.stringify(session));
  const maxAge = 24 * 60 * 60; // 24 hours in seconds
  document.cookie = `full-stock-session=${cookieValue}; path=/; max-age=${maxAge}`;
}

export async function getCurrentUser(): Promise<User | null> {
  const sessionCookie = getSessionCookie();

  if (!sessionCookie || sessionCookie.expiresAt < Date.now()) {
    return null;
  }

  try {
    const user = await getUserById(sessionCookie.userId);
    return user;
  } catch {
    return null;
  }
}

export function login(email: string, password: string): Promise<User> {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      const user = await getUserByEmail(email);
      if (user && password === "letmein") {
        const session = {
          userId: user.id,
          expiresAt: Date.now() + 24 * 60 * 60 * 1000,
        };
        setSessionCookie(session);

        resolve(user);
      } else {
        reject(new Error("Correo electrónico o contraseña incorrectos"));
      }
    }, 1000);
  });
}

export function signup(email: string, password: string): Promise<User> {
  console.log(
    password.replace(/./g, "*"),
    "Omitted password parameter for signup"
  );

  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      const existingUser = await getUserByEmail(email);

      if (existingUser) {
        reject(new Error("Ya existe una cuenta con este correo electrónico"));
        return;
      }

      const user: User = {
        id: Math.round(Math.random() * 1000000),
        email,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const users = getUsers();

      users.push(user);

      saveUsers(users);

      const session = {
        userId: user.id,
        expiresAt: Date.now() + 24 * 60 * 60 * 1000,
      };
      setSessionCookie(session);

      resolve(user);
    }, 1000);
  });
}

export function logout(): void {
  document.cookie = "full-stock-session=; path=/; max-age=0";
}
