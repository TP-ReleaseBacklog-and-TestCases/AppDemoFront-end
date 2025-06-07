import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ManageInventoryUseCase } from '@/application/product/usecases/ManageInventoryUseCase'
import { ProductRepositoryLocalStorage } from '@/infrastructure/persistence/ProductRepositoryLocalStorage'
import { Product } from '@/domain/product/entity/Product'

export function useManageInventory() {
    const qc = useQueryClient()
    const uc = new ManageInventoryUseCase(new ProductRepositoryLocalStorage())

    return useMutation<Product, Error, { id: string; stock: number }>({
        mutationFn: ({ id, stock }) => uc.execute(id, stock),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ['products'] })
        }
    })
}
