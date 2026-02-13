import { AppDataSource } from '../data-source';
import { Ingredient } from '../entities/Ingredient';

const ingredientRepository = AppDataSource.getRepository(Ingredient);

export const getAllIngredients = async (): Promise<Ingredient[]> => {
  return await ingredientRepository.find();
};

export const getIngredientById = async (id: string): Promise<Ingredient | null> => {
  return await ingredientRepository.findOneBy({ id });
};

export const createIngredient = async (ingredientData: Partial<Ingredient>): Promise<Ingredient> => {
  const ingredient = ingredientRepository.create(ingredientData);
  return await ingredientRepository.save(ingredient);
};

export const updateIngredient = async (id: string, ingredientData: Partial<Ingredient>): Promise<Ingredient | null> => {
  const ingredient = await ingredientRepository.findOneBy({ id });
  if (!ingredient) return null;
  ingredientRepository.merge(ingredient, ingredientData);
  return await ingredientRepository.save(ingredient);
};

export const deleteIngredient = async (id: string): Promise<boolean> => {
  const result = await ingredientRepository.delete(id);
  return result.affected !== 0;
};
