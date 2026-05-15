import { type User } from "@/models/user.model";

// Users are persisted in localStorage so they survive page refreshes.
export function getUsers(): User[] {
  const raw = localStorage.getItem("users");
  return raw ? (JSON.parse(raw) as User[]) : [];
}

export function saveUsers(users: User[]): void {
  localStorage.setItem("users", JSON.stringify(users));
}

export function getUserByEmail(email: string): Promise<User | null> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const users = getUsers();
      const user = users.find((u) => u.email === email);
      resolve(user || null);
    }, 500);
  });
}

export function getUserById(id: number): Promise<User | null> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const users = getUsers();
      const user = users.find((u) => u.id === id);
      resolve(user || null);
    }, 500);
  });
}
