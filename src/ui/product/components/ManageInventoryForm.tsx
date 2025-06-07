'use client'
import React, { useState } from 'react'
import { useManageInventory } from '../hooks/useManageInventory'
import { messages } from '@/messages'

export function ManageInventoryForm({
    productId,
    initialStock
}: {
    productId: string
    initialStock: number
}) {
    const [stock, setStock] = useState(initialStock)
    const mutation = useManageInventory()

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        mutation.mutate({ id: productId, stock }, {
            onSuccess: () => alert(messages.success.inventoryUpdated),
            onError: () => alert(messages.error.updateProduct)
        })
    }

    return (
        <form onSubmit={onSubmit} className="space-y-4">
            <label>Stock</label>
            <input
                type="number"
                value={stock}
                min={0}
                onChange={e => setStock(Number(e.target.value))}
                className="border p-2 w-full"
            />
            <button
                type="submit"
                disabled={mutation.status === 'pending'}
                className="bg-blue-600 text-white px-4 py-2 rounded"
            >
                {mutation.status === 'pending' ? 'Actualizando…' : 'Actualizar Stock'}
            </button>
        </form>
    )
}
