import bcrypt from 'bcrypt'
import { getInitializedDatabase } from '../mocks/dataBase';

// update the data service
export const updateUserService = async (userEmail: string, newData: { password?: string }): Promise<{ message: string; user?: any }> => {
  let handledBody: { password?: string } = { ...newData };

  if (newData.password) {
    // Gere o hash da senha usando bcrypt
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newData.password, saltRounds);
    handledBody.password = hashedPassword;
  }

  // get user by userEmail in the database
  let database = await getInitializedDatabase();
  const userIndex = database.findIndex(user => user.userEmail === userEmail);

  if (userIndex !== -1) {
    database[userIndex] = {
      ...database[userIndex],
      ...handledBody
    };
    return { message: 'User updated with success!', user: database[userIndex] };
  } else {
    throw new Error('User not found');
  }
}