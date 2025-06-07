import Link from 'next/link'

import { ProductList } from '@/ui/product/components/ProductList'

export default function CatalogPage() {
    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Catálogo de Productos</h1>
                <Link href="/seller/catalog/new">
                    <button className="px-4 py-2 bg-green-600 text-white rounded">
                        Nuevo Producto
                    </button>
                </Link>
            </div>
            <ProductList />
        </div>
    )
}
