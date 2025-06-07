import { EditProductForm } from '@/ui/product/components/EditProductForm'

export default async function EditPage({ params }: { params: { id: string } }) {
    const res = await fetch(`http://localhost:3000/api/product?id=${params.id}`)
    const product = await res.json()

    return (
        <div className="max-w-2xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Editar Producto</h1>
            <EditProductForm initial={product} />
        </div>
    )
}
