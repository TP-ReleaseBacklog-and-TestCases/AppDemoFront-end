'use client'
import React, { useState } from 'react'
import { useEditProduct } from '../hooks/useEditProduct'
import { messages } from '@/messages'

type Init = {
    id: string
    name: string
    description: string
    category: string
    price: number
    stock: number
}

export function EditProductForm({ initial }: { initial: Init }) {
    const [form, setForm] = useState(initial)
    const mutation = useEditProduct()

    const fields = ['name', 'description', 'category', 'price', 'stock'] as const
    type Field = typeof fields[number]

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setForm(prev => ({
            ...prev,
            [name]: name === 'price' || name === 'stock' ? Number(value) : value
        }))
    }

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        mutation.mutate(form, {
            onSuccess: () => alert(messages.success.productUpdated),
            onError: () => alert(messages.error.updateProduct)
        })
    }

    return (
        <form onSubmit={onSubmit} className="space-y-4">
            {fields.map((f: Field) => (
                <div key={f}>
                    <label className="block capitalize">{f}</label>
                    <input
                        name={f}
                        type={f === 'price' || f === 'stock' ? 'number' : 'text'}
                        value={form[f]}
                        onChange={onChange}
                        className="border p-2 w-full"
                        required
                    />
                </div>
            ))}
            <button
                type="submit"
                disabled={mutation.status === 'pending'}
                className="bg-yellow-600 text-white px-4 py-2 rounded"
            >
                {mutation.status === 'pending' ? 'Actualizando…' : 'Actualizar'}
            </button>
            {mutation.isError && (
                <p className="text-red-500">{(mutation.error as Error).message}</p>
            )}
        </form>
    )
}
