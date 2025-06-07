'use client'
import React from 'react'

import { useQuery } from '@tanstack/react-query'
import { ProductCard } from './ProductCard'
import { ProductDTO } from '../types/ProductDTO'

export function ProductList() {
    const { data, isLoading, isError } = useQuery<ProductDTO[], Error>({
        queryKey: ['products'],
        queryFn: async () => {
            const res = await fetch('/api/product')
            if (!res.ok) throw new Error('Error al cargar productos')
            return (await res.json()) as ProductDTO[]
        }
    })

    if (isLoading) return <p>Cargando productos…</p>
    if (isError) return <p>Error al cargar.</p>

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data?.map(p => (
                <ProductCard key={p.id} product={p} />
            ))}
        </div>
    )
}
