import { ManageInventoryForm } from '@/ui/product/components/ManageInventoryForm'
import { ImageUploader } from '@/ui/product/components/ImageUploader'

export default async function InventoryPage({ params }: { params: { id: string } }) {
    const res = await fetch(`http://localhost:3000/api/product?id=${params.id}`)
    const product = await res.json()

    return (
        <div className="max-w-2xl mx-auto p-6 space-y-8">
            <h1 className="text-3xl font-bold">Gestionar Inventario e Imágenes</h1>

            <section>
                <h2 className="text-2xl font-semibold mb-4">Stock</h2>
                <ManageInventoryForm
                    productId={params.id}
                    initialStock={product.stock}
                />
            </section>

            <section>
                <h2 className="text-2xl font-semibold mb-4">Imágenes</h2>
                <ImageUploader productId={params.id} />
            </section>
        </div>
    )
}
