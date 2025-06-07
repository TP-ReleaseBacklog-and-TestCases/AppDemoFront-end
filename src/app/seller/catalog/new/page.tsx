import React from 'react'

import { ProductForm } from '@/ui/product/components/ProductForm'

export default function NewProductPage() {
    return (
        <div className="max-w-2xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Agregar Nuevo Producto</h1>
            <ProductForm />
        </div>
    )
}
