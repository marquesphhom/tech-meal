import { AppDataSource } from '../data-source';
import { Table } from '../entities/Table';

const tableRepository = AppDataSource.getRepository(Table);

export const getAllTables = async (): Promise<Table[]> => {
  return await tableRepository.find();
};

export const getTableByNumber = async (number: string): Promise<Table | null> => {
  return await tableRepository.findOneBy({ number });
};

export const createTable = async (tableData: Partial<Table>): Promise<Table> => {
  const table = tableRepository.create(tableData);
  return await tableRepository.save(table);
};

export const updateTable = async (number: string, tableData: Partial<Table>): Promise<Table | null> => {
  const table = await tableRepository.findOneBy({ number });
  if (!table) return null;
  tableRepository.merge(table, tableData);
  return await tableRepository.save(table);
};

export const deleteTable = async (number: string): Promise<boolean> => {
  const result = await tableRepository.delete(number);
  return result.affected !== 0;
};
