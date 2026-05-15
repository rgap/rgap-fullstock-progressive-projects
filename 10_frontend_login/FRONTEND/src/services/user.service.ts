import { type User } from "@/models/user.model";

// Simulated user database — stored in memory for now.
const users: User[] = [
  {
    id: 1,
    email: "demo@fullstock.com",
    createdAt: "2025-10-14T01:53:10.703Z",
    updatedAt: "2025-10-14T01:53:10.703Z",
  },
];

export function getUserByEmail(email: string): Promise<User | null> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const user = users.find((u) => u.email === email);
      resolve(user || null);
    }, 500);
  });
}
