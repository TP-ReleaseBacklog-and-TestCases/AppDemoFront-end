import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ManageInventoryUseCase } from '@/application/product/usecases/ManageInventoryUseCase'
import { ProductRepositoryPostgres } from '@/infrastructure/persistence/ProductRepositoryPostgres'
import { Product } from '@/domain/product/entity/Product'

export function useManageInventory() {
    const qc = useQueryClient()
    const uc = new ManageInventoryUseCase(new ProductRepositoryPostgres())

    return useMutation<Product, Error, { id: string; stock: number }>({
        mutationFn: ({ id, stock }) => uc.execute(id, stock),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ['products'] })
        }
    })
}
