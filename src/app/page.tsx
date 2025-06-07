import { ProductList } from '@/ui/product/components/ProductList';
import Link from 'next/link'

export default function Home() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">Bienvenido al Seller Panel</h1>
      <p>Desde aquí puedes gestionar tu catálogo de productos:</p>
      <div className="flex gap-4">
        <Link href="/seller/catalog">
          <button className="px-4 py-2 bg-blue-600 text-white rounded">
            Ver Catálogo
          </button>
        </Link>
        <Link href="/seller/catalog/new">
          <button className="px-4 py-2 bg-green-600 text-white rounded">
            Agregar Producto
          </button>
        </Link>
        <Link href="/seller/catalog/import">
          <button className="px-4 py-2 bg-indigo-600 text-white rounded">
            Importar CSV
          </button>
        </Link>
      </div>

      <section>
        <h2 className="text-2xl font-semibold mt-8">Productos Recientes</h2>
        <ProductList />
      </section>
    </div>
  );
}
