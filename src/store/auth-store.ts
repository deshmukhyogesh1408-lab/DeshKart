"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "@/types";

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  register: (name: string, email: string, password: string) => boolean;
  logout: () => void;
}

// Demo users stored in memory
const demoUsers: (User & { password: string })[] = [
  {
    id: "user-001",
    name: "John Doe",
    email: "john@example.com",
    password: "password123",
    role: "customer",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    createdAt: "2026-01-01T00:00:00Z",
  },
  {
    id: "admin-001",
    name: "Admin User",
    email: "admin@deshkart.com",
    password: "admin123",
    role: "admin",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    createdAt: "2025-12-01T00:00:00Z",
  },
];

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      login: (email, password) => {
        const user = demoUsers.find(
          (u) => u.email === email && u.password === password
        );
        if (user) {
          const { password: _, ...safeUser } = user;
          void _;
          set({ user: safeUser, isAuthenticated: true });
          return true;
        }
        return false;
      },

      register: (name, email, password) => {
        const exists = demoUsers.find((u) => u.email === email);
        if (exists) return false;

        const newUser: User & { password: string } = {
          id: `user-${Date.now()}`,
          name,
          email,
          password,
          role: "customer",
          createdAt: new Date().toISOString(),
        };
        demoUsers.push(newUser);

        const { password: _, ...safeUser } = newUser;
        void _;
        set({ user: safeUser, isAuthenticated: true });
        return true;
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
    }),
    {
      name: "deshkart-auth",
    }
  )
);
