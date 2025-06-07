'use client'
import React from 'react'
import Link from 'next/link'

import { useDeleteProduct } from '../hooks/useDeleteProduct'
import { ProductDTO } from '../types/ProductDTO'


export function ProductCard({ product }: { product: ProductDTO }) {
    const del = useDeleteProduct()

    const handleDelete = () => {
        if (confirm('¿Eliminar este producto?')) {
            del.mutate(product.id)
        }
    }

    return (
        <div className="border p-4 rounded shadow">
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p>{product.description}</p>
            <p>Categoría: {product.category}</p>
            <p>Precio: S/ {product.price}</p>
            <p>Stock: {product.stock === 0 ? 'Agotado' : product.stock}</p>
            <div className="flex mt-4 space-x-2">
                <Link href={`/seller/catalog/${product.id}`}>
                    <button className="px-3 py-1 bg-yellow-500 text-white rounded">
                        Editar
                    </button>
                </Link>
                <button
                    onClick={handleDelete}
                    className="px-3 py-1 bg-red-600 text-white rounded"
                >
                    Eliminar
                </button>
            </div>
        </div>
    )
}
