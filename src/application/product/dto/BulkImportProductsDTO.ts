import { CreateProductDTO } from './CreateProductDTO'

export interface BulkImportProductsDTO {
    products: Array<CreateProductDTO & { id?: string }>
}
