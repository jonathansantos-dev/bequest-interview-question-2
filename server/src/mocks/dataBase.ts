import bcrypt from 'bcrypt'
// Mock data base
const password = "firstkey123"

const getEncriptData = async (password: string) => {
  // Generate the hash using bcrypt
  const saltRounds = 10
  const hashedPassword = await bcrypt.hash(password, saltRounds)  
  return hashedPassword
}

// Function to initialize database
const initializeDatabase = async () => {
  const hashedPassword = await getEncriptData(password);

  return [
    {
      userEmail: "user@example.com",
      password: hashedPassword  // bcrypt hash 
    }
  ];
};

export const getInitializedDatabase = async () => {
  return await initializeDatabase();
};