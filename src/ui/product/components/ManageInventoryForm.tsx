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
        <form onSubmit={onSubmit} className="space-y-4 bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <label>Stock</label>
            <input
                type="number"
                value={stock}
                min={0}
                onChange={e => setStock(Number(e.target.value))}
                className="border rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
                type="submit"
                disabled={mutation.status === 'pending'}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors disabled:opacity-50"
            >
                {mutation.status === 'pending' ? 'Actualizando…' : 'Actualizar Stock'}
            </button>
        </form>
    )
}
