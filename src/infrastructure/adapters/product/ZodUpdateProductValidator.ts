import { UpdateProductDTO } from '@/application/product/dto/UpdateProductDTO'
import { z } from 'zod'

const UpdateProductSchema = z.object({
    id: z.string().uuid(),
    name: z.string().min(1).optional(),
    description: z.string().min(1).optional(),
    category: z.string().min(1).optional(),
    price: z.number().nonnegative().optional(),
    stock: z.number().int().nonnegative().optional(),
})

export const ZodUpdateProductValidator = {
    parseUpdate(input: unknown): UpdateProductDTO {
        return UpdateProductSchema.parse(input)
    }
}
