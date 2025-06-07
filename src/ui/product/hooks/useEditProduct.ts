import { useMutation, useQueryClient } from '@tanstack/react-query'
import { EditProductUseCase } from '@/application/product/usecases/EditProductUseCase'
import { ProductRepositoryPostgres } from '@/infrastructure/persistence/ProductRepositoryPostgres'
import { UpdateProductDTO } from '@/application/product/dto/UpdateProductDTO'
import { Product } from '@/domain/product/entity/Product'

export function useEditProduct() {
    const qc = useQueryClient()
    const repo = new ProductRepositoryPostgres()
    const uc = new EditProductUseCase(repo)

    return useMutation<Product, Error, UpdateProductDTO>({
        mutationFn: (dto) => uc.execute(dto),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ['products'] })
        }
    })
}
