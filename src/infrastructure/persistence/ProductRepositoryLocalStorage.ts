import { Product } from '@/domain/product/entity/Product'
import { IProductRepository } from '@/domain/product/repository/IProductRepository'
import { Price } from '@/domain/product/value-objects/Price'
import { Stock } from '@/domain/product/value-objects/Stock'

function deserialize(data: any): Product {
  const price = Price.create(data.price)
  const stock = Stock.create(data.stock)
  const p = new Product(data.id, data.name, data.description, data.category, price, stock)
  p.publish()
  return p
}

export class ProductRepositoryLocalStorage implements IProductRepository {
  private db = new Map<string, Product>()

  constructor() {
    if (typeof window !== 'undefined') {
      const raw = localStorage.getItem('products')
      if (raw) {
        const arr = JSON.parse(raw) as any[]
        arr.forEach(item => {
          this.db.set(item.id, deserialize(item))
        })
      }
    }
  }

  private save() {
    if (typeof window === 'undefined') return
    const arr = Array.from(this.db.values()).map(p => ({
      id: p.id,
      name: p.getName(),
      description: p.getDescription(),
      category: p.getCategory(),
      price: p.getPrice().value,
      stock: p.getStock().value,
    }))
    localStorage.setItem('products', JSON.stringify(arr))
  }

  async create(p: Product) {
    this.db.set(p.id, p)
    this.save()
    return p
  }

  async findById(id: string) {
    return this.db.get(id) ?? null
  }

  async findAll() {
    return Array.from(this.db.values())
  }

  async update(p: Product) {
    this.db.set(p.id, p)
    this.save()
    return p
  }

  async delete(id: string) {
    this.db.delete(id)
    this.save()
  }
}
