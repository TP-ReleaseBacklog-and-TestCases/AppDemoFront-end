import { useMutation, useQueryClient } from '@tanstack/react-query'

import { DeleteProductUseCase } from '@/application/product/usecases/DeleteProductUseCase'
import { ProductRepositoryLocalStorage } from '@/infrastructure/persistence/ProductRepositoryLocalStorage'

export function useDeleteProduct() {
    const qc = useQueryClient()
    const uc = new DeleteProductUseCase(new ProductRepositoryLocalStorage())

    return useMutation<void, Error, string>({
        mutationFn: (id) => uc.execute(id),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ['products'] })
        }
    })
}
