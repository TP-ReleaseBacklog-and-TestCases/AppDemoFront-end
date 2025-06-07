import { IProductRepository } from '@/domain/product/repository/IProductRepository'
import { UpdateProductDTO } from '../dto/UpdateProductDTO'
import { Price } from '@/domain/product/value-objects/Price'
import { Stock } from '@/domain/product/value-objects/Stock'

export class EditProductUseCase {
    constructor(private readonly repo: IProductRepository) { }

    async execute(dto: UpdateProductDTO) {
        const product = await this.repo.findById(dto.id)
        if (!product) throw new Error('Product not found')
        if (dto.name) product.updateName(dto.name)
        if (dto.description) product.updateDescription(dto.description)
        if (dto.category) product.updateCategory(dto.category)
        if (dto.price !== undefined) product.updatePrice(Price.create(dto.price))
        if (dto.stock !== undefined) product.updateStock(Stock.create(dto.stock))
        return this.repo.update(product)
    }
}
