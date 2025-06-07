'use client'
import { EditProductForm } from '@/ui/product/components/EditProductForm'
import { useProduct } from '@/ui/product/hooks/useProduct'
import { messages } from '@/messages'

export default function EditPage({ params }: { params: { id: string } }) {
  const { data, isLoading } = useProduct(params.id)

  if (isLoading) return <p>{messages.loading.product}</p>
  if (!data) return <p>{messages.error.loadProducts}</p>

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Editar Producto</h1>
      <EditProductForm initial={data} />
    </div>
  )
}
