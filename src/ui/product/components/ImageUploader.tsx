'use client'
import React, { useState } from 'react'

interface ImageUploaderProps {
    productId: string
}

export function ImageUploader({ productId }: ImageUploaderProps) {
    const [previews, setPreviews] = useState<string[]>([])

    const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (!files) return
        const urls: string[] = []
        Array.from(files).forEach(file => {
            const reader = new FileReader()
            reader.onload = () => {
                if (typeof reader.result === 'string') {
                    urls.push(reader.result)
                    if (urls.length === files.length) {
                        setPreviews(urls)
                    }
                }
            }
            reader.readAsDataURL(file)
        })
        // TODO: aquí invocarías el hook de subida al backend usando productId
        console.log('Product ID:', productId)
    }

    return (
        <div className="space-y-4 bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <input
                type="file"
                multiple
                onChange={handleFiles}
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="grid grid-cols-3 gap-2">
                {previews.map((src, i) => (
                    <img
                        key={i}
                        src={src}
                        alt={`Preview ${i}`}
                        className="w-full h-32 object-cover rounded"
                    />
                ))}
            </div>
        </div>
    )
}