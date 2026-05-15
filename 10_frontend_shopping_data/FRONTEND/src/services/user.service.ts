import { User } from "@/models/user.model";

export function getUsers() {
  const users = localStorage.getItem("users");
  return users ? (JSON.parse(users) as User[]) : [];
}

export function saveUsers(users: User[]) {
  localStorage.setItem("users", JSON.stringify(users));
}

export function findOrCreateGuestUser(email: string): Promise<User> {
  return new Promise((resolve) => {
    const users = getUsers();
    const existingUser = users.find((u) => u.email === email);
    if (existingUser) {
      setTimeout(() => resolve(existingUser), 1000);
      return;
    }

    const newUser: User = {
      id: Math.round(Math.random() * 1000000),
      email,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    users.push(newUser);
    setTimeout(() => resolve(newUser), 1000);
  });
}

export function getUserByEmail(email: string): Promise<User | null> {
  return new Promise((resolve) => {
    const users = getUsers();
    const user = users.find((u) => u.email === email);
    setTimeout(() => resolve(user || null), 1000);
  });
}

export function getUserById(id: number): Promise<User | null> {
  return new Promise((resolve) => {
    const users = getUsers();
    const user = users.find((u) => u.id === id);
    setTimeout(() => resolve(user || null), 1000);
  });
}

export function updateUser(
  updatedUser: Partial<User> & { id: string }
): Promise<User> {
  return new Promise((resolve, reject) => {
    const users = getUsers();
    const index = users.findIndex((u) => u.id === updatedUser.id);
    if (index === -1) {
      return reject(new Error("User not found"));
    }
    const user = { ...users[index], ...updatedUser };
    users[index] = user;

    saveUsers(users);

    setTimeout(() => {
      resolve(user);
    }, 1000);
  });
}
