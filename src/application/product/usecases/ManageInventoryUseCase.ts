import { IProductRepository } from '@/domain/product/repository/IProductRepository'
import { Stock } from '@/domain/product/value-objects/Stock'

export class ManageInventoryUseCase {
    constructor(private readonly repo: IProductRepository) { }

    async execute(id: string, newStock: number) {
        const product = await this.repo.findById(id)
        if (!product) throw new Error('Product not found')
        product.updateStock(Stock.create(newStock))
        return this.repo.update(product)
    }
}
