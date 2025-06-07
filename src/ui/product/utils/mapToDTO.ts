import { Product } from '@/domain/product/entity/Product'
import { ProductDTO } from '../types/ProductDTO'

export function mapToDTO(product: Product): ProductDTO {
  return {
    id: product.id,
    name: product.getName(),
    description: product.getDescription(),
    category: product.getCategory(),
    price: product.getPrice().value,
    stock: product.getStock().value,
  }
}
