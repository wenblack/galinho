export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  address?: string;
  phone?: string;
  cpf?: string;
  isAdmin?: boolean;
  createdAt: Date;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (name: string, email: string, password: string, address?: string, cpf?: string) => Promise<{ success: boolean; error?: string }>;
  updateUser: (updates: Partial<Pick<User, "email" | "address">>) => Promise<boolean>;
}

