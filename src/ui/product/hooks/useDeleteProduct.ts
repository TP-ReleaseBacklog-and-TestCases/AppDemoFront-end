import { useMutation, useQueryClient } from '@tanstack/react-query'

import { DeleteProductUseCase } from '@/application/product/usecases/DeleteProductUseCase'
import { ProductRepositoryPostgres } from '@/infrastructure/persistence/ProductRepositoryPostgres'

export function useDeleteProduct() {
    const qc = useQueryClient()
    const uc = new DeleteProductUseCase(new ProductRepositoryPostgres())

    return useMutation<void, Error, string>({
        mutationFn: (id) => uc.execute(id),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ['products'] })
        }
    })
}
