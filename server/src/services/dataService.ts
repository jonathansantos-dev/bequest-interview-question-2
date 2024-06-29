import { database, backup } from "../mocks/dataBase";

// get the data service
export const getDataService = () => {
  return database.data;
}

// update the data service
export const updateDataService = (data: string) => {
  database.data = data;
  backup.data = data;
}

// update the data service
export const recoverDataService = () => {
  database.data = backup.data;
  return database.data;
}