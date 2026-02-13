import { AppDataSource } from '../data-source';
import { Product } from '../entities/Product';

const productRepository = AppDataSource.getRepository(Product);

export const getAllProducts = async (): Promise<Product[]> => {
  return await productRepository.find({ relations: ["technicalSheet"] });
};

export const getProductById = async (id: string): Promise<Product | null> => {
  return await productRepository.findOne({ where: { id }, relations: ["technicalSheet"] });
};

export const createProduct = async (productData: Partial<Product>): Promise<Product> => {
  const product = productRepository.create(productData);
  return await productRepository.save(product);
};

export const updateProduct = async (id: string, productData: Partial<Product>): Promise<Product | null> => {
  const product = await productRepository.findOneBy({ id });
  if (!product) return null;
  productRepository.merge(product, productData);
  return await productRepository.save(product);
};

export const deleteProduct = async (id: string): Promise<boolean> => {
  const result = await productRepository.delete(id);
  return result.affected !== 0;
};
