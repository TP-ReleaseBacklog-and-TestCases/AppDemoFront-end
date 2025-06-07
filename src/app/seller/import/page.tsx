'use client'
import { useState } from 'react'
import { useBulkImport } from '@/ui/product/hooks/useBulkImport'
import { CsvParserAdapter } from '@/infrastructure/adapters/product/CsvParserAdapter'
import { messages } from '@/messages'

export default function BulkImportPage() {
    const [file, setFile] = useState<File | null>(null)
    const mutation = useBulkImport()

    const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFile(e.target.files?.[0] ?? null)
    }
    const onImport = () => {
        if (!file) return
        const reader = new FileReader()
        reader.onload = () => {
            const dto = CsvParserAdapter.parse(reader.result as string)
            mutation.mutate(dto)
        }
        reader.readAsText(file)
    }

    return (
        <div className="max-w-2xl mx-auto p-6 space-y-4">
            <h1 className="text-3xl font-bold">Importar Productos desde CSV</h1>
            <input type="file" accept=".csv" onChange={onFile} />
            <button
                onClick={onImport}
                disabled={!file || mutation.status === 'pending'}
                className="bg-blue-600 text-white px-4 py-2 rounded"
            >
                {mutation.status === 'pending' ? messages.loading.importing : 'Importar CSV'}
            </button>
            {mutation.status === 'success' && (
                <p className="text-green-600">
                    {messages.success.productsImported.replace('{count}', String(mutation.data.length))}
                </p>
            )}
            {mutation.status === 'error' && (
                <p className="text-red-600">{messages.error.bulkImport}</p>
            )}
        </div>
    )
}
