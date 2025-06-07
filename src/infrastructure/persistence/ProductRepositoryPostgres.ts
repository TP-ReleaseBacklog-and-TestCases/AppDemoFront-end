import { Product } from '@/domain/product/entity/Product'
import { IProductRepository } from '@/domain/product/repository/IProductRepository'

export class ProductRepositoryPostgres implements IProductRepository {
    private db = new Map<string, Product>()

    async create(p: Product) {
        this.db.set(p.id, p)
        return p
    }

    async findById(id: string) {
        return this.db.get(id) ?? null
    }

    async findAll() {
        return Array.from(this.db.values())
    }

    async update(p: Product) {
        this.db.set(p.id, p)
        return p
    }

    async delete(id: string) {
        this.db.delete(id)
    }
}
