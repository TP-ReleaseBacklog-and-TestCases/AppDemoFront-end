import { useMutation, useQueryClient } from '@tanstack/react-query'

import { AddProductUseCase } from '@/application/product/usecases/AddProductUseCase'
import { ProductRepositoryPostgres } from '@/infrastructure/persistence/ProductRepositoryPostgres'
import { CreateProductDTO } from '@/application/product/dto/CreateProductDTO'
import { Product } from '@/domain/product/entity/Product'

export function useAddProduct() {
    const qc = useQueryClient()
    const repo = new ProductRepositoryPostgres()
    const useCase = new AddProductUseCase(repo)

    return useMutation<Product, Error, CreateProductDTO>({
        mutationFn: (dto) => useCase.execute(dto),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ['products'] })
        }
    })
}
