import { v4 as uuidv4 } from 'uuid'

import { IProductRepository } from '@/domain/product/repository/IProductRepository'
import { CreateProductDTO } from '../dto/CreateProductDTO'
import { Product } from '@/domain/product/entity/Product'
import { Price } from '@/domain/product/value-objects/Price'
import { Stock } from '@/domain/product/value-objects/Stock'

export class AddProductUseCase {
    constructor(private readonly repo: IProductRepository) { }

    async execute(dto: CreateProductDTO): Promise<Product> {
        const price = Price.create(dto.price)
        const stock = Stock.create(dto.stock)

        const product = new Product(
            uuidv4(),
            dto.name,
            dto.description,
            dto.category,
            price,
            stock
        )
        product.publish()

        return this.repo.create(product)
    }
}
