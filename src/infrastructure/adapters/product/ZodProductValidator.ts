import { z } from 'zod'

import { CreateProductDTO } from '@/application/product/dto/CreateProductDTO'

const CreateProductSchema = z.object({
    name: z.string().min(1),
    description: z.string().min(1),
    category: z.string().min(1),
    price: z.number().nonnegative(),
    stock: z.number().int().nonnegative(),
})

export const ZodProductValidator = {
    parseCreate(input: unknown): CreateProductDTO {
        return CreateProductSchema.parse(input)
    }
}
