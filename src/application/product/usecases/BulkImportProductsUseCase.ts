import { v4 as uuidv4 } from 'uuid'

import { IProductRepository } from '@/domain/product/repository/IProductRepository'
import { BulkImportProductsDTO } from '../dto/BulkImportProductsDTO'
import { Product } from '@/domain/product/entity/Product'
import { Price } from '@/domain/product/value-objects/Price'
import { Stock } from '@/domain/product/value-objects/Stock'

export class BulkImportProductsUseCase {
    constructor(private readonly repo: IProductRepository) { }

    async execute(dto: BulkImportProductsDTO) {
        const result: Product[] = []
        for (const data of dto.products) {
            const price = Price.create(data.price)
            const stock = Stock.create(data.stock)
            let prod: Product

            if (data.id) {
                const existing = await this.repo.findById(data.id)
                if (!existing) throw new Error(`Product ${data.id} not found`)
                existing.updateName(data.name)
                existing.updateDescription(data.description)
                existing.updateCategory(data.category)
                existing.updatePrice(price)
                existing.updateStock(stock)
                prod = await this.repo.update(existing)
            } else {
                const newP = new Product(
                    uuidv4(),
                    data.name,
                    data.description,
                    data.category,
                    price,
                    stock
                )
                newP.publish()
                prod = await this.repo.create(newP)
            }

            result.push(prod)
        }
        return result
    }
}
