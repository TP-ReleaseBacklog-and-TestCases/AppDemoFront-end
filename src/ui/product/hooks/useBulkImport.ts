import { useMutation, useQueryClient } from '@tanstack/react-query'

import { BulkImportProductsDTO } from '../../../application/product/dto/BulkImportProductsDTO'
import { BulkImportProductsUseCase } from '@/application/product/usecases/BulkImportProductsUseCase'
import { ProductRepositoryPostgres } from '@/infrastructure/persistence/ProductRepositoryPostgres'
import { Product } from '@/domain/product/entity/Product'

export function useBulkImport() {
    const qc = useQueryClient()
    const uc = new BulkImportProductsUseCase(new ProductRepositoryPostgres())

    return useMutation<Product[], Error, BulkImportProductsDTO>({
        mutationFn: (dto) => uc.execute(dto),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ['products'] })
        }
    })
}
