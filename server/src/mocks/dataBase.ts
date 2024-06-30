import bcrypt from 'bcrypt';

const INITIAL_PASSWORD = 'firstkey123'

// Banco de dados mockado em memória
let database: { userEmail: string; password: string }[] = [];

// Função para criptografar a senha
const getEncriptData = async (password: string): Promise<string> => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

// Função para inicializar o banco de dados
const initializeDatabase = async () => {
  const hashedPassword = await getEncriptData(INITIAL_PASSWORD);
  database = [
    {
      userEmail: "user@example.com",
      password: hashedPassword
    }
  ];
};

// Função para obter o banco de dados inicializado
export const getInitializedDatabase = async () => {
  if (database.length === 0) {
    await initializeDatabase();
  }
  return database;
};