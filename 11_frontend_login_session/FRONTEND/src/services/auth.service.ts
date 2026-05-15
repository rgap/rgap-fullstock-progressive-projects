import { type User } from "@/models/user.model";
import { getUserByEmail, getUserById } from "@/services/user.service";

const MOCK_PASSWORD = "letmein";
const SESSION_COOKIE = "full-stock-session";
const SESSION_DURATION_MS = 24 * 60 * 60 * 1000; // 24 hours

type Session = {
  userId: number;
  expiresAt: number;
};

function getSessionCookie(): Session | null {
  // document.cookie returns all visible cookies as one string.
  //
  // Example:
  // "theme=dark; full-stock-session=%7B%22userId%22%3A1%2C%22expiresAt%22%3A1710000000000%7D; language=en"
  //
  // Each cookie is separated by "; ", so we split the string into an array:
  //
  // [
  //   "theme=dark",
  //   "full-stock-session=%7B%22userId%22%3A1%2C%22expiresAt%22%3A1710000000000%7D",
  //   "language=en"
  // ]
  const found = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${SESSION_COOKIE}=`));

    // Now we search for the cookie whose name starts with "full-stock-session="
    //
    // Example match:
    // "full-stock-session=%7B%22userId%22%3A1%2C%22expiresAt%22%3A1710000000000%7D"

    // Then found = "full-stock-session=%7B%22userId%22%3A1%2C%22expiresAt%22%3A1710000000000%7D"
  if (!found) return null;
  try {
    // Then we split the cookie string by "="
    // ["full-stock-session", "%7B%22userId%22%3A1%2C%22expiresAt%22%3A1710000000000%7D"]
    // 
    // Then we decode the second element (the value)
    // decodeURIComponent("%7B%22userId%22%3A1%2C%22expiresAt%22%3A1710000000000%7D")
    // returns {"userId":1,"expiresAt":1710000000000}
    return JSON.parse(decodeURIComponent(found.split("=")[1]));
  } catch {
    return null;
  }
}

function setSessionCookie(session: Session): void {
  const cookieValue = encodeURIComponent(JSON.stringify(session));

  // JSON.stringify(session) returns {"userId":1,"expiresAt":1710000000000}
  // then that JSON text is encoded for safe storage inside a cookie:
  // encodeURIComponent(JSON.stringify(session)) returning %7B%22userId%22%3A1%2C%22expiresAt%22%3A1710000000000%7D

  const maxAge = SESSION_DURATION_MS / 1000; // cookie max-age is in seconds
  document.cookie = `${SESSION_COOKIE}=${cookieValue}; path=/; max-age=${maxAge}`;

  // Then cookie assignment (document.cookie) includes:
  //
  // full-stock-session=%7B%22userId%22%3A1%2C%22expiresAt%22%3A1710000000000%7D; path=/; max-age=86400
  //
  // But when reading document.cookie, the browser only returns:
  // full-stock-session=%7B%22userId%22%3A1%2C%22expiresAt%22%3A1710000000000%7D
  //
  // path and max-age are cookie attributes.
  // They are used by the browser, but they are not displayed when reading document.cookie.
  
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

export function logout(): void {
  document.cookie = `${SESSION_COOKIE}=; path=/; max-age=0`;
}
