import { User } from "@/types/user";

// Mock users database - In a real app, this would be on a backend
export const mockUsers: User[] = [
  {
    id: 1,
    name: "João Silva",
    email: "test@galinho.com.br",
    password: "123456",
    phone: "(11) 99999-9999",
    cpf: "123.456.789-00",
    isAdmin: false,
    createdAt: new Date("2024-01-15"),
  },
  {
    id: 2,
    name: "Maria Santos",
    email: "maria@galinho.com.br",
    password: "senha123",
    phone: "(11) 88888-8888",
    cpf: "987.654.321-00",
    isAdmin: false,
    createdAt: new Date("2024-02-20"),
  },
  {
    id: 99,
    name: "Admin Galinho",
    email: "admin@galinho.com.br",
    password: "admin123",
    phone: "(11) 77777-7777",
    cpf: "000.000.000-00",
    isAdmin: true,
    createdAt: new Date("2024-01-01"),
  },
];

// Helper function to find user by email
export const findUserByEmail = (email: string): User | undefined => {
  return mockUsers.find(
    (user) => user.email.toLowerCase() === email.toLowerCase()
  );
};

// Helper function to check if email already exists
export const emailExists = (email: string): boolean => {
  return mockUsers.some(
    (user) => user.email.toLowerCase() === email.toLowerCase()
  );
};

// Helper function to check if CPF already exists
export const cpfExists = (cpf: string): boolean => {
  const cleanCpf = cpf.replace(/\D/g, "");
  return mockUsers.some(
    (user) => user.cpf && user.cpf.replace(/\D/g, "") === cleanCpf
  );
};

