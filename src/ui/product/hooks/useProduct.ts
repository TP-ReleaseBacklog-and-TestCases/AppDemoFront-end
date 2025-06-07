import { useQuery } from '@tanstack/react-query'
import { ProductRepositoryLocalStorage } from '@/infrastructure/persistence/ProductRepositoryLocalStorage'
import { mapToDTO } from '../utils/mapToDTO'
import { ProductDTO } from '../types/ProductDTO'

const repo = new ProductRepositoryLocalStorage()

export function useProduct(id: string) {
  return useQuery<ProductDTO | null, Error>({
    queryKey: ['product', id],
    queryFn: async () => {
      const p = await repo.findById(id)
      return p ? mapToDTO(p) : null
    },
    enabled: Boolean(id)
  })
}
