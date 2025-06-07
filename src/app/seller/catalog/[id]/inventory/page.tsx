'use client'
import { ManageInventoryForm } from '@/ui/product/components/ManageInventoryForm'
import { ImageUploader } from '@/ui/product/components/ImageUploader'
import { useProduct } from '@/ui/product/hooks/useProduct'
import { messages } from '@/messages'

export default function InventoryPage({ params }: { params: { id: string } }) {
  const { data, isLoading } = useProduct(params.id)

  if (isLoading) return <p>{messages.loading.product}</p>
  if (!data) return <p>{messages.error.loadProducts}</p>

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold">Gestionar Inventario e Imágenes</h1>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Stock</h2>
        <ManageInventoryForm productId={params.id} initialStock={data.stock} />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Imágenes</h2>
        <ImageUploader productId={params.id} />
      </section>
    </div>
  )
}
