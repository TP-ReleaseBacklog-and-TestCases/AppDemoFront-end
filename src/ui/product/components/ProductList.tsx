'use client'
import React from 'react'

import { ProductCard } from './ProductCard'
import { messages } from '@/messages'
import { useProducts } from '../hooks/useProducts'

export function ProductList() {
    const { data, isLoading, isError } = useProducts()

    if (isLoading) return <p>Cargando productos…</p>
    if (isError) return <p>{messages.error.loadProducts}</p>

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data?.map(p => (
                <ProductCard key={p.id} product={p} />
            ))}
        </div>
    )
}
