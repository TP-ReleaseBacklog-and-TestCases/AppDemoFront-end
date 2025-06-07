'use client'
import React, { useState } from 'react'

import { useAddProduct } from '../hooks/useAddProduct'
import { CreateProductDTO } from '@/application/product/dto/CreateProductDTO'
import { messages } from '@/messages'

type ProductFormState = CreateProductDTO

export function ProductForm() {
    const mutation = useAddProduct()
    const [form, setForm] = useState<ProductFormState>({
        name: '',
        description: '',
        category: '',
        price: 0,
        stock: 0,
    })

    type Field = 'name' | 'description' | 'category' | 'price' | 'stock'

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name as Field
        const value = e.target.value
        setForm(prev => ({
            ...prev,
            [name]: name === 'price' || name === 'stock'
                ? Number(value)
                : value,
        }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        mutation.mutate(form, {
            onSuccess: () => alert(messages.success.productCreated),
            onError: () => alert(messages.error.createProduct)
        })
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4 bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            {['name', 'description', 'category', 'price', 'stock'].map(field => (
                <div key={field}>
                    <label className="block capitalize">{field}</label>
                    <input
                        name={field}
                        type={field === 'price' || field === 'stock' ? 'number' : 'text'}
                        value={String(form[field as Field])}
                        onChange={handleChange}
                        className="border rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
            ))}
            <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors disabled:opacity-50"
                disabled={mutation.status === 'pending'}
            >
                {mutation.status === 'pending' ? messages.loading.saving : 'Guardar'}
            </button>
            {mutation.status === 'error' && (
                <p className="text-red-500">Error: {(mutation.error as Error).message}</p>
            )}
        </form>
    )
}
