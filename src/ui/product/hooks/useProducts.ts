import { useQuery } from '@tanstack/react-query'
import { ProductRepositoryLocalStorage } from '@/infrastructure/persistence/ProductRepositoryLocalStorage'
import { mapToDTO } from '../utils/mapToDTO'
import { ProductDTO } from '../types/ProductDTO'

const repo = new ProductRepositoryLocalStorage()

export function useProducts() {
  return useQuery<ProductDTO[], Error>({
    queryKey: ['products'],
    queryFn: async () => {
      const list = await repo.findAll()
      return list.map(mapToDTO)
    }
  })
}
