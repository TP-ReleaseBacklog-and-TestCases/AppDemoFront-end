import { Product } from "../entity/Product";

export interface IProductRepository {
    create(product: Product): Promise<Product>
    findById(id: string): Promise<Product | null>
    findAll(): Promise<Product[]>
    update(product: Product): Promise<Product>
    delete(id: string): Promise<void>
}
