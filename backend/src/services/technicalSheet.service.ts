import { AppDataSource } from '../data-source';
import { TechnicalSheet } from '../entities/TechnicalSheet';
import { TechnicalSheetItem } from '../entities/TechnicalSheetItem';

const sheetRepository = AppDataSource.getRepository(TechnicalSheet);
const itemRepository = AppDataSource.getRepository(TechnicalSheetItem);

export const getAllTechnicalSheets = async (): Promise<TechnicalSheet[]> => {
  return await sheetRepository.find({ relations: ["items", "items.ingredient", "product"] });
};

export const getTechnicalSheetById = async (id: string): Promise<TechnicalSheet | null> => {
  return await sheetRepository.findOne({ where: { id }, relations: ["items", "items.ingredient", "product"] });
};

export const createTechnicalSheet = async (sheetData: Partial<TechnicalSheet>, items: any[]): Promise<TechnicalSheet> => {
  const sheet = sheetRepository.create(sheetData);
  const savedSheet = await sheetRepository.save(sheet);

  if (items && items.length > 0) {
    const sheetItems = items.map(item => itemRepository.create({
      technicalSheet: savedSheet,
      ingredient: { id: item.ingredientId }, // Assume ingredient exists
      quantity: item.quantity
    }));
    await itemRepository.save(sheetItems);
  }

  return await getTechnicalSheetById(savedSheet.id) as TechnicalSheet;
};

export const updateTechnicalSheet = async (id: string, sheetData: Partial<TechnicalSheet>, items?: any[]): Promise<TechnicalSheet | null> => {
  const sheet = await sheetRepository.findOne({ where: { id }, relations: ["items"] });
  if (!sheet) return null;

  sheetRepository.merge(sheet, sheetData);
  await sheetRepository.save(sheet);

  if (items) {
    // Clear existing items and re-add (simple update strategy)
    await itemRepository.delete({ technicalSheet: { id } });
    const sheetItems = items.map(item => itemRepository.create({
      technicalSheet: sheet,
      ingredient: { id: item.ingredientId },
      quantity: item.quantity
    }));
    await itemRepository.save(sheetItems);
  }

  return await getTechnicalSheetById(id);
};

export const deleteTechnicalSheet = async (id: string): Promise<boolean> => {
  const result = await sheetRepository.delete(id);
  return result.affected !== 0;
};
