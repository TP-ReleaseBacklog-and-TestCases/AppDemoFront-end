import { IProductRepository } from "@/domain/product/repository/IProductRepository"

export class DeleteProductUseCase {
    constructor(private readonly repo: IProductRepository) { }

    async execute(id: string) {
        const product = await this.repo.findById(id)
        if (!product) throw new Error('Product not found')
        await this.repo.delete(id)
    }
}
